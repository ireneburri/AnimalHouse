const url = "https://site212224.tw.cs.unibo.it/backOffice"
var staff 

function logout(){
    swal("Are you sure you want to logout?", {
        buttons: ["Cancel", "Yes"],
        icon: "warning",
    })
    .then((willDelete) => {
        if (willDelete) {
            localStorage.clear(),
            $(location).attr('href','./login.html')} 
    });
    //var result = dialog("Are you sure you want to logout?");
    //if (result) {
     //   localStorage.clear();
     //   $(location).attr('href','./login.html');
    //}
}

$(document).ready( verifyToken())

function verifyToken(){
    if (localStorage.token==undefined){
        $(location).attr('href','./login.html');
    } else {
        console.log("SI "+localStorage.token)
        console.log(localStorage.username)

        getOneStaff()
    }
}

function getOneStaff(){
    $.ajax({
        type: 'GET',
        url: url + "/staff/username/"+ localStorage.username,
        crossDomain: true,
        success: function(data) {
            console.log(data);
            staff = data;
            showStaff(data[0]);
        },
        error: function(err) {
            console.log(err);
        }
    })
}


function showStaff(staff){

    let img = "staffPic.png"
    if( staff.img != "staffPic.png" && (staff.img != "" || staff.img != undefined)){
        img = staff._id + ".png"
    }

    $("#welcome").append(
        ` Welcome ${staff.name}
        `
    )
    $("#myDIV").append(
        ` 
        <div class="container" style="background-color: rgb(236, 227, 205); border-radius:0.5ex;">
          <div class="row" style="padding:10px">
            <div class="col-md-4">
              <img src="../routes/uploads/${img}" class="img-fluid rounded" alt="Image of item: ${staff.username}" style="width: 100%; height: auto;">
            </div>
            <div class="col-md-6">                        
              <div class="col">
                <span style="color:gray">Username:</span> <span id="Username" style="font-size:large;"> ${staff.username} </span> <br>
                <span style="color:gray">Name: </span> <span id="Name" style="font-size:large;">${staff.name} ${staff.surname} </span> <br>
                <span style="color:gray">Email: </span><span id="Email" style="font-size:large;">${staff.email} </span> <br>
                <span class="clientPassword" style="color: gray;" id="false-password" role="button" onclick=showPassword("${staff.password}")> Password </span><br>
                <span style="color:gray">Role: </span><span id="Role" style="font-size:large;">${staff.role} </span> <br>
                <span style="color:gray">Location: </span><span id="Location" style="font-size:large;">${staff.location} </span>
              </div>
            </div>


            <div class="col-md-2">
                <a href="#" class="btn btn-primary" style="float:right; margin:1px;" data-bs-toggle="modal" data-bs-target="#Modal-${staff._id}"><small>Modify</small></a>
                <!-- Modal -->
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                    <div class="modal fade" id="Modal-${staff._id}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="ModalLabel-${staff._id}">Modify you profile</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <!-- Body -->
                            
                            <div class="modal-body">
                                <form id="FormModify-${staff._id}">

                                    <div class="row mb-2">
                                        <label for="modPass-${staff._id}" class="col-sm-3 col-form-label">Password</label>
                                        <div class="col-sm-9">
                                            <input type="password" class="form-control" id="modPass-${staff._id}" placeholder="${staff.password}" aria-label="Password">
                                        </div>
                                    </div>

                                    <div class="mb-2">
                                        <label for="modImg-${staff._id}" class="form-label">Select new immagine</label>
                                        <input class="form-control" type="file" id="modImg-${staff._id}" placeholder="${staff.img}">
                                    </div>     
                                </form>

                                <div class="modal-footer">
                                    <button type="reset" form="FormModify-${staff._id}" class="btn btn-secondary" data-bs-dismiss="modal" >Discard</button>
                                    <button type="button" class="btn btn-primary" onclick=modifyStaff("${staff._id}")>Save changes</button>
                                    
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

function showPassword(pass){
    if ($("#false-password").length) { 
        $("#false-password").html(pass); 
        $("#false-password").attr("id", "true-password");        
    }
    else if ($("#true-password").length){ 
        $("#true-password").text("Password"); 
        $("#true-password").attr("id", "false-password");
    }
}

function modifyStaff(id){
    let data = {}

    if ($("#modPass-"+id).val()!="") {data.password = $("#modPass-"+id).val()}
    if ($("#modImg-"+id).val()!="") {
        let imm = document.getElementById("modImg-"+id).files.item(0);
        console.log(imm)
        data.img = imm.name;

        //DA RIVEDERE
        deleteImg(id + ".png");
        uploadImg(imm, id)

    }

    $.ajax({
        type: 'PATCH',
        url: url + "/staff/" + id,
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