const url = "https://site212224.tw.cs.unibo.it"
var reservationList = []


//document ready => getAllstaff
$( document ).ready( verifyToken() );

function verifyToken(){
    if (localStorage.tokenB==undefined){
        $(staff).attr('href','./login.html');
    } else {
        console.log("SI "+localStorage.tokenB)
        console.log(localStorage.usernameB)
        
        getAllReservations()
    }
}


//GET all
function getAllReservations(){
    $.ajax({
        type: 'GET',
        url: url + "/reservation",
        crossDomain: true,
        success: function(data) {
            console.log(data);
            reservationList = data;
            reservations(reservationList);
        },
        error: function(err) {
            console.log(err);
        }
    })
}


function reservations(reservationList){
    $("#myDIV").empty()
    for (let i in reservationList) {
        showRes(reservationList[i]);
    }
}


//VISUALIZZA tutti i dipendenti
function showRes(reservation){

    let dataS = reservation.date_start.substring(0, 10);
    let hourS = reservation.date_start.substring(11, 16);

    let dataE = reservation.date_end.substring(0, 10);
    let hourE = reservation.date_end.substring(11, 16)

    $("#myDIV").append(
    `
    <div class="col h-100">
        <div class="card " >
            <div class="card-body">
                <h5 class="card-title" style="text-align: center" id="titleCard-${reservation._id}">
                    <span id="resService-${reservation._id}">${reservation.service} </span>  
                </h5>
                <p class="card-text">  
                    <span style="color: gray">Made by </span>
                    <span id="resUsername-${reservation._id}"> ${reservation.username}</span> <br> 
                    <span style="color: gray">At </span>                    
                    <span id="resLocation-${reservation._id}"> ${reservation.location} </span> <br> 
                    <div  style="text-align: right">
                        <span style="color: gray">Total </span>
                        <span id="resTotal-${reservation._id}">${reservation.total} </span> &euro;<br>
                    </div>
                    <hr>
                    <div id="dateReservation-${reservation._id}"></div>
                </p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" id="btn-${reservation._id}">
                    <a href="#" id="modifybtn-${reservation._id}" class="btn btn-primary" style="float:left; margin:1px;background-color:#425664; border-color: #425664;color:white;" onclick="modifyRes('${reservation._id}', '${reservation.allday}', '${reservation.time}', '${reservation.date_start}', '${reservation.date_end}', '${reservation.service}', '${reservation.location}')"><small>Modify</small></a>
                    <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalD-${reservation._id}" style="background-color: #A0AECD; color: white; float:right; margin:1px;"><small>Delete</small></a>
                    <!-- Modal -->
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                        <div class="modal fade" id="ModalD-${reservation._id}" tabindex="-1" aria-labelledby="ModalLabelD-${reservation._id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content" style="background-color:#A0AECD;">
                            <div class="modal-header">
                                <h5 class="modal-title" id="ModalLabel" style="color: black;">Delete</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close the modal"></button>
                            </div>
                            <div class="modal-body">
                                <p style="color: black;">Are you sure you want to delete this reservation?</p>
                            </div>
                            <div class="modal-footer">                            
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" style="background-color: #425664; border-color: #425664;"  aria-label="Don't delete the reservation">No</button>
                                <button type="button" class="btn btn-success" onclick=sureDeleteRes("${reservation._id}") style="margin:1px; background-color: #849531; border-color: #849531;"  aria-label="Delete the reservation">Yes</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    
    `);

    if (!reservation.allday){
        $("#dateReservation-"+reservation._id).append(
        `
            <div id="resTime-${reservation._id}" style="text-align: center">
                <span style="color: gray"> On </span> ${dataS} <br> <span style="color: gray"> At </span> ${hourS}  <span style="color: gray"> to </span> ${hourE} </span>
            </div>
        ` 
    )} else {
        $("#dateReservation-"+reservation._id).append(
        `
            <div id="resTime-${reservation._id}" style="text-align: center">
                <span style="color: gray"> On </span> ${dataS} <br> <span style="color: gray"> to </span> ${dataE} </span>
            </div>
        ` 
    )}
}

