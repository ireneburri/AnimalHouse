const url = "https://site212224.tw.cs.unibo.it"
var postsList = []
var commentsList = []
var categoryList = []
var staffList = []

function logout(){
    var result = confirm("Are you sure you want to logout?");
    if (result) {
        localStorage.clear();
        $(location).attr('href','./login.html');
    }
}

//document ready => getAllPost
$( document ).ready( verifyToken() );

function verifyToken(){
    if (localStorage.token==undefined){
        $(location).attr('href','./login.html');
    } else {
        console.log("SI "+localStorage.token)
        console.log(localStorage.username)
        getAllStaff()
        getAllPost()
    }
}

//GET ALL staff
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

//GET ALL post and comments
function getAllPost(){
    $.ajax({
        type: 'GET',
        url: url + "/board/category/" + "None",
        crossDomain: true,
        success: function(data) {
            console.log(data);
            postsList = data;
            posts(postsList);
        },
        error: function(err) {
            console.log(err);
        }
    })
}


//GET post in base alla categoria appena selezionata
function boardCategory(){
    var category = $("#categoryPost").val()
    if (category=="None"){
        $("#T").html("HomeBoard"); 
        getAllPost();
    }
    else{
        $("#T").html(category); 

        $.ajax({
            type: 'GET',
            url: url + "/board/category/" + category,
            crossDomain: true,
            success: function(data) {
                console.log(data);
                postsList = data;
                posts(postsList);
            },
            error: function(err) {
                console.log(err);
            }
        })
    }
}


//SUDDIVIDE post e commenti
function posts(postsList){
    $("#myDIV").empty()
    commentsList = []
    for (let i in postsList) {
        if(postsList[i].post_id==null || postsList[i].post_id==""){
            //console.log(postsList[i])
            showPost(postsList[i]);       
        }
        else{
            //console.log("PUSH")
            commentsList.push(postsList[i]);
        }
    }
    console.log(commentsList)
}


//VISUALIZZA un post
function showPost(post){

    let img 
    if (post.img == undefined || post.img == "" || post.img == "boardPic.png"){ 
        img = "boardPic.png" 
    } else if (post.img == "logoPic.png") { 
        img = post.img 
    } else { img = post._id + ".png" }

    let data = post.data.substring(0, 10);
    let hour = post.data.substring(11, 16);

    $("#myDIV").append(
        `  
        <div class="card mb-3"  id="${post._id}">
            <div class="row g-0" >
                <div class="col-md-2">
                    <img src="../routes/uploads/${img}" id="img-${post._id}"  value="${img}" class="img-fluid rounded" alt="Image of the post: ${post._id}" style="width: 100%; height: auto;">
                </div>
                <div class="col-md-10">
                    <div class="card-body">
                        <div class="row g-0" >     
                            <div class="col-md-10">
                                <h5 class="card-title"> 
                                    <span class="postTitle"> ${post.title} </span> 
                                </h5>
                                <p class="card-text">    
                                    <small>
                                        <span style="color: gray">Written by </span> <span class="postAuthor"> ${post.author} </span>
                                        <span style="color: gray"> on  <span class="postData">${data} </span>
                                        <span style="color: gray"> at  <span class="postData">${hour} </span> </span>   <br> <br>
                                    </small>                            
                                    <span>${post.text} </span><br>                                     
                                </p>
                            </div>
                            <div class="col-md-2">
                                <a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#ModalD-${post._id}" style="background-color: #A0AECD; color: white; float:right; margin:1px;"><small>Delete</small></a>
                                <!-- Modal -->
                                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                                    <div class="modal fade" id="ModalD-${post._id}" tabindex="-1" aria-labelledby="ModalLabelD-${post._id}" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content" style="background-color:#A0AECD;color: white;">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="ModalLabel">Are you sure you want to delete this post?</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn" style="background-color: #425664; border-color: #425664; color:white" data-bs-dismiss="modal" >No</button>
                                                <button type="button" class="btn" style="margin:1px;background-color: #849531;color: white;" onclick=sureDeletePost("${post._id}")>Yes</button>                             
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" class="btn btn-primary" style="float:right; margin:1px;background-color: #425664; border-color: #425664; color:white;" data-bs-toggle="modal" data-bs-target="#Modal-${post._id}"><small>Modify</small></a>
                                <br> <br>
                                <a href="#" style="float:right; margin:1px; color: 849531;" id="falseWri-${post._id}" onclick="writeComment('${post._id}', '${post.category}')"><small>Write a comments</small></a>
                                <a href="#" style="float:right; margin:1px;color:425664;" id="falseCom-${post._id}" onclick=findComments("${post._id}")><small>Show comments</small></a>

                                <!-- Modal -->
                                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                                    <div class="modal fade" id="Modal-${post._id}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="ModalLabel-${post._id}">Modify</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>

                                            <!-- Body -->
                                            
                                            <div class="modal-body">
                                                <form id="FormModify-${post._id}">

                                                    <div class="row mb-2">
                                                        <label class="col-sm-2 col-form-label">Title</label>
                                                        <div class="col-sm-10">
                                                            <input id="modTitle-${post._id}" type="text" class="form-control" placeholder="${post.title}" aria-label="Post's title">
                                                        </div>
                                                    </div>   

                                                    <div class="mb-2">
                                                        <label for="modText-${post._id}" class="form-label">Text</label>
                                                        <textarea class="form-control" id="modText-${post._id}" rows="2" aria-label="Text of the post">${post.text}</textarea>
                                                    </div>

                                                    <div class="mb-2" id="mod-${post._id}">
                                                        <input style="accent-color: red;" type="checkbox" id="modImg-${post._id}" name="img">
                                                        <label for="modImg-${post._id}"> Delete the post image </label>
                                                    </div>
                                                </form>

                                                <div class="modal-footer">
                                                    <button type="reset" form="FormModify-${post._id}" class="btn" style="background-color: #A0AECD; border-color: #A0AECD;" data-bs-dismiss="modal" >Discard</button>
                                                    <button type="button" class="btn" style="background-color: #849531; border-color: #849531;" onclick=modifyPost("${post._id}")>Save changes</button>
                                                    
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
        <div id="write-${post._id}">
            
        </div>
        <div id="comments-${post._id}">
            
        </div>
        `  
    );
    for (let key in staffList) {
        if (post.author == staffList[key].username) {
            $("#mod-"+post._id).prop("hidden", true);
        }
    }
}


