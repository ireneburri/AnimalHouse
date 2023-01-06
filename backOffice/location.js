const url = "https://site212224.tw.cs.unibo.it"
var locationList = []
var serviceList = []
var loc 
var removeServiceLocList = []

//document ready => getAllLocation
$( document ).ready( verifyToken() );

function verifyToken(){
    if (localStorage.token==undefined){
        $(location).attr('href','./login.html');
    } else {
        console.log("SI "+localStorage.token)
        console.log(localStorage.username)

        getAllLocation()
        getAllService()
    }
}

//GET all locations
function getAllLocation(){
    $.ajax({
        type: 'GET',
        url: url + "/location",
        crossDomain: true,
        success: function(data) {
            console.log(data);
            locationList = data;
            locations(locationList);
        },
        error: function(err) {
            console.log(err);
        }
    })
}

//GET all services
function getAllService(){
    $.ajax({
        type: 'GET',
        url: url + "/service",
        crossDomain: true,
        success: function(data) {
            console.log(data);
            serviceList = data;
        },
        error: function(err) {
            console.log(err);
        }
    })
}


function locations(locationList){
    $("#myDIV").empty()
    for (let i in locationList) {
        showLocation(locationList[i]);
    }
}


//VISUALIZZA tutte le sedi
function showLocation(location){
    
    let img = "locationPic.png"
    if (location.img != "locationPic.png" && (location.img != "" && location.img != undefined)){ 
        img = location._id + ".png"
    } 

    $("#myDIV").append(
    `
    <div class="col h-100">
        <div class="card "  id="${location.name}" >
            <img src="${img}" class="img-fluid rounded" alt="Image of location: ${location.name}" style="width: 100%;  height: auto;">
            <div class="card-body">    
                <h5 class="card-title"> 
                    <span class="locationName"> ${location.name} </span> <br> 
                </h5>  
                <p class="card-text">   
                    <small>   
                        <!--span style="color: gray">Address: </span-->
                        <span class="locationAddress"> ${location.address} - </span>   
                        <span class="locationTel">${location.tel}</span>
                        <span style="color: green">&phone;</span>  <br>              
                    </small>  
                    <!--span style="color: gray">Description: </span-->
                    <span class="locationDescription">${location.description} </span>  
                </p>
            </div>   
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <span style="color: gray">Staff: </span>
                    <span class="locationStaff"> ${location.staff}</span>
                </li>
                <li class="list-group-item">
                    <span style="color: gray">Services: </span> <br>
                    <ul id="services-${location._id}">
                    </ul> 
                </li>
            </ul>
            <div class="card-body">
                
                
                <!--a href="#" class="btn" style="float:right; margin:1px;background-color: #A0AECD; border-color: #A0AECD; color:white;" onclick=deleteLocation("${location._id}")><small>Delete</small></a-->
                <button id="openModal"  onclick="verifyMod('${location.name}', '${location._id}', 'true')"  class="btn btn-primary" style="float:left; margin:1px;background-color: #425664; border-color: #425664; color:white;"><small>Modify Info</small></button>
                <button id="openModal"  onclick="verifyMod('${location.name}', '${location._id}', 'false')"  class="btn btn-primary" style="float:left; margin:1px;background-color: #425664; border-color: #425664; color:white;"><small>Modify Services</small></button>
            </div>     
                    

            <!-- Modal -->
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                <div class="modal fade" id="Modal-${location._id}" tabindex="-1" aria-labelledby="ModalLabel-${location._id}" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalLabel-${location._id}">Modify</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <!-- Body -->
                        
                        <div class="modal-body">
                        <form id="FormModifySe-${location._id}">

                            <div class="row mb-2">                                               
                                <label class="col-sm-2 col-form-label" for="modName-${location._id}" style="color:gray;">Name</label>
                                <div class="col-sm-10">
                                    <input id="modName-${location._id}" type="text" class="form-control" placeholder="${location.name}" aria-label="location name" disabled>
                                </div>
                            </div>   

                            <div class="row mb-2">
                                <label class="col-sm-2 col-form-label"  for="modAddress-${location._id}">Contact</label>
                                <div class="col">
                                    <input id="modAddress-${location._id}" type="address" class="form-control" placeholder="${location.address}" aria-label="Address">
                                </div>
                                <div class="col">
                                    <div class="input-group">
                                        <label  for="modTel-${location._id}" class="input-group-text">&phone;</label>
                                        <input type="tel" class="form-control" id="modTel-${location._id}" aria-label="Telephone number" placeholder="${location.tel}">
                                    </div>
                                </div>
                            </div>  

                            <div class="mb-2">
                                <label for="modDescription-${location._id}" class="form-label">Description</label>
                                <textarea class="form-control" id="modDescription-${location._id}" rows="2" aria-label="Description of the location">${location.description}</textarea>
                            </div>

                            <div class="mb-2">
                                <label for="modStaff-${location._id}" style="color:gray;" class="col-sm-2 form-label">Staff</label>
                                <textarea class="form-control" id="modStaff-${location._id}" rows="1" aria-label="Staff of the store" disabled>${location.staff}</textarea>
                            </div>  

                            <div class="mb-3">
                                <label for="modImg-${location._id}" class="form-label">Select new immagine</label>
                                <input class="form-control" type="file" name="file" value='Choose Photo' accept='image/png' id="modImg-${location._id}" placeholder="${location.img}">
                            </div>  
                        </form>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" style="background-color: #A0AECD; border-color: #A0AECD;" data-bs-dismiss="modal">Discard</button>
                            <button type="button" class="btn btn-success" style="background-color: #849531;" onclick=modifyLocation("${location._id}")>Save changes</button>
                            
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                <div class="modal fade" id="ModalSe-${location._id}" tabindex="-1" aria-labelledby="ModalSeLabel-${location._id}" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalSeLabel-${location._id}">Services of ${location.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <!-- Body -->
                        
                        <div class="modal-body" id="modalbody-${location._id}">

                        <div class="callout" id="callout2-${location._id}"  style="display: none;">
                            <div class="callout-header">You can't add a service that is already provided</div>
                            <span class="closebtn" onclick="this.parentElement.style.display='none';">×</span>
                        </div>
                        <div class="callout" id="callout3-${location._id}" style="display: none;">
                            <div class="callout-header">You have to fill both forms if you want to add a service</div>
                            <span class="closebtn" onclick="this.parentElement.style.display='none';">×</span>
                        </div>
                        <div class="callout" id="callout4-${location._id}" style="display: none;">
                            <div class="callout-header">The service name should exist</div>
                            <span class="closebtn" onclick="this.parentElement.style.display='none';">×</span>
                        </div>

                        <form id="FormModify-${location._id}">

                                <label class="col-sm-12 col-form-label">Services and disponibility:</label> <br>
                                <div class="container" id="SD-${location._id}">
                                
                                </div>
                                <div class="container" id="SDnew-${location._id}">
                                
                                </div>
                                <div class="container" id="Add-${location._id}">
                                    
                                </div>
                                <a href="#" class="btn btn-success" id="showAdd-${location._id}" style="border-color: #849531;background-color: #849531;color:black;" onclick="ShowAddServiceLocation('${location._id}', '${location.name}')"><small>Add a service</small></a>
                            
                        </form>
                        </div>

                        <div class="modal-footer" id="modalfooter-${location._id}">
                            <button type="reset" form="FormModify-${location._id}" onclick=minifunc() class="btn btn-primary" style="background-color: #A0AECD; border-color: #A0AECD;" data-bs-dismiss="modal">Discard</button>
                            <button type="button" class="btn btn-success" style="background-color: #849531;" onclick='areYouSure("${location._id}", "${location.name}")'>Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 

    `    
    )

    for (let c in location.disponibility){
        $("#services-"+location._id).append(
            `
            <li> ${location.disponibility[c].service} 
            <span style="color: gray;" data-bs-toggle="tooltip" data-bs-placement="right" title="Disponibility at a time"> &times;${location.disponibility[c].quantity}</span>
            </li>
            `
        )
        $("#SD-"+location._id).append(
            `
            <li class="mb-2" id="${location.disponibility[c]._id}">   
                <span id="modServiceName-${location.disponibility[c]._id}" value="${location.disponibility[c].service}" aria-label="service name">${location.disponibility[c].service} </span>
                <input id="modServiceQuantity-${location.disponibility[c]._id}" type="number" min="0" value="${location.disponibility[c].quantity}" style="border-radius: 7px; border-width: thin;" aria-label="service quantity">    
                <a href="#" class="btn btn-primary" style="border-color: #A0AECD; background-color: #A0AECD;color:black;" onclick="sureDeleteServiceLocation('${location.name}', '${location.disponibility[c].service}', '${location.disponibility[c]._id}')"><small>Remove</small></a>
            </li>
            `
        )
    }
}

