const url = "https://site212224.tw.cs.unibo.it/backOffice"
var orderList = [] 

//document ready => getAllLocation
$( document ).ready( verifyToken() );

function verifyToken(){
    if (localStorage.token==undefined){
        $(location).attr('href','./login.html');
    } else {
        console.log("SI "+localStorage.token)
        console.log(localStorage.username)

        getAllOrder()
    }
}

//GET all order
function getAllOrder(){
    $("#titlePag").text("Orders made by " + localStorage.search)

    $.ajax({
        type: 'GET',
        url: url + "/order/username/"+localStorage.search,
        crossDomain: true,
        success: function(data) {
            console.log(data);
            orderList = data;
            orders(orderList);
        },
        error: function(err) {
            console.log(err);
        }
    })
}


function orders(orderList){
    $("#myDIV").empty()
    if (orderList.length == 0){
        $("#myDIV").append("<span style='text-align:center'>No orders yet</span>")
    } else {
        for (let i in orderList) {
            showOrder(orderList[i]);
        }
    }
}


//VISUALIZZA tutte le sedi
function showOrder(order){
    let vip = "Not Vip"
    if (order.vip){
        vip = "Vip"
    }

    let data = order.date.substring(0, 10);
    let hour = order.date.substring(11, 16);

    $("#myDIV").append(
    ` 
    <div class="card h-100">
    <div class="card-body mx-1">
        <div class="container">
            <p class="my-2 mx-2" style="font-size: 20px;">Receipt of ${data} ${hour}</p>
            <div class="row">
                <!--ul class="list-unstyled">
                    <li style="color:gray;">Username: <span class="my-1 mx-1" style="font-size: 20px; color:black;">${order.username}</span></li>
                    <li  style="color: gray"> ${vip} </li>
                </ul-->
                <hr>
            </div> 
            
            <div id="receipt-${order._id}"></div>
            
            <div class="row text-black">

                <div class="col-xl-12">
                    <p class="float-end fw-bold">Total: &euro;${order.price}</p>
                </div>
                <hr style="border: 2px solid black;">
            </div>
        </div>
    </div>
    </div>
    `)
    
    for (let key in order.products) {
        const prod = order.products[key].replace(/'/gi,'"');
        console.log(JSON.parse(prod) );
        showProducts(order._id, JSON.parse(prod));
    }
    
}

function showProducts(id, product){

    $("#receipt-"+id).append(
    ` 
        <div class="row">
            <div class="col-xl-10">
                <p>${product.name}</p>
            </div>
            <div class="col-xl-2">
                <p class="float-end">&euro;${product.price}</p>
            </div>
            <hr>
        </div>
    `)
}
