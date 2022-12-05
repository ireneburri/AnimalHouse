const url = "https://site212224.tw.cs.unibo.it"
var servicesList = []
locationList = []

function logout(){
    var result = confirm("Are you sure you want to logout?");
    if (result) {
        localStorage.clear();
        $(location).attr('href','./login.html');
    }
}

//document ready => getAllService
$( document ).ready( verifyToken() );

function verifyToken(){
    if (localStorage.token==undefined){
        $(location).attr('href','./login.html');
    } else {
        console.log("SI "+localStorage.token)
        console.log(localStorage.username)

        getAllService()
    }
}


//GET all services
function getAllService(){
    $.ajax({
        type: 'GET',
        url: url + "/service",
        crossDomain: true,
        success: function(data) {
            console.log(data);
            servicesList = data;
            //services(servicesList);
            filteredByVip();
        },
        error: function(err) {
            console.log(err);
        }
    })

    getAllLocation()
}


//FACCIO ANCHE UNA GET DELLE SEDI PER CONTROLLARE
function getAllLocation(){
    $.ajax({
        type: 'GET',
        url: url + "/location",
        crossDomain: true,
        success: function(data) {
            console.log(data);
            locationList = data;
        },
        error: function(err) {
            console.log(err);
        }
    })
}


function serviceMode(something){
    var mode = something //$("#modeService").val()
    if (mode=="All"){
        getAllService();
        $("#serviceTitle").html("All Services")
    }
    else{
        console.log(mode)
        $("#serviceTitle").html(mode + " Services")
        $.ajax({
            type: 'GET',
            url: url + "/service/mode/" + mode,
            crossDomain: true,
            success: function(data) {
                console.log(data);
                servicesList = data;
                //services(servicesList);
                filteredByVip();
            },
            error: function(err) {
                console.log(err);
            }
        })
    }
    
}

function filteredByVip(){
    if ($("#checkVip").is(':checked')) { 
        let vipList = []
        for (let key in servicesList) {
            if (servicesList[key].vip == true) {
                vipList.push(servicesList[key])
            }
        }
        services(vipList)
    } else {
        services(servicesList)
    }
}


function services(servicesList){
    $("#myDIV").empty()
    for (let i in servicesList) {
        showService(servicesList[i]);
    }
}


