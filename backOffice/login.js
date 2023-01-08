const url = "https://site212224.tw.cs.unibo.it"
staffList = []

$( document ).ready( getAllStaff );

function getAllStaff(){
    $.ajax({
        type: 'GET',
        url: url + "/staff",
        crossDomain: true,
        success: function(data) {
            console.log(data);
            staffList = data;
        },
        error: function(err) {
            console.log(err);
        }
    })
}

function login(){    
    let data = {}
    //data.auth = "staff"
    data.username = $("#usernameAuth").val()
    data.password = $("#passwordAuth").val()

    $.ajax({
        type: 'POST',
        url: url + "/auth/login/staff",
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify({
            username: data.username,
            password: data.password,
            //auth: data.auth
        }),
        success: function(result) {
            console.log("yay");
            console.log(result); //token

            localStorage.tokenB = result.authority;
            localStorage.usernameB = data.username;

            $(location).attr('href','./home.html');
        },
        error: function(err) {
            console.log("nuu");
            localStorage.clear()
            //alert("Wrong Username or Password")
            $('.callout').attr('style', 'display: block')
            console.log(err);
        }

    })//.then( ()=> window.location.reload());    
    return false;
}