//VISUALIZZA il form per inserire un commento ad un post
function writeComment(id, category){
    //console.log("PROVA")
    if ($("#falseWri-"+id).length) { 
        $("#write-"+id).append(
            ` 
            <div class="container"  style="margin-top: 15px;">
            <div class="card mb-2">
                <div class="row g-0" >
                    <div class="col-md-1 mt-3" >
                        <img src="immages/logoPic.png" class="img-fluid rounded" alt="Logo" style="width: 100%; height: auto;">
                    </div>
                    <div class="col-md-11">
                        <div class="card-body">
                            <div class="row g-0" >     
                                <div class="col-md-11">
                                    <form id="formComm-${id}">
                                        <input id="inputT-${id}" type="text" class="form-control" placeholder="Title" aria-label="Post's title"> <br>
                                        <textarea class="form-control" id="inputX-${id}" rows="2" aria-label="Text of the post" placeholder="Comment"></textarea>
                                    </form>
                                </div>
                                <div class="col-md-1">
                                    <button type="button" style="float:right; margin:1px;background-color: #849531;color:white;" class="btn" onclick='createCom("${id}","${category}")'>Post</button>
                                    <button type="reset" form="formComm-${id}" style="float:right; margin:1px;background-color: #A0AECD; border-color: #A0AECD; color:white;" class="btn" >X</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            ` 
        )
        //console.log( $("#falseWri-"+id) );
        $("#falseWri-"+id).attr("id", "trueWri-"+id);
    }
    else if ($("#trueWri-"+id).length) { 
        $("#write-"+id).html(""); 
        //console.log( $("#trueWri-"+id) );
        $("#trueWri-"+id).attr("id", "falseWri-"+id); 
    }
}


//VERIFICA se un post ha commenti
function findComments(id){
    //console.log("prova");
    if ($("#falseCom-"+id).length) { 
        let num=0;
        console.log(commentsList.length)
        for (let i in commentsList){
            if (commentsList[i].post_id == id){
                showComments(id, commentsList[i]);
                num++;
                console.log(num)
            }
        }
        if (num==0){        
            $("#comments-"+id).append(
                `  
                <div class="container m-2">
                    <span style="color:gray">There are no comments </span>
                </div>
                `  
            )
        }
        //console.log( $("#falseCom-"+id) );
        $("#falseCom-"+id).html("Hide comments"); 
        $("#falseCom-"+id).attr("id", "trueCom-"+id); 
    }
    else if ($("#trueCom-"+id).length) { 
        $("#comments-"+id).empty(); 
        //console.log( $("#trueCom-"+id) );
        $("#trueCom-"+id).html("Show comments"); 
        $("#trueCom-"+id).attr("id", "falseCom-"+id); 
    }
}


