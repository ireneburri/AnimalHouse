const url = "https://site212224.tw.cs.unibo.it"
var locationList = []
var serviceList = []
var loc 

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
    if (location.img != "locationPic.png" && (location.img != "" || location.img != undefined)){ 
        img = location._id + ".png"
    } 

    $("#myDIV").append(
    `
    <div class="col h-100">
        <div class="card "  id="${location.name}" >
            <img src="../routes/uploads/${img}" class="img-fluid rounded" alt="Image of location: ${location.name}" style="width: 100%;  height: auto;">
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
                
                
                <!--a href="#" class="btn btn-danger" style="float:right; margin:1px;" onclick=deleteLocation("${location._id}")><small>Delete</small></a-->
                <a href="#" id="openModal"  onclick="verifyMod('${location.name}', '${location._id}')"  class="btn btn-primary" style="float:left; margin:1px;"><small>Modify</small></a>
            </div>     
                    

            <!-- Modal -->
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                <div class="modal fade" id="Modal-${location._id}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalLabel-${location._id}">Modify</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <!-- Body -->
                        
                        <div class="modal-body">
                        <form id="FormModify-${location._id}">

                            <div class="row mb-2">                                               
                                <label class="col-sm-2 col-form-label">Name</label>
                                <div class="col-sm-10">
                                    <input id="modName-${location._id}" type="text" class="form-control" placeholder="${location.name}" aria-label="location name" disabled>
                                </div>
                            </div>   

                            <div class="row mb-2">
                                <label class="col-sm-2 col-form-label">Contact</label>
                                <div class="col">
                                    <input id="modAddress-${location._id}" type="address" class="form-control" placeholder="${location.address}" aria-label="Address">
                                </div>
                                <div class="col">
                                    <div class="input-group">
                                        <span class="input-group-text">&phone;</span>
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

                            <div class="mb-2" >
                                <label class="col-sm-12 col-form-label">Services and disponibility:</label> <br>
                                <div class="container" id="SD-${location._id}">
                                
                                </div>
                                <div class="container" id="Add-${location._id}">
                                    
                                </div>
                                <a href="#" class="btn" style="border-color: green; color: green;" onclick="ShowAddServiceLocation('${location._id}', '${location.name}')"><small>Add a service</small></a>
                            </div>  
                            
                            <!--div class="row mb-2">
                                <label class="col-sm-3 col-form-label">Services</label>
                                <div class="col-sm-5">
                                    <form id="modServices-${location._id}">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="Animal Sitter" id="AnimalSitter-${location._id}">
                                            <label class="form-check-label" for="Animal Sitter-${location._id}">
                                                Animal Sitter
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="Vet and Doctors" id="VetandDoctors-${location._id}">
                                            <label class="form-check-label" for="Vet and Doctors-${location._id}">
                                                Vet and Doctors
                                            </label>
                                        </div> 
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="Grooming" id="Grooming-${location._id}">
                                            <label class="form-check-label" for="Grooming-${location._id}">
                                                Grooming
                                            </label>
                                        </div> 
                                    </form>
                                </div>
                                <div class="col-sm-4">
                                    <form id="modServices2-${location._id}">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="Pension" id="Pension-${location._id}">
                                            <label class="form-check-label" for="Pension-${location._id}">
                                                Pension
                                            </label>
                                        </div>                                                        
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="Training" id="Training-${location._id}">
                                            <label class="form-check-label" for="Training-${location._id}">
                                                Training
                                            </label>
                                        </div> 
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="Store" id="Store-${location._id}">
                                            <label class="form-check-label" for="Store-${location._id}">
                                                Store
                                            </label>
                                        </div>
                                    </form>   
                            </div-->
                        </form>
                        </div>

                        <div class="modal-footer">
                            <button type="reset" form="FormModify-${location._id}" class="btn btn-secondary" data-bs-dismiss="modal">Discard</button>
                            <button type="button" class="btn btn-primary" onclick=modifyLocation("${location._id}")>Save changes</button>
                            
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 

    `    
    )

    /*for (let k in location.services) {
        let x = location.services[k]
        x = x.replace(/\s+/g, "")
        $("#"+x+"-"+location._id).attr("checked", true)
    }*/

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
                <span id="modServiceName-${location.disponibility[c]._id}" value="${location.disponibility[c].service}">${location.disponibility[c].service} </span>
                <input id="modServiceQuantity-${location.disponibility[c]._id}" type="number" min="0" value="${location.disponibility[c].quantity}" style="border-radius: 7px; border-width: thin;">    
                <a href="#" class="btn" style="border-color: red; color: red;" onclick="deleteServiceLocation('${location.name}', '${location.disponibility[c].service}')"><small>Remove</small></a>
            </li>
            `
        )
    }

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

}


async function verifyMod(locName, id){
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
        alert("You can't modify this location")
    } 
    else{
        $('#Modal-'+id).modal('show');
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

    if ($("#modImg-"+id).val()!="") {

        let imm = document.getElementById("modImg-"+id).files.item(0);
        console.log(imm)
        data.img = imm.name;

        console.log("mod")
        //DA RIVEDERE
        deleteImg(id + ".png");
        uploadImg(imm, id)

    }
    data.services=[]
    /*if ($("#AnimalSitter-"+id).is(':checked')) {data.services.push($("#AnimalSitter-"+id).val())}
    if ($("#VetandDoctors-"+id).is(':checked')) {data.services.push($("#VetandDoctors-"+id).val())}
    if ($("#Grooming-"+id).is(':checked')) {data.services.push($("#Grooming-"+id).val())}
    if ($("#Pension-"+id).is(':checked')) {data.services.push($("#Pension-"+id).val())}
    if ($("#Training-"+id).is(':checked')) {data.services.push($("#Training-"+id).val())}
    if ($("#Store-"+id).is(':checked')) {data.services.push($("#Store-"+id).val())}*/

    for(let i in data.services)  {console.log(data.services[i])}
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


//IN VERITA' NON PERMETTO DI ELIMINARE UNA LOCATION:

//VERIFA se vuoi eliminare una location
function deleteLocation(id){
    var result = confirm("Are you sure you want to delete this location?");
    if (result) {
        sureDeleteLocation(id);
    }
}


//ELIMINA una location
function sureDeleteLocation(id){
    $.ajax({
        type: 'DELETE',
        url: url + "/location/" + id,
        crossDomain: true,
        success: function(res) {
            console.log(res);
        },
        error: function(err) {
            console.log(err);
        },

    }).then( ()=> {
        deleteImg(id + ".png");
    }).then( ()=> window.location.reload());    
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

function deleteServiceLocation(locName, serviceName){
    var result = confirm("Are you sure you want to delete this service?");
    if (result) {
        sureDeleteServiceLocation(locName, serviceName);
    }
}

async function sureDeleteServiceLocation(locName, serviceName){
    let service = {}
    await $.ajax({
        type: 'GET',
        url: url + "/service/name/" + serviceName,
        crossDomain: true,
        success: function(data) {
            console.log(data);
            service = data[0];
        },
        error: function(err) {
            console.log(err);
        },
    });
    console.log(service.name)
    console.log(serviceName)

    service.location.splice(service.location.indexOf(locName), 1);
    //if (service.location.length>0){
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
    /*} else {
        $.ajax({
            type: 'DELETE',
            url: url + "/service/" + service._id,
            crossDomain: true,
            success: function(res) {
                console.log(res);
            },
            error: function(err) {
                console.log(err);
            },
    
        })
    }*/

    let data = {}
    data.disponibility = {}
    data.disponibility.service = serviceName
    console.log(service.name)
    console.log(serviceName)

    $.ajax({
        type: 'PATCH',
        url: url + "/location/rmdisponibility/" + locName,
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify(data),  
        success: function(res) {
            console.log("yay");
            console.log(res);
        },
        error: function(err) {
            console.log("nuu");
            console.log(err);
        },

    });
}

function ShowAddServiceLocation(locId, locName){
    $("#Add-"+locId).empty()
    $("#Add-"+locId).append(
        ` 
            <hr>
            <input id="AddS-${locId}" type="text" placeholder="Service name" style="border-radius: 7px; border-width: thin;" required>    
            <input id="AddQ-${locId}" type="number" min="0" placeholder="Quantity at a time" style="border-radius: 7px; border-width: thin;" required>    
            <a href="#" class="btn btn-primary" onclick="AddServiceLocation('${locId}', '${locName}')"><small>&check;</small></a>
            <hr>
        `
    )
}

async function AddServiceLocation(locId, locName){

    let data = {}
    data.disponibility = []
    let name = $("#AddS-"+locId).val()
    let quantity = $("#AddQ-"+locId).val()

    let listLocService = []
    data.disponibility = []
    $("#SD-"+locId).children("li").each(function(){
        listLocService.push($(this).attr("id"))
    });
    console.log(listLocService)
    for (const key in listLocService) {
        if($("#modServiceName-"+listLocService[key]).attr("value") == name){
            alert("You can't add a service that is already provided");
            return
        }
    }

    if (name!="" && quantity!="") {
        let disp = { "service": name, "quantity": quantity}
        data.disponibility = disp
    }else{
        alert("You have to fill the forms")
        return
    }

    let verify = false;
    for (let c in serviceList) {
        if (serviceList[c].name==name) {
            verify = true;
        }
    }
    if (verify == false){
        alert("The service name should exist")
        return}

    await $.ajax({
        type: 'PATCH',
        url: url + "/location/disponibility/" + locName,
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify(data),  
        success: function(res) {
            console.log("yay");
            console.log(res);
        },
        error: function(err) {
            console.log("nuu");
            console.log(err);
        },

    });

    let service = {}
    await $.ajax({
        type: 'GET',
        url: url + "/service/name/" + data.disponibility.service,
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

}