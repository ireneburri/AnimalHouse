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
                                <span style="color: gray">Availability: </span>
                                <span class="serviceAvailability">${service.availability} </span> <br>
                                <span class="serviceVip" style="color: gold">${vip} </span>
                            </small>                 
                        </div>
                        <div class="col-md-7">
                            <p class="card-text">                                
                                <span style="color: green">&nbsp;&euro;&nbsp;</span>
                                <span class="servicePrice">${service.price} </span> <br> 
                                <span style="color: gray">Location: </span>
                                <span class="serviceLocation"> ${service.location}</span> <br>
                                <span style="color: gray">Category: </span>
                                <span class="serviceCategory">${service.category} </span> <br>
                                <span style="color: gray">Description: </span>
                                <span class="serviceDescription">${service.description} </span>
                                
                            </p>
                        </div>
                        <div class="col-md-2">
                            <a href="#" class="btn btn-danger" style="float:right; margin:1px;" onclick=deleteService("${service._id}")><small>Delete</small></a>
                            <a href="#" class="btn btn-primary" style="float:right; margin:1px;" data-bs-toggle="modal" data-bs-target="#Modal-${service._id}"><small>Modify</small></a>
                            

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
                                                <div class="col">
                                                    <div class="row">
                                                        <label class="col-sm-4 col-form-label">Name</label>
                                                        <div class="col-sm-8">
                                                            <input id="modName-${service._id}" type="text" class="form-control" placeholder="${service.name}" aria-label="Service name">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="row">
                                                        <label class="col-sm-4 col-form-label">&nbsp;&nbsp;Mode</label>
                                                        <div class="col-sm-8">
                                                            <select id="modMode-${service._id}" class="form-select" aria-label="Quantity" placeholder="${service.mode}">
                                                                <option selected>${service.mode}</option>
                                                                <option>In Store</option>
                                                                <option>Online</option>
                                                                <option>At Home</option>
                                                            </select>       
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                                     

                                            <div class="row mb-2">
                                                <label class="col-sm-3 col-form-label">Category</label>
                                                <div class="col-sm-5">
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
                                                <div class="col-sm-4">
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" id="modPrice-${service._id}" aria-label="Price" placeholder="${service.price}">
                                                        <span class="input-group-text">&euro;</span>
                                                    </div>
                                                </div>                   
                                            </div> 

                                            <div class="row mb-2">
                                                <label for="modLocation-${service._id}" class="col-sm-3 col-form-label">Location</label>
                                                <div class="col-sm-9">
                                                    <input id="modLocation-${service._id}" type="text" class="form-control" value="${service.location}" aria-label="Service location">
                                                </div>
                                                
                                            </div>

                                            <div class="row mb-2">
                                                <label class="col-sm-3 col-form-label" for="modAvailability-${service._id}">Availability</label>
                                                <div class="col-sm-9">
                                                    <select id="modAvailability-${service._id}" class=" form-select" aria-label="Availability">
                                                        <option selected>${service.availability}</option>
                                                        <option>false</option>
                                                        <option>true</option>
                                                    </select>   
                                                </div>
                                            </div>

                                            <div class="row mb-2">
                                                <label class="col-sm-2 col-form-label" for="modVip-${service._id}">Vip</label>
                                                <div class="col-sm-10">
                                                    <select id="modVip-${service._id}" class="form-select">
                                                        <option style="color:gray" disabled selected>${notvip}</option>                                                        
                                                        <option>VIP</option>
                                                        <option>NOT VIP</option>
                                                    </select>    
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
                                            <button type="reset" form="FormModify-${service._id}" class="btn btn-secondary" data-bs-dismiss="modal">Discard</button>
                                            <button type="button" class="btn btn-primary" onclick=modifyService("${service._id}")>Save changes</button>
                                            
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
    data.availability = $("#inputAvailability").val()
    data.vip = $("#inputVip").val();


    if (data.mode=="" || data.name=="" || data.location=="" || data.category=="" || data.price=="" || data.availability==""){
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
            availability: data.availability,
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
    }).then( ()=> {
        window.location.reload()
    }); 
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
    if ($("#modAvailability-"+id).val()!="") {data.availability = $("#modAvailability-"+id).val()}
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

    }).then( ()=> window.location.reload());    
    return false;
}


//VERIFA se vuoi eliminare un servizio
function deleteService(id){
    var result = confirm("Are you sure you want to delete this service?");
    if (result) {
        sureDeleteService(id);
    }
}


//ELIMINA un servizio
function sureDeleteService(id){
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