//VISUALIZZA tutti i servizi
function showService(service){

    let vip = ""
    let notvip = "NOT VIP"
    if(service.vip == true){
        vip = "VIP"
        notvip = vip 
    }

    let img = "servizioPic.png"
    if (service.img != "servizioPic.png" && (service.img != "" || service.img != undefined)){ 
        img = service._id + ".png"
    }

    let time = service.time
    if(service.allday){
        time = "All day"
    }

    $("#myDIV").append(
    `
    <div class="card mb-3"  id="${service.name}" >
        <div class="row g-0" >
            <div class="col-md-2">
                <img src="../routes/uploads/${img}" class="img-fluid rounded" alt="Image of service: ${service.name}" style="width: 100%; height: auto;">
            </div>
            <div class="col-md-10">
                <div class="card-body">
                    <div class="row g-0" >                        
                        <div class="col-md-3">
                            <h5 class="card-title"> 
                                <span class="serviceName"> ${service.name} </span> <br> 
                            </h5>    
                            <small>                         
                                <span style="color: gray">Mode: </span>
                                <span class="serviceMode"> ${service.mode}</span> <br> 
                                <span style="color: gray">Time: </span>
                                <span class="serviceTime">${time} </span> <br>
                                <span class="serviceVip" style="color: #A0AECD;">${vip} </span>
                            </small>                 
                        </div>
                        <div class="col-md-7">
                            <p class="card-text">                                
                                <span style="color: green">&nbsp;&euro;&nbsp;</span>
                                <span class="servicePrice">${service.price} </span> <br> 
                                <span style="color: gray">Location: </span>
                                <span class="serviceLocation" id="serviceLocation-${service._id}" value="${service.location}"> ${service.location}</span> <br>
                                <span style="color: gray">Category: </span>
                                <span class="serviceCategory">${service.category} </span> <br>
                                <span style="color: gray">Description: </span>
                                <span class="serviceDescription">${service.description} </span>
                                
                            </p>
                        </div>
                        <div class="col-md-2">
                            <a href="#" class="btn btn-danger" style="float:right; margin:1px; background-color: #A0AECD; border-color: #A0AECD;" onclick="deleteService('${service._id}', '${service.name}')"><small>Delete</small></a>
                            <a href="#" class="btn btn-primary" style="float:right; margin:1px;background-color: #425664; border-color: #425664;" data-bs-toggle="modal" data-bs-target="#Modal-${service._id}"><small>Modify</small></a>
                            

                            <!-- Modal -->
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                                <div class="modal fade" id="Modal-${service._id}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="ModalLabel-${service._id}">Modify</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>

                                        <!-- Body -->
                                        
                                        <div class="modal-body">
                                        <form id="FormModify-${service._id}">

                                            <div class="row mb-2">
                                                <label for="modName-${service._id}" class="col-sm-2 col-form-label">Name</label>
                                                <div class="col-sm-10">
                                                    <input id="modName-${service._id}" type="text" class="form-control" value="${service.name}" aria-label="Service name" disabled>
                                                </div>
                                            </div>  

                                            <div class="row mb-2">
                                                <label for="modLocation-${service._id}" class="col-sm-2 col-form-label">Locatio</label>
                                                <div class="col-sm-10">
                                                    <input id="modLocation-${service._id}" type="text" class="form-control" value="${service.location}" aria-label="Service location" disabled>
                                                </div>
                                            </div>

                                            <div class="row mb-2">
                                                <label class="col-sm-2 col-form-label">Mode</label>
                                                <div class="col-sm-5">
                                                    <select id="modMode-${service._id}" class="form-select" aria-label="Quantity" placeholder="${service.mode}">
                                                        <option selected>${service.mode}</option>
                                                        <option>In Store</option>
                                                        <option>Online</option>
                                                        <option>At Home</option>
                                                    </select>  
                                                </div>
                                                <div class="col-sm-5">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="modPrice-${service._id}" aria-label="Price" placeholder="${service.price}">
                                                    <span class="input-group-text">&euro;</span>
                                                </div>
                                                </div>
                                            </div>

                                            <div class="row mb-2">
                                                <div class="col">
                                                    <div class="row">
                                                        <label class="col-sm-4 col-form-label" for="modAllday-${service._id}">All day</label>
                                                        <div class="col-sm-8">
                                                            <select id="modAllday-${service._id}" class="form-select" aria-label="Allday">     
                                                                <option>true</option>                                                
                                                                <option>false</option>                                                
                                                            </select>     
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="row">
                                                        <label class="col-sm-3 col-form-label" for="modTime-${service._id}">Time</label>
                                                        <div class="col-sm-9">
                                                            <input id="modTime-${service._id}" type="time" placeholder="${service.time}" class="form-control" aria-label="Time">  
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>   

                                            <div class="row mb-2">
                                                <label class="col-sm-3 col-form-label">Category</label>
                                                <div class="col-sm-4">
                                                    <select id="modCategory-${service._id}" class="form-select" aria-label="Category">
                                                        <option selected>${service.category}</option>
                                                        <option>Animal Sitter</option>
                                                        <option>Vet & Doctors</option>
                                                        <option>Grooming</option>
                                                        <option>Pension</option>
                                                        <option>Training</option>
                                                        <option>Store</option>
                                                    </select> 
                                                </div>
                                                <div class="col-sm-5">
                                                <div class="row">
                                                    <label class="col-sm-3 col-form-label" for="modVip-${service._id}">Vip</label>
                                                    <div class="col-sm-9">
                                                        <select id="modVip-${service._id}" class="form-select">
                                                            <option style="color:gray" disabled selected>${notvip}</option>                                                        
                                                            <option>VIP</option>
                                                            <option>NOT VIP</option>
                                                        </select>   
                                                    </div>
                                                </div>
                                                </div>
                                            </div> 

                                            <div class="mb-2">
                                                <label for="modDescription-${service._id}" class="form-label">Description</label>
                                                <textarea class="form-control" id="modDescription-${service._id}" rows="2" aria-label="Description of the service">${service.description}</textarea>
                                            </div>
                    
                                            <div class="mb-2">
                                                <label for="modImg-${service._id}" class="form-label">Select new immagine</label>
                                                <input class="form-control" type="file" name="file" value='Choose Photo' accept='image/png' id="modImg-${service._id}" placeholder="${service.img}">
                                            </div>       
                                            
                                            
                                        </form>
                                        </div>


                                        <div class="modal-footer">
                                            <button type="reset" form="FormModify-${service._id}" class="btn" data-bs-dismiss="modal" style="background-color: #A0AECD; border-color: #A0AECD;">Discard</button>
                                            <button type="button" class="btn" onclick=modifyService("${service._id}") style="background-color: #849531; border-color: #849531;">Save changes</button>
                                            
                                        </div>

                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div> 
    `    
    )
}


