const url = "https://site212224.tw.cs.unibo.it"
var itemsList = []

//document ready GET ALL CLIENTS
$( document ).ready( verifyToken() );

function verifyToken(){
    if (localStorage.tokenB==undefined){
        $(location).attr('href','./login.html');
    } else {
        console.log("SI "+localStorage.tokenB)
        console.log(localStorage.usernameB)

        getAllItem()
    }
}

function getAllItem(){
    $.ajax({
        type: 'GET',
        url: url + "/item",
        crossDomain: true,
        success: function(data) {
            console.log(data);
            itemsList = data;
            //items(itemsList);
            filteredByVip()
        },
        error: function(err) {
            console.log(err);
        }
    })
}


function filteredByVip(){
    if ($("#checkVip").is(':checked')) { 
        let vipList = []
        for (let key in itemsList) {
            if (itemsList[key].vip == true) {
                vipList.push(itemsList[key])
            }
        }
        items(vipList)
    } else {
        items(itemsList)
    }
}


function items(itemsList){
    $("#myDIV").empty()
    for (let i in itemsList) {
        showItem(itemsList[i]);
    }
}


function showItem(item){

    let vip = ""
    let notvip = "NOT VIP"
    if(item.vip == true){
        vip = "VIP"
        notvip = vip 
    }

    let img = "itemPic.png"
    if ( item.img != img && (item.img != "" && item.img != undefined)){ 
        img = item._id + ".png"
    } 

    $("#myDIV").append(
    `   
    <div class="card mb-3"  id="${item.name}" >
        <div class="row g-0" >
            <div class="col-md-2">
                <img src="${img}" class="img-fluid rounded" alt="Image of item: ${item.name}" style="width: 100%; height: auto;">
            </div>
            <div class="col-md-10">
                <div class="card-body">
                    <div class="row g-0" >                        
                        <div class="col-md-3">
                            <h5 class="card-title"> 
                                <span class="itemName"> ${item.name} </span> <br> <small> &Cross; <span id="itemQuantity"> ${item.quantity}</span></small>
                            </h5>       
                            <small> 
                                <span style="color: gray">Category: </span>
                                <span class="itemCategory"> ${item.category} </span> <br> 
                                <span class="itemVip" style="color: #A0AECD;">${vip} </span>
                            </small>
                        </div>
                        <div class="col-md-7">
                            <p class="card-text">                                
                                <span style="color: green">&nbsp;&euro;&nbsp;</span>
                                <span class="itemPrice">${item.price} </span><br>  
                                
                                <span style="color: gray">Suitable for animal: </span>
                                <span class="itemAnimal"> ${item.animal}</span> <br>

                                <span style="color: gray">Suitable for species: </span>
                                <span class="itemSpecies"> ${item.species}</span> <br>
                            
                                <span style="color: gray">Item's brand: </span>
                                <span class="itemBrand">${item.brand} </span> <br>
                                
                                <span style="color: gray">Description: </span>
                                <span class="itemDescription">${item.description} </span> <br>
                            </p>
                        </div>
                        <div class="col-md-2">
                            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal-${item._id}" style="background-color: #A0AECD; border-color: #A0AECD; color:white; float:right; margin:1px;"><small>Delete</small></a>
                            <!-- Modal -->
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                                <div class="modal fade" id="Modal-${item._id}" tabindex="-1" aria-labelledby="ModalLabel-${item._id}" aria-hidden="true">
                                <div class="modal-dialog">
                                <div class="modal-content" style="background-color:#A0AECD;">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="ModalLabel-${item._id}" style="color: black;">Delete</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close the modal"></button>
                                </div>
                                <div class="modal-body">
                                    <p style="color: black;">Are you sure you want to delete this item?</p>
                                </div>
                                <div class="modal-footer">                            
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="background-color: #425664; border-color: #425664;"  aria-label="Don't delete the service">No</button>
                                    <button type="button" class="btn btn-success" onclick=sureDeleteItem("${item._id}") style="margin:1px; background-color: #849531; border-color: #849531;"  aria-label="Delete the service">Yes</button>
                                </div>
                                </div>
                            </div>
                                </div>
                            </div>
                            <a href="#" class="btn btn-primary" style="background-color: #425664; border-color: #425664; float:right; margin:1px;" data-bs-toggle="modal" data-bs-target="#ModalMOD-${item._id}"><small>Modify</small></a>
                            
                            <!-- Modal -->
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                                <div class="modal fade" id="ModalMOD-${item._id}" tabindex="-1" aria-labelledby="ModalLabel-${item._id}" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="ModalLabel-${item._id}">Modify</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>

                                        <!-- Body -->
                                        
                                        <div class="modal-body">
                                        <div class="callout" id="callout-${item._id}" style="display: none;">
                                            <div class="callout-header"></div>
                                            <span class="closebtn" onclick="this.parentElement.style.display='none';">×</span>
                                        </div>
                                            <form id="FormModify-${item._id}">

                                                <div class="row mb-2">
                                                    <label class="col-sm-3 col-form-label" for="modName-${item._id}">Name</label>
                                                    <div class="col-sm-5">
                                                        <input id="modName-${item._id}" type="text" class="form-control" placeholder="${item.name}" aria-label="Item name">
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <div class="input-group">
                                                            <label for="modQuantity-${item._id}" class="input-group-text">&numero;</label>
                                                            <input type="number" class="form-control" id="modQuantity-${item._id}" aria-label="Quantity" placeholder="${item.quantity}">
                                                        </div>
                                                    </div>
                                                </div>                                     

                                                <div class="row mb-2">
                                                    <label class="col-sm-3 col-form-label">Category</label>
                                                    <div class="col-sm-9">
                                                        <select id="modCategory-${item._id}" class="form-select" aria-label="Category">
                                                            <option selected>${item.category}</option>
                                                            <option>Food</option>
                                                            <option>Health Products</option>
                                                            <option>Toys</option>
                                                            <option>Accessories</option>
                                                            <option>Houses And Kennels</option>
                                                            <option>For Puppies</option>
                                                        </select>   
                                                    </div>                       
                                                </div> 

                                                <div class="row mb-2">
                                                    <label class="col-sm-3 col-form-label">Animal*</label>
                                                    <div class="col-sm-9">
                                                        <select id="modAnimal-${item._id}" class="form-select" aria-label="Animal" required>
                                                            <option selected>${item.animal}</option>
                                                            <option>For Everyone</option>
                                                            <option>Mammals</option>
                                                            <option>Birds</option>
                                                            <option>Reptiles</option>
                                                            <option>Amphibians</option>
                                                            <option>Fish</option>
                                                            <option>Insects</option>
                                                            <option>Others</option>
                                                        </select>  
                                                    </div>                       
                                                </div> 

                                                <div class="row mb-2">
                                                    <label for="modBrand-${item._id}" class="col-sm-3 col-form-label">Brand</label>
                                                    <div class="col-sm-5">
                                                        <input id="modBrand-${item._id}" type="text" class="form-control" placeholder="${item.brand}" aria-label="Item brand">
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <div class="input-group">
                                                                <input type="text" class="form-control" id="modPrice-${item._id}" aria-label="Price" placeholder="${item.price}">
                                                        <label for="modPrice-${item._id}" class="input-group-text">&euro;</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row mb-2">
                                                    <label for="modSpecies-${item._id}" class="col-sm-3 col-form-label">Species</label>
                                                    <div class="col-sm-9">
                                                        <input id="modSpecies-${item._id}" type="text" class="form-control" placeholder="${item.species}" aria-label="Item species">
                                                    </div>
                                                </div>

                                                <div class="row mb-2">
                                                    <label class="col-sm-3 col-form-label" for="modVip-${item._id}">Vip</label>
                                                    <div class="col-sm-9">
                                                        <select id="modVip-${item._id}" class="form-select">
                                                            <option style="color:gray" disabled selected>${notvip}</option>                                                        
                                                            <option>VIP</option>
                                                            <option>NOT VIP</option>
                                                        </select>    
                                                    </div>
                                                </div>

                                                <div class="mb-2">
                                                    <label for="modDescription-${item._id}" class="form-label">Description</label>
                                                    <textarea class="form-control" id="modDescription-${item._id}" rows="2" aria-label="Description of the item">${item.description}</textarea>
                                                </div>
                        
                                                <div class="mb-2">
                                                    <label for="modImg-${item._id}" class="form-label">Select new immagine</label>
                                                    <input class="form-control" type="file" id="modImg-${item._id}" placeholder="${item.img}">
                                                </div>                                 
                                            </form>
                                        </div>


                                        <div class="modal-footer">
                                            <button type="reset" form="FormModify-${item._id}" class="btn" data-bs-dismiss="modal" style="background-color: #A0AECD; border-color: #A0AECD;">Discard</button>
                                            <button type="button" class="btn" onclick=modifyItem("${item._id}") style="background-color: #849531; border-color: #849531;">Save changes</button>
                                            
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

//MODIFY
async function modifyItem(id){
    let data = {}

    if ($("#modName-"+id).val()!="") {data.name = $("#modName-"+id).val()}
    if ($("#modPrice-"+id).val()!="") {data.price = $("#modPrice-"+id).val()}
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
        await uploadImg(imm, id);

    }
    if ($("#modCategory-"+id).val()!="") {data.category = $("#modCategory-"+id).val()}
    if ($("#modAnimal-"+id).val()!="") {data.animal = $("#modAnimal-"+id).val()}
    if ($("#modSpecies-"+id).val()!="") {data.species = $("#modSpecies-"+id).val()}
    if ($("#modQuantity-"+id).val()!="") {data.quantity = $("#modQuantity-"+id).val()}
    if ($("#modDescription-"+id).val()!="") {data.description = $("#modDescription-"+id).val()}
    if ($("#modBrand-"+id).val()!="") {data.brand = $("#modBrand-"+id).val()}
    if ($("#modVip-"+id).val()=="VIP") {data.vip = true} else {data.vip = false}

    $.ajax({
        type: 'PATCH',
        url: url + "/item/" + id,
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



//CREATE
function createItem(){
    let data = {}

    const fileInput = document.querySelector('input[type="file"]');
    if(fileInput.files.item(0).size > 100000){
        $('#callout').attr('style', 'display: block')
        $('.callout-header').text('The input file must be smaller than 100 KB')
        return false;
    };

    data.name = $("#inputName").val()
    data.price = $("#inputPrice").val()
    if ($("#inputImg").val() != "") {
        data.img = fileInput.files.item(0).name
    }
    data.category = $("#inputCategory").val()
    data.animal = $("#inputAnimal").val()
    data.species = $("#inputSpecies").val()
    data.quantity = $("#inputQuantity").val()
    data.description = $("#inputDescription").val()
    data.brand = $("#inputBrand").val()
    data.vip = $("#inputVip").val();
    
    if (data.name=="" || data.price=="" || data.img=="" || data.category=="" || data.animal=="" || data.quantity==""){
        //alert("Fill the mandatory fields")
        $('#callout').attr('style', 'display: block')
        $('.callout-header').text('Fill the mandatory fields')
        return
    }
    data.size="All"
    let result_id = ""

    $.ajax({
        type: 'POST',
        url: url + "/item",
        crossDomain: true,
        contentType: "application/json",
        headers:{authority: localStorage['token']},
        data: JSON.stringify({
            name: data.name,
            price: data.price,
            img: data.img,
            category: data.category,
            animal: data.animal,
            species: data.species,
            quantity: data.quantity,
            size: data.size,
            description: data.description,
            brand: data.brand,
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

    }).then( async ()=> {
        await uploadImg(fileInput.files.item(0) , result_id);
        window.location.reload()
    })
    return false;
}


//DELETE
function sureDeleteItem(id){
    $.ajax({
        type: 'DELETE',
        url: url + "/item/" + id,
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


function searchByName(){
    var searchLists = []
    let search = $("#searchItem").val().toLowerCase()
    console.log(search)
    for (let i in itemsList){
        let name = itemsList[i].name.toLowerCase()
        if (name.includes(search)){
            searchLists.push(itemsList[i])
        }
    }
    items(searchLists);
}



