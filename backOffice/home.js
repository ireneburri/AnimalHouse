const url = "https://site212224.tw.cs.unibo.it"
var staff 

$(document).ready( verifyToken())

function verifyToken(){
    if (localStorage.tokenB==undefined){
        $(location).attr('href','./login.html');
    } else {
        console.log("SI "+localStorage.tokenB)
        console.log(localStorage.usernameB)

        getOneStaff()
    }
}

function getOneStaff(){
    $.ajax({
        type: 'GET',
        url: url + "/staff/username/"+ localStorage.usernameB,
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
    if( staff.img != "staffPic.png" && (staff.img != "" && staff.img != undefined)){
        img = staff._id + ".png"
    }

    $("#welcome").append(
        ` Welcome ${staff.name}
        `
    )
    $("#myDIV").append(
        ` 
        <div class="container" style="background-color: #A0AECD; border-radius:0.5ex;">
          <div class="row" style="padding:10px">
            <div class="col-md-4">
              <img src="${img}" class="img-fluid rounded" alt="Image of item: ${staff.username}" style="width: 100%; height: auto;">
            </div>
            
            <div class="col-md-8">   
            <div class="row mb-2">                     
              <div class="col"  style="background-color: #d3dcee; border-radius:0.5ex;padding:30px;text-align: center;margin-top:9%">
                <span style="color:#425664">Username:</span> <span id="Username" style="font-size:large;"> ${staff.username} </span> <br>
                <span style="color:#425664">Name: </span> <span id="Name" style="font-size:large;">${staff.name} ${staff.surname} </span> <br>
                <span style="color:#425664">Email: </span><span id="Email" style="font-size:large;">${staff.email} </span> <br>
                <span class="clientPassword" style="color: #849531;" id="false-password" role="button" onclick=showPassword("${staff.password}")> Password </span><br>
                <span style="color:#425664">Role: </span><span id="Role" style="font-size:large;">${staff.role} </span> <br>
                <span style="color:#425664">Location: </span><span id="Location" style="font-size:large;">${staff.location} </span>
              </div>
              </div>
            


                <div class="row mb-2">
                <a href="#" class="btn btn-primary" style="float:right; margin:1px;background-color: #425664; border-color: #425664; color:white;" data-bs-toggle="modal" data-bs-target="#Modal-${staff._id}"><small>Modify</small></a>
                </div>

                <!-- Modal -->
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                    <div class="modal fade" id="Modal-${staff._id}" tabindex="-1" aria-labelledby="ModalLabel-${staff._id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="ModalLabel-${staff._id}">Modify you profile</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <!-- Body -->
                            
                            <div class="modal-body">
                                <div class="callout" id="callout" style="display: none;">
                                    <div class="callout-header"></div>
                                    <span class="closebtn" onclick="this.parentElement.style.display='none';">×</span>
                                </div>
                                <form id="FormModify-${staff._id}">

                                    <div class="row mb-2">
                                        <label for="modPass-${staff._id}" class="col-sm-3 col-form-label">Password</label>
                                        <div class="col-sm-9">
                                            <input type="password" class="form-control" id="modPass-${staff._id}" placeholder="${staff.password}" aria-label="Password">
                                        </div>
                                    </div>

                                    <div class="mb-2">
                                        <label for="modImg-${staff._id}" class="form-label">Select new immagine</label>
                                        <input class="form-control" type="file" accept=".png" id="modImg-${staff._id}" placeholder="${staff.img}">
                                    </div>     
                                </form>

                                <div class="modal-footer">
                                    <button type="reset" form="FormModify-${staff._id}" class="btn" style="background-color: #A0AECD; border-color: #A0AECD;" data-bs-dismiss="modal" >Discard</button>
                                    <button type="button" class="btn" style="margin:1px;background-color: #849531;" onclick=modifyStaff("${staff._id}")>Save changes</button>
                                    
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

async function modifyStaff(id){
    let data = {}

    if ($("#modPass-"+id).val()!="") {data.password = $("#modPass-"+id).val()}
    if ($("#modImg-"+id).val()!="") {
        let imm = document.getElementById("modImg-"+id).files.item(0);

        console.log(imm.size);
        if(imm.size > 100000){
            $('#callout').attr('style', 'display: block')
            $('.callout-header').text('The input file must be smaller tan 100 KB')
            return false;
        };

        console.log(imm)
        data.img = imm.name;

        //DA RIVEDERE
        await deleteImg(id + ".png");
        await uploadImg(imm, id)

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