async function areYouSure(locId, locName) {
    $("#ModalSeLabel-"+locId).empty()
    $("#ModalSeLabel-"+locId).append(
        `
        Save changes?
        `
    )
    $("#FormModify-"+locId).children("div").children("li").children("input").attr("disabled", true)
    $("#FormModify-"+locId).children("div").children("li").children("a").removeAttr("href")
    $("#FormModify-"+locId).children("div").children("li").children("a").removeAttr("onclick")
    $("#FormModify-"+locId).children("div").children("li").children("a").removeAttr("class")
    $("#FormModify-"+locId).children("div").children("li").children("a").attr("role", "link")
    $("#FormModify-"+locId).children("div").children("li").children("a").attr("aria-disabled", true)
    $("#FormModify-"+locId).children("a").removeAttr("href")
    $("#FormModify-"+locId).children("a").removeAttr("onclick")
    $("#FormModify-"+locId).children("a").removeAttr("class")
    $("#modalbody-"+locId).attr("style", "color:gray;") 

    $("#modalbody-"+locId).append(
        `
        <p style="color:#7ec46b;text-align: center;"> Are you sure this changes are not in conflict with all existing reservation?<p>
        `
    )
    $("#modalfooter-"+locId).empty()
    $("#modalfooter-"+locId).append(
        `
        <button class="btn btn-primary" style="background-color: #A0AECD; border-color: #A0AECD;" data-bs-dismiss="modal" onclick=goCheck()>No, go to check</button>
        <button type="button" class="btn btn-success" style="background-color: #849531;" onclick='modifyServiceLocation("${locId}", "${locName}")'>Yes, save changes</button>
                        
        `
    )
}

