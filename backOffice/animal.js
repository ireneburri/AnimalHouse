const url = "https://site212224.tw.cs.unibo.it"
var animalsList = []


//document ready GET ALL CLIENTS
$( document ).ready( verifyToken() );

function verifyToken(){
    if (localStorage.token==undefined){
        $(location).attr('href','./login.html');
    } else {
        console.log("SI "+localStorage.token)
        console.log(localStorage.username)

        getAllAnimal()
    }
}

function getAllAnimal(){
    $.ajax({
        type: 'GET',
        url: url + "/animal/sale/" + true,
        crossDomain: true,
        success: function(data) {
            console.log(data);
            animalsList = data;
            animals(animalsList);
        },
        error: function(err) {
            console.log(err);
        }
    })
}

function animals(animalsList){
    $("#myDIV").empty()
    for (let i in animalsList) {
        showAnimal(animalsList[i]);
    }
}


function showAnimal(animal){

    let img = "animalPic.png"
    if ( animal.img != img && (animal.img != "" || animal.img != undefined)){ 
        img = animal._id + ".png"
        console.log(img);
        img = img.trim()
        //img = "63b9fa8c8a941ae73743cdd0.png"
    } 

    $("#myDIV").append(
    `   
    <div class="card mb-3"  id="${animal.name}" >
        <div class="row g-0" >
            <div class="col-md-2">
                <img src="${img}" class="img-fluid rounded" alt="Image of animal: ${animal.name}" style="width: 100%; height: auto;">
            </div>
            <div class="col-md-10">
                <div class="card-body">
                    <div class="row g-0" >                        
                        <div class="col-md-4">
                            <h5 class="card-title"> 
                                <span class="animalName"> ${animal.name} </span> <br> 
                            </h5>    
                            <span style="color: gray">Species: </span>
                            <span class="animalSpecies"> ${animal.species} </span> <br> 
                            <span style="color: gray">Breed: </span>
                            <span class="animalBreed"> ${animal.breed} </span> <br> 
                        </div>
                        <div class="col-md-5">
                            <p class="card-text">  
                                <small> 
                                    <span id="animalAge"> ${animal.age} </span> years old <br>
                                    <!--span style="color: gray">Sex: </span-->
                                    <span class="animalSex"> ${animal.sex}</span> <br>
                                </small> <br>      

                                <span style="color: gray">Description: </span>
                                <span class="animalDescription">${animal.description} </span> 
                            </p>
                        </div>

                        <div class="col-md-2">
                            <span style="color: green">&euro; </span>
                            <span class="animalPrice">${animal.price} </span><br> 
                        </div>

                        <div class="col-md-1">
                            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal-${animal._id}" style="background-color: #A0AECD; border-color: #A0AECD; color:white; float:right; margin:1px;"><small>Delete</small></a>
                            <!-- Modal -->
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                                <div class="modal fade" id="Modal-${animal._id}" tabindex="-1" aria-labelledby="ModalLabel-${animal._id}" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content" style="background-color:#A0AECD;">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="ModalLabel-${animal._id}" style="color: black;">Delete</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close the modal"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p style="color: black;">Are you sure you want to delete this animal?</p>
                                    </div>
                                    <div class="modal-footer">                            
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="background-color: #425664; border-color: #425664;"  aria-label="Don't delete the service">No</button>
                                        <button type="button" class="btn btn-success" onclick=sureDeleteAnimal("${animal._id}") style="margin:1px; background-color: #849531; border-color: #849531;"  aria-label="Delete the service">Yes</button>
                                    </div>
                                </div>
                            </div>
                                </div>
                            </div>
                            <a href="#" class="btn btn-primary" style="float:right; margin:1px;background-color: #425664; border-color: #425664;" data-bs-toggle="modal" data-bs-target="#ModalMOD-${animal._id}"><small>Modify</small></a>
                            
                            <!-- Modal -->
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                                <div class="modal fade" id="ModalMOD-${animal._id}" tabindex="-1" aria-labelledby="ModalLabel-${animal._id}" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="ModalLabel-${animal._id}">Modify</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>

                                        <!-- Body -->
                                        
                                        <div class="modal-body">
                                            <form id="FormModify-${animal._id}">

                                                <div class="row mb-2">
                                                    <label class="col-sm-2 col-form-label" for="modName-${animal._id}">Name</label>
                                                    <div class="col-sm-5">
                                                        <input id="modName-${animal._id}" type="text" class="form-control" placeholder="${animal.name}" aria-label="Animal name">
                                                    </div>
                                                    <div class="col-sm-5">
                                                        <div class="input-group">
                                                            <label class="input-group-text" for="modAge-${animal._id}">Age</label>
                                                            <input type="number" class="form-control" id="modAge-${animal._id}" aria-label="Age" value="${animal.age}">
                                                        </div>
                                                    </div>
                                                </div>                                     

                                                <div class="row mb-2">
                                                    <label class="col-sm-2 col-form-label" for="modSpecies-${animal._id}">Species</label>
                                                    <div class="col">
                                                        <input id="modSpecies-${animal._id}" type="text" class="form-control" placeholder="${animal.species}" aria-label="Species">
                                                    </div>
                                                    <div class="col">
                                                        <div class="input-group">
                                                            <label class="input-group-text" for="modSex-${animal._id}">Sex</label>
                                                            <select id="modSex-${animal._id}" class="form-select" aria-label="Sex">
                                                                <option>Male</option>
                                                                <option>Female</option>
                                                            </select>  
                                                        </div> 
                                                    </div>
                                                </div> 

                                                <div class="row mb-2">
                                                    <label class="col-sm-2 col-form-label" for="modBreed-${animal._id}">Breed</label>
                                                    <div class="col-sm-5">
                                                        <input id="modBreed-${animal._id}" type="text" class="form-control" placeholder="${animal.breed}" aria-label="Animal breed">                                                    
                                                    </div>  
                                                    <div class="col">
                                                        <div class="input-group">
                                                            <div class="input-group">
                                                                <input type="text" class="form-control" id="modPrice-${animal._id}" aria-label="Price" placeholder="${animal.price}">
                                                                <label for="modPrice-${animal._id}" class="input-group-text">&euro;</label>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                </div> 

                                                <div class="mb-2">
                                                    <label for="modDescription-${animal._id}" class="form-label">Description</label>
                                                    <textarea class="form-control" id="modDescription-${animal._id}" rows="2" aria-label="Description of the animal">${animal.description}</textarea>
                                                </div>
                        
                                                <div class="mb-2">
                                                    <label for="modImg-${animal._id}" class="form-label">Select new immagine</label>
                                                    <input class="form-control" type="file" id="modImg-${animal._id}" placeholder="${animal.img}">
                                                </div>                                 
                                            </form>
                                        </div>


                                        <div class="modal-footer">
                                            <button type="reset" form="FormModify-${animal._id}" class="btn" data-bs-dismiss="modal" style="background-color: #A0AECD; border-color: #A0AECD;">Discard</button>
                                            <button type="button" class="btn" onclick=modifyAnimal("${animal._id}") style="background-color: #849531; border-color: #849531;" aria-label="Save changes">Save changes</button>
                                            
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


//CREATE
function createAnimal(){
    let data = {}

    const fileInput = document.querySelector('input[type="file"]');

    data.sale = true
    data.name = $("#inputName").val()
    data.price = $("#inputPrice").val()
    if ($("#inputImg").val() != "") {
        data.img = fileInput.files.item(0).name
    }
    data.species = $("#inputSpecies").val().toLowerCase()
    data.breed = $("#inputBreed").val().toLowerCase()
    data.age = $("#inputAge").val()
    data.description = $("#inputDescription").val()
    data.sex = $("#inputSex").val()
    
    if (data.name=="" || data.species==""){
        //alert("Fill the mandatory fields")
        $('#callout').attr('style', 'display: block')
        $('.callout-header').text('Fill the mandatory fields')
        return
    }

    let result_id = ""

    $.ajax({
        type: 'POST',
        url: url + "/animal",
        crossDomain: true,
        contentType: "application/json",
        headers:{authority: localStorage['token']},
        data: JSON.stringify({
            sale: data.sale,
            client_id: data.client_id,
            name: data.name,
            price: data.price,
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

    }).then( async ()=> {
        await uploadImg(fileInput.files.item(0) , result_id);
        window.location.reload()
    }) 
    return false;
}


//MODIFY
function modifyAnimal(id){
    let data = {}

    if ($("#modName-"+id).val()!="") {data.name = $("#modName-"+id).val()}
    if ($("#modPrice-"+id).val()!="") {data.price = $("#modPrice-"+id).val()}
    if ($("#modImg-"+id).val()!="") {

        let imm = document.getElementById("modImg-"+id).files.item(0);
        console.log(imm)
        data.img = imm.name;

        console.log("mod")
        //DA RIVEDERE
        //deleteImg(id + ".png");
        uploadImg(imm, id);

    }
    if ($("#modSpecies-"+id).val()!="") {data.species = $("#modSpecies-"+id).val()}
    if ($("#modBreed-"+id).val()!="") {data.breed = $("#modBreed-"+id).val()}
    if ($("#modAge-"+id).val()!="") {data.age = $("#modAge-"+id).val()}
    if ($("#modDescription-"+id).val()!="") {data.description = $("#modDescription-"+id).val()}
    if ($("#modSex-"+id).val()!="") {data.sex = $("#modSex-"+id).val()}

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


//DELETE
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
        window.location.reload()
    }) 
    return false;
}


function searchBySpeciesBreed(){
    var searchLists = []
    let search = $("#searchAnimal").val().toLowerCase()
    console.log(search)
    for (let i in itemsList){
        let name = itemsList[i].name.toLowerCase()
        if (name.includes(search)){
            searchLists.push(itemsList[i])
        }
    }
    items(searchLists);
}
