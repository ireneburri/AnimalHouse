
function logout(){
    var result = confirm("Are you sure you want to logout?");
    if (result) {
        localStorage.clear();
        $(location).attr('href','./login.html');
    }
}