function goCheck(){
    console.log("href");
    $(location).attr('href','./reservation.html');
}

function minifunc(){
    removeServiceLocList=[];
    window.location.reload();
}


async function verifyMod(locName, id, info){
    await $.ajax({
        type: 'GET',
        url: url + "/staff/username/"+ localStorage.username,
        crossDomain: true,
        success: function(data) {
            console.log(data);
            loc = data[0].location[0];
            console.log(loc)
        },
        error: function(err) {
            console.log(err);
        }
    })
    if (loc != locName){
        $('#callout1').attr('style', 'display: block')
    }  
    else{
        if (info == "true") {
            $('#Modal-'+id).modal('show');
        } else {
            $('#ModalSe-'+id).modal('show');
        }
    }
}

//MODIFICA una location
function modifyLocation(id){
    let data = {}

    if ($("#modName-"+id).val()!="") {data.name = $("#modName-"+id).val()}
    if ($("#modAddress-"+id).val()!="") {data.address = $("#modAddress-"+id).val()}
    if ($("#modTel-"+id).val()!="") {data.tel = $("#modTel-"+id).val()}
    if ($("#modDescription-"+id).val()!="") {data.description = $("#modDescription-"+id).val()}
    if ($("#modStaff-"+id).val()!="") {data.staff = $("#modStaff-"+id).val().replace(/\s+/g, "").split(",")}

    if ($("#modImg-"+id).val()!="") {

        let imm = document.getElementById("modImg-"+id).files.item(0);
        console.log(imm)
        data.img = imm.name;

        console.log("mod")
        uploadImg(imm, id)

    }
    $.ajax({
        type: 'PATCH',
        url: url + "/location/" + id,
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify(data),        
        success: function(result) {
            console.log("yay");
            console.log(result);
        },
        error: function(err) {
            console.log("nuu");
            console.log(err);
        }

    })//.then( ()=> window.location.reload());    
    return false;
}

//MODIFICA una location
async function modifyServiceLocation(id, locName){
    let data = {}

    let listLocService = []
    data.disponibility = []
    $("#SD-"+id).children("li").each(function(){
        listLocService.push($(this).attr("id"))
    });
    console.log(listLocService)
    for (const key in listLocService) {
        console.log($("#modServiceName-"+listLocService[key]).attr("value"))
        let disp = { "service": $("#modServiceName-"+listLocService[key]).attr("value"), 
                     "quantity": $("#modServiceQuantity-"+listLocService[key]).val() }
        data.disponibility.push(disp)
    }

    await $.ajax({
        type: 'PATCH',
        url: url + "/location/" + id,
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify(data),        
        success: function(result) {
            console.log("yay");
            console.log(result);
        },
        error: function(err) {
            console.log("nuu");
            console.log(err);
        }

    })//.then( ()=> window.location.reload()); 

    let newData = {}
    newData.disponibility = []
    $("#SDnew-"+id).children("li").each(function(){
        console.log($(this).children("span").attr("value")); 
        console.log($(this).children("input").val()); 

        let disp = { "service": $(this).children("span").attr("value"), 
        "quantity": $(this).children("input").val()}
        newData.disponibility.push(disp)
    });
    console.log(newData);


    await $.ajax({
        type: 'PATCH',
        url: url + "/location/disponibility/" + locName,
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify(newData),  
        success: function(res) {
            console.log("yay");
            console.log(res);
        },
        error: function(err) {
            console.log("nuu");
            console.log(err);
        },

    });

    $("#SDnew-"+id).children("li").each(async function(){
        let service = {}
        await $.ajax({
            type: 'GET',
            url: url + "/service/name/" + $(this).children("span").attr("value"),
            crossDomain: true,
            success: function(data) {
                console.log(data);
                service = data[0];
            },
            error: function(err) {
                console.log(err);
            },
        });
    
        service.location.push(locName)
        console.log(service.location)
        $.ajax({
            type: 'PATCH',
            url: url + "/service/" + service._id,
            crossDomain: true,
            contentType: "application/json",
            data: JSON.stringify(service),        
            success: function(result) {
                console.log("yay");
                console.log(result);
            },
            error: function(err) {
                console.log("nuu");
                console.log(err);
            }
        })
    });

    if (removeServiceLocList.length > 0){
        for (const key in removeServiceLocList) {
            let service = {}
            await $.ajax({
                type: 'GET',
                url: url + "/service/name/" + removeServiceLocList[key].serName,
                crossDomain: true,
                success: function(data) {
                    console.log(data);
                    service = data[0];
                },
                error: function(err) {
                    console.log(err);
                },
            });

            service.location.splice(service.location.indexOf(removeServiceLocList[key].locName), 1);
            console.log(service.location)
            await $.ajax({
                type: 'PATCH',
                url: url + "/service/" + service._id,
                crossDomain: true,
                contentType: "application/json",
                data: JSON.stringify(service),        
                success: function(result) {
                    console.log("yay");
                    console.log(result);
                },
                error: function(err) {
                    console.log("nuu");
                    console.log(err);
                }
            })
        }
    }
    removeServiceLocList = []
    return false;
}