//CREATE a service
function createService(){
    let data = {}

    const fileInput = document.querySelector('input[type="file"]');

    data.mode = $("#inputMode").val()
    data.name = $("#inputName").val()
    if ($("#inputImg").val() != "") {
        data.img = fileInput.files.item(0).name
    }
    data.location = $("#inputLocation").val().replace(/\s+/g, "").split(",")
    data.category = $("#inputCategory").val()
    data.price = $("#inputPrice").val()
    data.description = $("#inputDescription").val()
    data.allday = $("#inputAllday").val()
    data.time = $("#inputTime").val()
    data.vip = $("#inputVip").val();

    if (data.mode=="" || data.name=="" || data.location=="" || data.category=="" || data.price=="" ){
        alert("Fill the mandatory fields")
        return
    }    

    //Controllo per verificare che per OGNI service location corrisponda ad una vera location
    let verify = false
    for (const i in data.location) {
        verify = false
        for (let key in locationList) {
            if (locationList[key].name == data.location[i]) {
                verify = true
            }
        }
        if(verify == false) {break}
    }
    if (verify == false) {
        alert("The location's name doesn't mach any real location")
        return
    }
    
    let result_id = ""

    $.ajax({
        type: 'POST',
        url: url + "/service",
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify({
            mode: data.mode,
            name: data.name,
            img: data.img,
            location: data.location,
            category: data.category,
            price: data.price,
            description: data.description,
            allday: data.allday,
            time: data.time,
            vip: data.vip,
        }),
        success: function(result) {
            console.log("yay");
            console.log(result);
            result_id = result._id;
        },
        error: function(err) {
            console.log("nuu");
            console.log(err);
        }

    }).then( ()=> {
        uploadImg(fileInput.files.item(0) , result_id);
    }).then( ()=>{
        for (const key in data.location) {
            let body = {}
            body.disponibility = { "service": data.name, "quantity": 1}
            $.ajax({
                type: 'PATCH',
                url: url + "/location/disponibility/" + data.location[key],
                crossDomain: true,
                contentType: "application/json",
                data: JSON.stringify(body),        
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
    });/*.then( ()=> {
        window.location.reload()
    });*/
    return false;
}


//MODIFICA un servizio
function modifyService(id){
    let data = {}

    if ($("#modMode-"+id).val()!="") {data.mode = $("#modMode-"+id).val()}
    if ($("#modName-"+id).val()!="") {data.name = $("#modName-"+id).val()}
    if ($("#modLocation-"+id).val()!="") {data.location = $("#modLocation-"+id).val().replace(/\s+/g, "").split(",")}
    if ($("#modCategory-"+id).val()!="") {data.category = $("#modCategory-"+id).val()}
    if ($("#modPrice-"+id).val()!="") {data.price = $("#modPrice-"+id).val()}
    if ($("#modImg-"+id).val()!="") {

        let imm = document.getElementById("modImg-"+id).files.item(0);
        console.log(imm)
        data.img = imm.name;

        console.log("mod")
        //DA RIVEDERE
        deleteImg(id + ".png");
        uploadImg(imm, id)

    }
    if ($("#modDescription-"+id).val()!="") {data.description = $("#modDescription-"+id).val()}

    if ($("#modAllday-"+id).val()=="false") {
        data.allday = false;
        data.time = $("#modTime-"+id).val()
    }else if ($("#modAllday-"+id).val()=="true"){
            data.allday = true;
            data.time = ""
    }

    if ($("#modVip-"+id).val()=="VIP") {data.vip = true} else {data.vip = false}

    //Controllo per verificare che per OGNI service location corrisponda ad una vera location
    let verify = false
    for (const i in data.location) {
        verify = false
        for (let key in locationList) {
            if (locationList[key].name == data.location[i]) {
                verify = true
            }
        }
        if(verify == false) {break}
    }
    if (verify == false) {
        alert("The location's name doesn't mach any real location")
        return
    }


    $.ajax({
        type: 'PATCH',
        url: url + "/service/" + id,
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


//VERIFA se vuoi eliminare un servizio
function deleteService(id, name){
    var result = confirm("Are you sure you want to delete this service?");
    if (result) {
        sureDeleteService(id, name);
    }
}


//ELIMINA un servizio
function sureDeleteService(id, name){
    let locations = []
    locations = $("#serviceLocation-"+id).attr("value").replace(/\s+/g, "").split(",")
    console.log(locations)
    for (const key in locations) {
        let data = {}
        data.disponibility = {}
        data.disponibility.service = name
        $.ajax({
            type: 'PATCH',
            url: url + "/location/rmdisponibility/" + locations[key],
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

    $.ajax({
        type: 'DELETE',
        url: url + "/service/" + id,
        crossDomain: true,
        success: function(res) {
            console.log(res);
        },
        error: function(err) {
            console.log(err);
        },

    }).then( ()=> {
        deleteImg(id + ".png");
    }) 
    return false;
}


function searchByNameCategory(){
    var searchLists = []
    let search = $("#searchService").val().toLowerCase()
    console.log(search)
    for (let i in servicesList){
        let name = servicesList[i].name.toLowerCase()
        let category = servicesList[i].category.toLowerCase()
        if (name.includes(search) || category.includes(search)){
            searchLists.push(servicesList[i])
        }
    }
    services(searchLists);
}