function modifyRes(id, allday, time, dateS, dateE, service, location){
    console.log(allday);
    if (allday=="false"){
        dateS = dateS.substring(0, 16);
        console.log(dateS)

        $("#resTime-"+id).empty()
        $("#resTime-"+id).append(
            `
            <input id="resModTime-${id}" type="datetime-local" id="date-${id}" value="${dateS}" step="3600" name="date" aria-label="Select reservation time">
            `
        )
    } else {
        dateS = dateS.substring(0, 10);
        dateE = dateE.substring(0, 10);
        console.log(dateS)

        $("#resTime-"+id).empty()
        $("#resTime-"+id).append(
            `
            <label for="resModDateS-${id}">Select the start date:</label>
            <input id="resModDateS-${id}" type="date" id="date-${id}" value="${dateS}" name="date"> 
            <hr>
            <label for="resModDateE-${id}">Select the end date:</label>
            <input id="resModDateE-${id}" type="date" id="date-${id}" value="${dateE}" name="date">
            `
        )
    }

    $("#btn-"+id).empty()
    $("#btn-"+id).append(
        `
        <a href="#" id="modifybtn-${id}" class="btn btn-primary" style="float:left; margin:1px;background-color: #A0AECD; border-color: #A0AECD; color:white;" onclick="sureModifyRes('false', '0')"><small>Discard</small></a>
        <a href="#" id="deletebtn-${id}" class="btn btn-success" style="float:right; margin:1px;background-color: #849531; border-color: #849531; color:white;" onclick="sureModifyRes('${id}', '${allday}', '${time}', '${service}', '${location}')"><small>Confirm</small></a>    
        `       
    )   
    
}


//MODIFICA un servizio
function sureModifyRes(id, allday, time, serName, locName){
    
    //voglio modificare la prenotazione
    if (id != "false"){

        let data = {}

        //questa cosa la devo fare se un servizio ha allday = false
        if (allday=="false"){
            if ($("#resModTime-"+id).val()!="") {
                let timeS = new Date($("#resModTime-"+id).val());
                let fuso = timeS.toString().substring(29, 31);
                timeS.setHours(timeS.getHours() + parseInt(fuso)); //DIPENDE DA FUSO ORARIO
                timeS.setMinutes("00");
                data.date_start = timeS;

                let timeE = new Date($("#resModTime-"+id).val());   
                let hourE = parseInt(fuso) + parseInt(time.substring(0, 2)) + timeE.getHours();            
                timeE.setHours(hourE);
                timeE.setMinutes("00");
                data.date_end = timeE;

                if( (data.date_start.getHours() - parseInt(fuso) ) < 8 ||
                    (data.date_start.getHours() - parseInt(fuso) ) > 20 || 
                    (data.date_end.getHours() - parseInt(fuso) ) < 8 ||
                    (data.date_end.getHours() - parseInt(fuso) ) > 20 ) {
                        //alert("You have to choose time between 8-20")
                        $('#callout').attr('style', 'display: block')
                        $('.callout-header').text('You have to choose time between 8-20')
                        return
                }
            }

        } else {
            if ($("#resModDateS-"+id).val()!="") { 
                data.date_start = new Date($("#resModDateS-"+id).val())
            }
            if ($("#resModDateE-"+id).val()!="") { 
                data.date_end = new Date($("#resModDateE-"+id).val())
            }
        }

        data.reservationList = reservationList;
        data.allday = allday; 
        data.location = locName;
        data.service = serName;

        $.ajax({
            type: 'PATCH',
            url: url + "/reservation/" + id,
            crossDomain: true,
            contentType: "application/json",
            data: JSON.stringify(data),        
            success: function(result) {
                console.log("yay");
                console.log(result); 
                if (result.message == "La prenotazione è sbagliata"){
                    $('#ModalOverlap').modal('toggle');
                } else {
                    window.location.reload();
                }
            },
            error: function(err) {
                console.log("nuu");
                console.log(err);
            }

        })//.then( ()=> window.location.reload());    
        return false;

    }

    //ho cliccato discard, non voglio modificare nessun orario
    else { 
        window.location.reload();
    }
}


//ELIMINA un servizio
function sureDeleteRes(id){
    $.ajax({
        type: 'DELETE',
        url: url + "/reservation/" + id,
        crossDomain: true,
        success: function(res) {
            console.log(res);
        },
        error: function(err) {
            console.log(err);
        },

    }).then( ()=> window.location.reload());    
    return false;
}

function searchByServiceUsernameLocation(){
    var searchLists = []
    let search = $("#searchReservation").val().toLowerCase()
    console.log(search)
    for (let i in reservationList){
        let service = reservationList[i].service.toLowerCase()
        let username = reservationList[i].username.toLowerCase()
        let location = reservationList[i].location.toLowerCase()
        if (service.includes(search) || username.includes(search) || location.includes(search)){
            searchLists.push(reservationList[i])
        }
    }
    reservations(searchLists);
}