function searchByName(){
    var searchLists = []
    let search = $("#searchLocation").val().toLowerCase()
    console.log(search)
    for (let i in locationList){
        let name = locationList[i].name.toLowerCase()
        if (name.includes(search)){
            searchLists.push(locationList[i])
        }
    }
    locations(searchLists);
}

async function sureDeleteServiceLocation(locName, serviceName, id){
    let rm = {}
    rm.locName = locName;
    rm.serName = serviceName;
    removeServiceLocList.push(rm);
    console.log(removeServiceLocList);
    $("#"+id).remove();
}

function ShowAddServiceLocation(locId, locName){
    $("#Add-"+locId).empty()
    $("#Add-"+locId).append(
        ` 
            <hr>
            <form>
            <input id="AddS-${locId}" type="text" placeholder="Service name" aria-label="service name" style="border-radius: 7px; border-width: thin;" required>    
            <input id="AddQ-${locId}" type="number" min="0" aria-label="service quantity" placeholder="Quantity at a time" style="border-radius: 7px; border-width: thin;" required>    
            <a href="#" class="btn btn-success" onclick="AddServiceLocation('${locId}', '${locName}')" style="background-color: #849531;"><small>&check;</small></a>
            <!--button class="btn" type="reset" style="background-color: #849531;"><small>X</small></button-->
            </form>
            <hr>
        `
    )
    $("#showAdd-"+locId).hide()
}

async function AddServiceLocation(locId, locName){
    let name = $("#AddS-"+locId).val()
    let quantity = $("#AddQ-"+locId).val()
    console.log(name);

    let listLocService = []
    $("#SD-"+locId).children("li").each(function(){
        listLocService.push($(this).attr("id"))
    });
    console.log(listLocService)
    debugger

    let listLocServiceNew = []
    $("#SDnew-"+locId).children("li").each(function(){
        listLocServiceNew.push($(this).children("span").attr("value"))
    });
    console.log(listLocServiceNew)
    debugger

    for (const key in listLocService) {
        if($("#modServiceName-"+listLocService[key]).attr("value") == name){
            //alert("You can't add a service that is already provided");
            $('#callout2-'+locId).attr('style', 'display: block')
            //$('.callout-header').text("You can't add a service that is already provided")
            return
        }
    }

    for (const count in listLocServiceNew) {
        if(listLocServiceNew[count] == name){
            //alert("You can't add a service that is already provided");
            $('#callout2-'+locId).attr('style', 'display: block')
            //$('.callout-header').text("You can't add a service that is already provided")
            return
        }
    }

    if (name=="" || quantity=="") {
        //alert("You have to fill both forms if you want to add a service")
        $('#callout3-'+locId).attr('style', 'display: block')
        //$('.callout-header').text("You have to fill both forms if you want to add a service")
        return
    }
    let verify = false;
    for (let c in serviceList) {
        if (serviceList[c].name==name) {
            verify = true;
        }
    }
    if (verify == false){
        //alert("The service name should exist")
        $('#callout4-'+locId).attr('style', 'display: block')
        //$('.callout-header').text("The service name should exist")
        return
    }
    $("#SDnew-"+locId).append(
        ` 
        <li class="mb-2" class="withoutId">   
            <span class="newServiceName" value="${name}" aria-label="service name">${name} </span>
            <input class="newServiceQuantity" aria-label="service quantity" type="number" min="0" value="${quantity}" style="border-radius: 7px; border-width: thin;">
        </li>
        `
    )
    $("#Add-"+locId).empty()
    $("#showAdd-"+locId).show()

    console.log("PROVA");
}