//VISUALIZZA tutti i commenti di un post
function showComments(id, comment){

    let img 
    if (comment.img == undefined || comment.img == "" || comment.img == "boardPic.png"){ 
        img = "boardPic.png" ;
    } else if (comment.img == "logoPic.png") { 
        img = comment.img 
    } else { img = comment._id + ".png" }

    let data = comment.data.substring(0, 10);
    let hour = comment.data.substring(11, 16);

    $("#comments-"+id).append(
        `  

        <div class="container" style="margin-top: 15px; ">
        
        <div class="card mb-3"  id="${comment._id}" >
            <div class="row g-0" >
                <div class="col-md-2">
                    <img src="../routes/uploads/${img}" id="img-${comment._id}" value=${img} class="img-fluid rounded" alt="Image of the post: ${comment._id}" style="width: 100%; height: auto;">
                </div>
                <div class="col-md-10">
                    <div class="card-body">
                        <div class="row g-0" >     
                            <div class="col-md-10">
                                <h6 class="card-title"> 
                                    <span class="postTitle"> ${comment.title} </span> 
                                </h6>
                                <p class="card-text">    
                                    <small>
                                        <span style="color: gray">Written by </span> <span class="postAuthor"> ${comment.author} </span>
                                        <span style="color: gray"> on  <span class="postData">${data} </span>
                                        <span style="color: gray"> at  <span class="postData">${hour} </span> </span> <br> <br>
                                    </small>                            
                                    <span>${comment.text} </span><br>                                     
                                </p>
                            </div>
                            <div class="col-md-2">
                                <a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#ModalD-${comment._id}" style="background-color: #A0AECD; color: white; float:right; margin:1px;"><small>Delete</small></a>
                                <!-- Modal -->
                                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                                    <div class="modal fade" id="ModalD-${comment._id}" tabindex="-1" aria-labelledby="ModalLabelD-${comment._id}" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content" style="background-color:#A0AECD;color: white;">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="ModalLabel">Are you sure you want to delete this comment?</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn" style="background-color: #425664; border-color: #425664; color:white" data-bs-dismiss="modal" >No</button>
                                                <button type="button" class="btn" style="margin:1px;background-color: #849531;color: white;" onclick=sureDeletePost("${comment._id}")>Yes</button>                             
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" class="btn" style="float:right; margin:1px;background-color: #425664; border-color: #425664; color:white;" data-bs-toggle="modal" data-bs-target="#Modal-${comment._id}"><small>Modify</small></a>
                                
                                <!-- Modal -->
                                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                                    <div class="modal fade" id="Modal-${comment._id}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="ModalLabel-${comment._id}">Modify</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>

                                            <!-- Body -->
                                            
                                            <div class="modal-body">
                                                <form id="FormModify-${comment._id}">

                                                    <div class="row mb-2">
                                                        <label class="col-sm-3 col-form-label">Title</label>
                                                        <div class="col-sm-9">
                                                            <input id="modTitle-${comment._id}" type="text" class="form-control" placeholder="${comment.title}" aria-label="Post's title">
                                                        </div>
                                                    </div>   

                                                    <div class="mb-2">
                                                        <label for="modText-${comment._id}" class="form-label">Text</label>
                                                        <textarea class="form-control" id="modText-${comment._id}" rows="2" aria-label="Text of the post">${comment.text}</textarea>
                                                    </div>
                                                    
                                                    <div class="mb-2" id="mod-${comment._id}">
                                                        <input style="accent-color: red;" type="checkbox" id="modImg-${comment._id}" name="img">
                                                        <label for="modImg-${comment._id}"> Delete the comment image </label>
                                                    </div>
                                                
                                                </form>


                                                <div class="modal-footer">
                                                    <button type="reset" form="FormModify-${comment._id}" class="btn" style="background-color: #A0AECD; border-color: #A0AECD;" data-bs-dismiss="modal" >Discard</button>
                                                    <button type="button" class="btn" style="background-color: #849531;" onclick=modifyPost("${comment._id}")>Save changes</button>
                                                    
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
    );
    for (let key in staffList) {
        if (comment.author == staffList[key].username) {
            console.log("trovato!");
            $("#mod-"+comment._id).prop("hidden", true);
        }
    }
}


//CREA un post nella bacheca
function createPost(){
    let data = {}

    data.title = $("#inputTitle").val()
    data.author = localStorage.username
    data.text = $("#inputText").val()
    data.img = "logoPic.png"
    data.comment = "false"
    data.category = $("#categoryPost").val()
    
    if (data.title==""){
        //alert("Choose a title")
        $('#callout').attr('style', 'display: block')
        $('.callout-header').text('Choose a title')
        return
    }
    if (data.text==""){
        //alert("Write something in the post")
        $('#callout').attr('style', 'display: block')
        $('.callout-header').text('Write something in the post')
        return
    }

    $.ajax({
        type: 'POST',
        url: url + "/board",
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify({
            title: data.title,
            author: data.author,
            text: data.text,
            img: data.img,
            comment: data.comment,
            category: data.category
        }),
        success: function(result) {
            console.log("yay");
            console.log(result);
        },
        error: function(err) {
            console.log("nuu");
            console.log(err);
        }

    }).then( ()=> //window.location.reload()
    {
        $("#FormPost").trigger("reset")

        boardCategory()
    });    
    return false;
}


//CREA un commento ad un post
function createCom(id, category){
    
    let data = {}

    data.title = $("#inputT-"+id).val()
    data.author = localStorage.username
    data.text = $("#inputX-"+id).val()
    data.img = "logoPic.png"
    data.post_id = id
    data.comment = "true"
    data.category = category
    
    if (data.title==""){
        //alert("Choose a title")
        $('#callout').attr('style', 'display: block')
        $('.callout-header').text('Choose a title')
        return
    }
    if (data.text==""){
        //alert("Write something in the post")
        $('#callout').attr('style', 'display: block')
        $('.callout-header').text('Write something in the post')
        return
    }

    $.ajax({
        type: 'POST',
        url: url + "/board",
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify({
            title: data.title,
            author: data.author,
            text: data.text,
            img: data.img,
            post_id: data.post_id,
            comment: data.comment,
            category: data.category
        }),
        success: function(result) {
            console.log("yay");
            console.log(result);
        },
        error: function(err) {
            console.log("nuu");
            console.log(err);
        }

    }).then( ()=> //window.location.reload()
    boardCategory());    
    return false;
}

function modifyPost(id){
    if ($("#modImg-"+id).is(':checked')) {
        var result = confirm("Are you sure you want to delete the post image?");
        if (result) {
            sureModifyPost(id);
        }
        
    } else {sureModifyPost(id);}
}

//MODIFICA un post
function sureModifyPost(id){
    let data = {} 

    if ($("#modTitle-"+id).val()!="") {data.title = $("#modTitle-"+id).val()}
    if ($("#modText-"+id).val()!="") {data.text = $("#modText-"+id).val()}
    console.log($("#img-"+id).attr("value"))
    if ($("#modImg-"+id).is(':checked') && $("#img-"+id).attr("value")!="logoPic.png") { 
        deleteImg(id + ".png"); 
        data.img = "boardPic.png";
    }
    $.ajax({
        type: 'PATCH',
        url: url + "/board/" + id,
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

    }).then( ()=> //window.location.reload()
    {
        $('#Modal-' + id).modal('hide');
        $('#ModalD-' + id).modal('hide');
        //boardCategory()
    }); 
    return false;
}


//ELIMINA un post
function sureDeletePost(id){
    $.ajax({
        type: 'DELETE',
        url: url + "/board/" + id,
        crossDomain: true,
        success: function(res) {
            console.log(res);
        },
        error: function(err) {
            console.log(err);
        },

    }).then( ()=>// window.location.reload()
    {boardCategory()
    $('#ModalD-' + id).modal('hide');}
    ); 


    //ELIMINA eventuali commenti al post appena rimosso
    let i=0;
    while (i<commentsList.length){
        if (commentsList[i].post_id == id){
            let comId = commentsList[i]._id;
            $.ajax({
                type: 'DELETE',
                url: url + "/board/" + comId,
                crossDomain: true,
                success: function(res) {
                    console.log(res);
                },
                error: function(err) {
                    console.log(err);
                },
        
            })
            commentsList.splice(i, 1);
        }
        else i++;
    }   
    return false;
}

