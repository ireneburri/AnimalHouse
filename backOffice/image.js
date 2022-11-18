async function uploadImg(img, id){
    if (img != undefined){
        console.log("up")
        
        var blob = img.slice(0, img.size, 'image/*'); 
        let imm = new File([blob], id + ".png", {type: 'image/*'})
        console.log(id)
        console.log(imm)

        let formData = new FormData();           
        formData.append("file", imm);

        $.ajax({
            type: 'POST',
            url: url + "/image",
            crossDomain: true,

            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            data: formData,

            success: function(result) {
                console.log("yay");
                //debugger
                console.log(result);
            },
            error: function(err) {
                console.log("nuu");
                console.log(err);
            }

        });    
        return false;

    }
}


async function deleteImg(imgName){   
    console.log("del")
    console.log(imgName)
    $.ajax({
        type: 'DELETE',
        url: url + "/image/" + imgName,
        crossDomain: true,
        success: function(res) {
            console.log(res);
            return true;
        },
        error: function(err) {
            console.log(err);
            return false;
        },
    });/*.then( ()=> {
        window.location.reload()
    });*/
}
