const url = "https://site212224.tw.cs.unibo.it"
var staffList = []


//document ready => getAllstaff
$( document ).ready( verifyToken() );


function verifyToken(){
    if (localStorage.tokenB==undefined){
        $(location).attr('href','./login.html');
    } else {
        console.log("SI "+localStorage.tokenB)
        console.log(localStorage.usernameB)

        getAllStaff()
    }
}


//GET all staffs
function getAllStaff(){
    $.ajax({
        type: 'GET',
        url: url + "/staff",
        crossDomain: true,
        headers:{authority: localStorage['tokenB']},
        success: function(data) {
            console.log(data);
            staffList = data;
            staffs(staffList);
        },
        error: function(err) {
            console.log(err);
        }
    })
}


function staffs(staffList){
    $("#myDIV").empty()
    for (let i in staffList) {
        showStaff(staffList[i]);
    }
}



//VISUALIZZA tutti i dipendenti
function showStaff(staff){
    
    let img = "staffPic.png"
    if (staff.img != "staffPic.png" && (staff.img != "" && staff.img != undefined)){ 
        img = staff._id + ".png"
    } 

    $("#myDIV").append(
    `
    <div class="col">
        <div class="card h-100" >
            <img src="${img}" class="card-img-top" alt="Image of staff: ${staff.username}" style="width:100%;" >
            <div class="card-body">
                <h5 class="card-title" id="titleCard-${staff._id}">
                    <span class="staffName"> ${staff.name} ${staff.surname} </span>  
                </h5>
                <p class="card-text">
                    <small>     
                        <!--span style="color: gray">Username: </span-->                    
                        <span class="staffUsername"> ${staff.username} </span> <br> 
                        <!--span style="color: gray">Email: </span-->
                        <span class="staffEmail"> ${staff.email}</span> <br>
                    </small> 
                </p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <span style="color: gray">Role: </span>
                    <span class="staffRole">${staff.role} </span> <br>
                </li>
                <li class="list-group-item">
                    <span style="color: gray">Location: </span>
                    <span class="staffLocation">${staff.location} </span> <br>
                </li>
            </ul>
            <!--div class="card-body">
                <!--a href="#" id="openModal" class="btn btn-primary" onclick="verifyMod('${staff.name}', '${staff._id}')" style="float:right; margin:1px;"><small>Modify</small></a-->
            </div-->
        </div>
    </div>
    
    `)

    if (localStorage.usernameB == staff.username){
        $("#titleCard-"+staff._id).html("<a href='home.html' class='staffName' aria-label='link to your home page' style='color: #A0AECD;'>" + staff.name + " " + staff.surname + "</a>")
    }
}


function searchByNameUsername(){
    var searchLists = []
    let search = $("#searchStaff").val().toLowerCase()
    console.log(search)
    for (let i in staffList){
        let name = staffList[i].name.toLowerCase()
        let surname = staffList[i].surname.toLowerCase()
        let username = staffList[i].username.toLowerCase()
        if (name.includes(search) || surname.includes(search) || username.includes(search)){
            searchLists.push(staffList[i])
        }
    }
    staffs(searchLists);
}

