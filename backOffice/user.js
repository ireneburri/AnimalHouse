
const url = "https://site212224.tw.cs.unibo.it"
var clientsList = []
var animalList = []

//document ready GET ALL CLIENTS
$( document ).ready( verifyToken() );

function verifyToken(){
    if (localStorage.tokenB==undefined){
        $(location).attr('href','./login.html');
    } else {
        console.log("SI "+localStorage.tokenB)
        console.log(localStorage.usernameB)

        getAllClient()
        getAllAnimal()
    }
}


function getAllAnimal(){
    $.ajax({
        type: 'GET',
        url: url + "/animal/sale/" + false,
        crossDomain: true,
        success: function(data) {
            console.log(data);
            animalList = data;
            console.log(animalList)
        },
        error: function(err) {
            console.log(err);
        }
    })
}


function getAllClient(){
    $.ajax({
        type: 'GET',
        url: url + "/user",
        crossDomain: true,
        headers:{authority: localStorage['tokenB']},
        success: function(data) {
            console.log(data);
            clientsList = data;
            clients(clientsList);
        },
        error: function(err) {
            console.log(err);
        }
    })
}


function clients(clientsList){
    $("#myDIV").empty()
    for (let i in clientsList) {
        showClient(clientsList[i]);
    }
}


function showClient(client){

    let vip = ""
    let notvip = "NOT VIP"
    if(client.vip == true){
        vip = "VIP"
        notvip = vip 
    }

    let img = "profilePic.png"
    if (client.img != img && (client.img != "" && client.img != undefined)){ img = client._id + ".png"}

    $("#myDIV").append(
    `
    <div class="card mb-3"  id="${client.username}" >
        <div class="row g-0" >
            <div class="col-md-2">
                <img src="${img}" class="img-fluid rounded" alt="Image of client: ${client.username}" style="width: 100%; height: auto;">
            </div>
            <div class="col-md-10">
                <div class="card-body">
                    <div class="row g-0" >                        
                        <div class="col-md-3">
                            <h5 class="card-title"> 
                                <span class="clientName"> ${client.name} </span> <br> 
                                <span class="clientSurname"> ${client.surname} </span>  
                            </h5> 
                            <small>
                                <span class="clientUsername"> ${client.username} </span> <span class="clientVip" style="color: #A0AECD;"> ${vip} </span> <br>
                                <span class="clientPassword" style="color: gray;" id="false-${client._id}" role="button" onclick=showPassword("${client._id}","${client.password}")> Password </span> <br>
                                <span style="color: gray">Game score:</span>
                                <span class="clientScore">${client.score} </span> <br>  
                            </small>
                        </div>
                        <div class="col-md-7">
                            <p class="card-text">
                                <small>
                                &phone;<span class="clientTel"> ${client.tel} </span><br> 
                                <span style="color: gray">Residence: </span>
                                <span class="clientResidence">${client.residence} </span> <br>
                                <a  href="./order.html"  target="_blank" onclick="setSearch('${client.username}')" style="color: #A0AECD;"> <span >Orders</span></a> 
                                <hr>
                                </small>

                                <span style="color: gray">Favourite animals: </span> 
                                <span class="clientPreferences">${client.preferences} </span>  <br>
                                <a href="#" onclick=openAnimal("${client._id}") id="falseAnimal-${client._id}" style="color: #A0AECD"> <span >Show costumer's animals</span></a>
                            </p>
                        </div>
                        <div class="col-md-2">
                        <div class="row g-0" >   
                            <a href="#" class="btn btn-primary" style="background-color: #A0AECD; border-color: #A0AECD; color: white; float:right; margin:1px;" data-bs-toggle="modal" data-bs-target="#Modal-${client._id}">Delete</a> 
                        </div>
                        <div class="row g-0" >   
                            <a href="#" class="btn btn-primary" style="background-color: #425664; border-color: #425664; color: white; float:right; margin:1px;" data-bs-toggle="modal" data-bs-target="#ModalU-${client._id}"><small>Modify</small></a>
                        </div>
                        <div class="row g-0" >   
                            <a href="#" class="btn btn-success" style="background-color: #849531; border-color: #849531; color: white; float:right; margin:1px;" data-bs-toggle="modal" data-bs-target="#ModalAnimal-${client._id}"><small>Add animal</small></a>  
                        </div>
                            
                            <!-- Modal -->
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                                <div class="modal fade" id="Modal-${client._id}" tabindex="-1" aria-labelledby="ModalLabel-${client._id}" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content" style="background-color:#A0AECD;">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="ModalLabel" style="color: black;">Delete</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close the modal"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p style="color: black;">Are you sure you want to delete this client?</p>
                                    </div>
                                    <div class="modal-footer">                            
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="background-color: #425664; border-color: #425664;"  aria-label="Don't delete the client">No</button>
                                        <button type="button" class="btn btn-success" onclick=sureDeleteClient("${client._id}") style="margin:1px; background-color: #849531; border-color: #849531;"  aria-label="Delete the client">Yes</button>
                                    </div>
                                    </div>
                            </div>
                                </div>
                            </div>

                            <!-- Modal -->
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                                <div class="modal fade" id="ModalU-${client._id}" tabindex="-1" aria-labelledby="ModalLabel-${client._id}" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="ModalLabel-${client._id}">Modify</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>

                                    <!-- Body -->
                                    <div class="modal-body">
                                    <div class="callout" id="callout-${client._id}" style="display: none;">
                                        <div class="callout-header"></div>
                                        <span class="closebtn" onclick="this.parentElement.style.display='none';">×</span>
                                    </div>
                                    <form id="FormModify-${client._id}">
                                        <div class="row mb-2">
                                            <label class="col-sm-2 col-form-label" for=""modName-${client._id}">Name</label>
                                            <div class="col">
                                                <input id="modName-${client._id}" type="text" class="form-control" placeholder="${client.name}" aria-label="First name">
                                            </div>
                                            <div class="col">
                                                <input id="modSurname-${client._id}" type="text" class="form-control" placeholder="${client.surname}" aria-label="Last name">
                                            </div>
                                        </div>

                                        <div class="row mb-2">
                                            <label class="col-sm-2 col-form-label" "modTel-${client._id}>Contact</label>
                                            <div class="col">
                                                <input id="modEmail-${client._id}" type="email" class="form-control" placeholder="Email" aria-label="Email">
                                            </div>
                                            <div class="col">
                                                <div class="input-group">
                                                    <span class="input-group-text">&phone;</span>
                                                    <input type="tel" class="form-control" id="modTel-${client._id}" aria-label="Telephone number" placeholder="${client.tel}">
                                                </div>
                                            </div>
                                        </div>  
                                        
                                        <div class="row mb-2">
                                            <label for="modAdd-${client._id}" class="col-sm-3 col-form-label">Address</label>
                                            <div class="col-sm-9">
                                                <input type="address" class="form-control" id="modAdd-${client._id}" placeholder="${client.residence}" aria-label="Residential address">
                                            </div>                           
                                        </div> 

                                        <div class="row mb-2">
                                            <label for="modUsername-${client._id}" class="col-sm-3 col-form-label">Username</label>
                                            <div class="col-sm-9">
                                                <input type="username" class="form-control" id="modUsername-${client._id}" placeholder="${client.username}" aria-label="Username">
                                            </div>
                                        </div>

                                        <div class="row mb-2">
                                            <label for="modPass-${client._id}" class="col-sm-3 col-form-label">Password</label>
                                            <div class="col-sm-9">
                                                <input type="password" class="form-control" id="modPass-${client._id}" placeholder="${client.password}" aria-label="Password">
                                            </div>
                                        </div>                                                                       

                                        <div class="row mb-2">
                                            <label for="modPref-${client._id}" class="col-sm-3 col-form-label">Preferences</label>
                                            <div class="col-sm-9">
                                                <input type="string" class="form-control" id="modPref-${client._id}" placeholder="${client.preferences}" aria-label="Client's preferences">
                                            </div>
                                        </div>

                                        <div class="row mb-2" >
                                            <label for="modImg-${client._id}" class="form-label">Select a new image</label>
                                            <div class="col-sm-12" >
                                            
                                                <input type="file" class="form-control" name='file' value='Choose Photo' accept='image/png' id="modImg-${client._id}" placeholder="${img}">                                            
                                            
                                            </div>   
                                        </div>   
                                    </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="reset" form="FormModify-${client._id}" class="btn" data-bs-dismiss="modal" style="background-color: #A0AECD; border-color: #A0AECD;">Discard</button>
                                        <button type="button" class="btn" onclick=modifyClient("${client._id}") style="background-color: #849531; border-color: #849531;" aria-label="save changes">Save changes</button>
                                    </div>

                                    </div>
                                </div>
                                </div>
                            
                            </div>

                            <!-- Modal 2 -->
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                                <div class="modal fade" id="ModalAnimal-${client._id}" tabindex="-1" aria-labelledby="ModalLabelAnimal-${client._id}" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="ModalLabelAnimal-${client._id}">Modify</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>

                                    <!-- Body -->
                                    <div class="modal-body">
                                    <div class="callout" id="calloutmod-${client._id}" style="display: none;">
                                        <div class="callout-header"></div>
                                        <span class="closebtn" onclick="this.parentElement.style.display='none';">×</span>
                                    </div>
                                    <form id="FormModifyAnimal-${client._id}">
                                        <div class="row mb-2">
                                            <label class="col-sm-2 col-form-label" for="inputName-${client._id}">Name*</label>
                                            <div class="col-sm-6">
                                                <input id="inputName-${client._id}" type="text" class="form-control" aria-label="Name" required>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="input-group">
                                                    <label class="input-group-text" for="inputAge-${client._id}">Age</label>
                                                    <input type="number" id="inputAge-${client._id}" class="form-control" aria-label="Age" >
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mb-2">
                                            <label class="col-sm-3 col-form-label" for="inputSpecies-${client._id}">Species*</label>
                                            <div class="col-sm-5">
                                                <input id="inputSpecies-${client._id}" type="text" class="form-control" aria-label="Species" required>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="input-group">
                                                    <label class="input-group-text" for="inputSpecies-${client._id}">Sex</label>
                                                    <select id="inputSex-${client._id}" class="form-select">
                                                        <option value="Female">F</option>
                                                        <option value="Male">M</option>
                                                    </select>  
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mb-2">
                                            <label class="col-sm-3 col-form-label" for="inputBreed-${client._id}">Breed</label>
                                            <div class="col-sm-9">
                                                <input id="inputBreed-${client._id}" type="text" class="form-control" aria-label="Breed">
                                            </div>
                                        </div>

                                        <div class="mb-2">
                                            <label for="inputDescription-${client._id}" class="form-label">Description</label>
                                            <textarea class="form-control" id="inputDescription-${client._id}" rows="2" placeholder="Write something about the animal" aria-label="Description of the animal"></textarea>
                                        </div>                                        

                                        <div class="row mb-2">
                                            <label for="inputImg-${client._id}" class="form-label">Select an image</label>
                                            <div class="col-sm-12">
                                                <input type="file" class="form-control" name='file' accept='image/png' id="inputImg-${client._id}">
                                            </div>   
                                        </div>   

                                    </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="reset" form="FormModifyAnimal-${client._id}" class="btn" data-bs-dismiss="modal" style="background-color: #A0AECD; border-color: #A0AECD;">Discard</button>
                                        <button type="button" class="btn" onclick=addClientAnimal("${client._id}") style="background-color: #849531; border-color: #849531;" aria-label="save changes">Save changes</button>
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

        <div class="container" id="ownAnimal-${client._id}">
        </div>
    </div> 
    ` 
    )
}

function setSearch(username){
    localStorage.setItem("search", username) ;
}

function showPassword(id, pass){
    if ($("#false-"+id).length) { 
        //console.log( $("#false-"+id) );
        $("#false-"+id).html(pass); 
        $("#false-"+id).attr("id", "true-"+id);        
    }
    else if ($("#true-"+id).length){ 
        //console.log("prova2");
        $("#true-"+id).text("Password"); 
        $("#true-"+id).attr("id", "false-"+id);
    }
}


//CREATE
function createClient(){
    let data = {}
    const fileInput = document.querySelector('input[type="file"]');
    if(fileInput.files.item(0).size > 100000){
        $('#callout').attr('style', 'display: block')
        $('.callout-header').text('The input file must be smaller than 100 KB')
        return false;
    };

    data.name = $("#inputName").val()
    data.surname = $("#inputSurname").val()
    data.username = $("#inputUsername").val()
    if ($("#inputImg").val() != "") {
        data.img = fileInput.files.item(0).name
    }
    data.password = $("#inputPass").val()
    data.tel = $("#inputTel").val()
    data.residence = $("#inputAdd").val()
    data.preferences = $("#inputPref").val().replace(/\s+/g, "").split(",")
    
    if (data.username.length==0 || data.password.length==0 || data.preferences.length==0){
        //alert("Fill the mandatory fields")
        $('#callout').attr('style', 'display: block')
        $('.callout-header').text('Fill the mandatory fields')
        return
    }

    let result_id = ""

    $.ajax({
        type: 'POST',
        url: url + "/user",
        crossDomain: true,
        contentType: "application/json",

        data: JSON.stringify({
            username: data.username,
            surname: data.surname,
            name: data.name,
            img: data.img,
            password: data.password,
            tel: data.tel,
            residence: data.residence,
            preferences: data.preferences,
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

    }).then( async ()=>{
        await uploadImg(fileInput.files.item(0) , result_id);
        window.location.reload()
    }
    );    
    return false;
}


function sureDeleteClient(id){
    $.ajax({
        type: 'DELETE',
        url: url + "/user/" + id,
        crossDomain: true,
        success: function(res) {
            console.log(res);
        },
        error: function(err) {
            console.log(err);
        },

    }).then( async ()=> {
        for (let key in animalList) {
            console.log(animalList[key])
            if (animalList[key].client_id == id) {
                console.log(animalList[key].client_id)
                sureDeleteAnimal(animalList[key]._id)
            }
        };
        await deleteImg(id + ".png");
        window.location.reload();
        
    })
    return false;
}


//MODIFY
async function modifyClient(id){
    let data = {}

    if ($("#modName-"+id).val()!="") {data.name = $("#modName-"+id).val()}
    if ($("#modSurname-"+id).val()!="") {data.surname = $("#modSurname-"+id).val()}
    if ($("#modUsername-"+id).val()!="") {data.username = $("#modUsername-"+id).val()}
    if ($("#modPass-"+id).val()!="") {data.password = $("#modPass-"+id).val()}
    if ($("#modImg-"+id).val()!="") {
        let imm = document.getElementById("modImg-"+id).files.item(0);
        console.log(imm)
        if(imm.size > 100000){
            $('#callout-'+id).attr('style', 'display: block')
            $('.callout-header').text('The input file must be smaller than 100 KB')
            return false;
        };
        data.img = imm.name;

        console.log("mod")
        //DA RIVEDERE
        //deleteImg(id + ".png");
        await uploadImg(imm, id)

    }
    if ($("#modTel-"+id).val()!="") {data.tel = $("#modTel-"+id).val()}
    if ($("#modAdd-"+id).val()!="") {data.residence = $("#modAdd-"+id).val()}
    if ($("#modPref-"+id).val()!="") {data.preferences = $("#modPref-"+id).val().replace(/\s+/g, "").split(",")}

    $.ajax({
        type: 'PATCH',
        url: url + "/user/id/" + id,
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


function searchByNameUsername(){
    var searchLists = []
    let search = $("#searchClient").val().toLowerCase()
    console.log(search)
    
    for (let i in clientsList){
        console.log(i)
        let name = ""
        if (clientsList[i].name != undefined){
            name = clientsList[i].name.toLowerCase()
        }
        let surname = ""
        if (clientsList[i].surname != undefined){
            surname = clientsList[i].surname.toLowerCase()
        }
        let username = clientsList[i].username.toLowerCase()
        if (name.includes(search) || surname.includes(search) || username.includes(search)){
            searchLists.push(clientsList[i])
        }
    }
    clients(searchLists);
}


function openAnimal(id){
    $("#ownAnimal-"+id).empty()
    if ($("#falseAnimal-"+id).length) {
        let count = 0;
        for (let key in animalList) {

            if (animalList[key].client_id == id) {
                count ++;
                let animal = animalList[key];

                let img = "animalPic.png"
                if (animal.img != img && (animal.img != "" || animal.img != undefined)){ img = animal._id + ".png"}

                $("#ownAnimal-"+id).append(`
                
                <div class="card mb-2 mt-2">
                    <div class="row g-0">
                        <div class="col-md-3">
                            <img src="${img}" class="img-fluid rounded" alt="Image of the animal: ${animal.name}" style="width: 100%; height: auto;">
                        </div>
                        <div class="col-md-6">
                            <div class="card-body">
                                <h5 class="card-title">${animal.name}</h5>
                                <p class="card-text">
                                    <span class="animalDescription"> ${animal.description} </span><br> 
                                </p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        <span class="animalAge"> ${animal.age} years old, </span>
                                        <span class="animalSex"> ${animal.sex}, </span>
                                        <span class="animalBreed"> ${animal.species} - </span> 
                                        <span class="animalBreed"> ${animal.breed} </span> 
                                    </small>
                                </p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#Modal-${animal._id}" style="background-color: #A0AECD; color: white; float:right; margin:3px;"><small>Delete</small></a>
                            <!-- Modal -->
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                                <div class="modal fade" id="Modal-${animal._id}" tabindex="-1" aria-labelledby="ModalLabel-${animal._id}" aria-hidden="true">
                                <div class="modal-dialog">
                                <div class="modal-content" style="background-color:#A0AECD;">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="ModalLabel" style="color: black;">Delete</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close the modal"></button>
                                </div>
                                <div class="modal-body">
                                    <p style="color: black;">Are you sure you want to delete this animal?</p>
                                </div>
                                <div class="modal-footer">                            
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="background-color: #425664; border-color: #425664;"  aria-label="Don't delete the animal">No</button>
                                    <button type="button" class="btn btn-success" onclick=sureDeleteAnimal("${animal._id}") style="margin:1px; background-color: #849531; border-color: #849531;"  aria-label="Delete the animal">Yes</button>
                                </div>
                                </div>
                            </div>
                                </div>
                            </div>
                            <a href="#" class="btn btn-primary" style="background-color: #425664; border-color: #425664; float:right; margin:3px;" data-bs-toggle="modal" data-bs-target="#ModalAnimalMOD-${animal._id}"><small>Modify</small></a><br>
                            
                            <!-- Modal 3 -->
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                                <div class="modal fade" id="ModalAnimalMOD-${animal._id}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="ModalLabelAnimal-${animal._id}">Modify</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>

                                    <!-- Body -->
                                    <div class="modal-body">
                                    <div class="callout" id="callout-${animal._id}" style="display: none;">
                                        <div class="callout-header"></div>
                                        <span class="closebtn" onclick="this.parentElement.style.display='none';">×</span>
                                    </div>
                                    <form id="FormModifyAnimal-${animal._id}">
                                        <div class="row mb-2">
                                            <label class="col-sm-2 col-form-label">Name*</label>
                                            <div class="col-sm-6">
                                                <input id="modName-${animal._id}" type="text" class="form-control" aria-label="Name" placeholder="${animal.name}">
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="input-group">
                                                    <span class="input-group-text">Age</span>
                                                    <input type="number" id="modAge-${animal._id}" value="${animal.age}" class="form-control" aria-label="Age" >
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mb-2">
                                            <label class="col-sm-3 col-form-label">Species</label>
                                            <div class="col-sm-5">
                                                <input id="modSpecies-${animal._id}" placeholder="${animal.species}" type="text" class="form-control" aria-label="Species">
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="input-group">
                                                    <span class="input-group-text">Sex</span>
                                                    <select id="modSex-${animal._id}" class="form-select">
                                                        <option disabled selected> ${animal.sex} </option>
                                                        <option value="Female">F</option>
                                                        <option value="Male">M</option>
                                                    </select>  
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mb-2">
                                            <label class="col-sm-3 col-form-label">Breed</label>
                                            <div class="col-sm-9">
                                                <input id="modBreed-${animal._id}" placeholder="${animal.breed}" type="text" class="form-control" aria-label="Breed">
                                            </div>
                                        </div>

                                        <div class="mb-2">
                                            <label for="modDescription-${animal._id}" class="form-label">Description</label>
                                            <textarea class="form-control" id="modDescription-${animal._id}" rows="2" aria-label="Description of the animal">${animal.description}</textarea>
                                        </div>                                        

                                        <div class="row mb-2">
                                            <label for="modImg-${animal._id}" class="form-label">Select a new image</label>
                                            <div class="col-sm-12">
                                                <input type="file" class="form-control" name='file' accept='image/png' id="modImg-${animal._id}" >
                                            </div>   
                                        </div>   

                                    </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="reset" form="FormModifyAnimal-${animal._id}" class="btn btn" data-bs-dismiss="modal" style="background-color: #A0AECD; border-color: #A0AECD;">Discard</button>
                                        <button type="button" class="btn" onclick=changeClientAnimal("${animal._id}") style="background-color: #849531; border-color: #849531;">Save changes</button>
                                    </div>

                                    </div>
                                </div>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
                ` ); 
            }
        }
        if (count == 0){
            $("#ownAnimal-"+id).append(`<div class="container mt-2" style="color:849531; text-align: center;">The costumer has no pets </div>`);
        }        
        $("#falseAnimal-"+id).children("span").text("Hide costumer's animals");
        $("#falseAnimal-"+id).attr("id", "trueAnimal-"+id); 
         
    }
    else if ($("#trueAnimal-"+id).length) {
        $("#ownAnimal-"+id).empty(); 
        $("#trueAnimal-"+id).children("span").text("Show costumer's animals");
        $("#trueAnimal-"+id).attr("id", "falseAnimal-"+id);
    }
}


function changeClientAnimal(id){
    let data = {}

    if ($("#modName-"+id).val()!="") {data.name = $("#modName-"+id).val()}
    if ($("#modAge-"+id).val()!="") {data.age = $("#modAge-"+id).val()}
    if ($("#modSpecies-"+id).val()!="") {data.species = $("#modSpecies-"+id).val().toLowerCase()}
    if ($("#modBreed-"+id).val()!="") {data.breed = $("#modBreed-"+id).val().toLowerCase()}
    if ($("#modSex-"+id).val()!="") {data.sex = $("#modSex-"+id).val()}
    if ($("#modDescription-"+id).val()!="") {data.description = $("#modDescription-"+id).val()}
    if ($("#modImg-"+id).val()!="") {
        let imm = document.getElementById("modImg-"+id).files.item(0);
        if(imm.size > 100000){
            $('#callout-'+id).attr('style', 'display: block')
            $('.callout-header').text('The input file must be smaller than 100 KB')
            return false;
        };
        console.log(imm)
        data.img = imm.name;

        console.log("mod")
        //DA RIVEDERE
        //deleteImg(id + ".png");
        uploadImg(imm, id)

    }
    $.ajax({
        type: 'PATCH',
        url: url + "/animal/" + id,
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


function addClientAnimal(id){
    console.log(id)
    let data = {}
    let fileInput = 0
    if ($("#inputImg-"+id).val() != "" ) {
        fileInput = document.getElementById('inputImg-'+id).files.item(0);
        if(fileInput.size > 100000){
            $('#calloutmod-'+id).attr('style', 'display: block')
            $('.calloutmod-header').text('The input file must be smaller than 100 KB')
            return false;
        };
        console.log(fileInput)
        data.img = fileInput.name
    }

    data.name = $("#inputName-"+id).val()
    data.sex = $("#inputSex-"+id).val()
    data.species = $("#inputSpecies-"+id).val().toLowerCase()
    data.breed = $("#inputBreed-"+id).val().toLowerCase()
    data.age = $("#inputAge-"+id).val()
    data.description = $("#inputDescription-"+id).val()
    data.sale = false
    data.client_id = id
    
    if (data.name.length==0 || data.species.length==0 ){
        //alert("Fill the mandatory fields")
        $('#calloutmod').attr('style', 'display: block')
        $('.callout-header').text('Fill the mandatory fields')
        return
    }

    let result_id = ""

    $.ajax({
        type: 'POST',
        url: url + "/animal",
        crossDomain: true,
        contentType: "application/json",

        data: JSON.stringify({
            sale: data.sale,
            client_id: data.client_id,
            name: data.name,
            img: data.img,
            age: data.age,
            sex: data.sex,
            species: data.species,
            breed: data.breed,
            description: data.description,
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

    }).then( async ()=>{
        await uploadImg(fileInput, result_id);
        window.location.reload();
    })
    return false;
}


function sureDeleteAnimal(id){
    $.ajax({
        type: 'DELETE',
        url: url + "/animal/" + id,
        crossDomain: true,
        success: function(res) {
            console.log(res);
        },
        error: function(err) {
            console.log(err);
        },

    }).then( async ()=> {
        await deleteImg(id + ".png");
        window.location.reload();
    })
    return false;
}