import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const MyModal = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`

const SubmitButton = styled.button`
    display: inline-block;
    padding-left: 1em;
    padding-right: 1em;
    border: 0;
    text-decoration: none;
    border-radius: 8px;
    background-color: rgba(97, 196, 229, 0.5);
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(30px);
    color: black;
    font-size: 14px;
    letter-spacing: 2px;
    cursor: pointer;
    text-transform: uppercase;
    margin-left: 0.5em;
    &:hover{
        background-color: rgba(97, 196, 229, 0.6);
    }
`

const CloseButton = styled.button`
    display: inline-block;
    padding-left: 1em;
    padding-right: 1em;
    border: 0;
    text-decoration: none;
    border-radius: 8px;
    background-color: white;
    border: 1px solid  rgba(97, 196, 229, 0.5);
    backdrop-filter: blur(30px);
    color: black;
    font-size: 14px;
    letter-spacing: 2px;
    cursor: pointer;
    text-transform: uppercase;
    &:hover{
        background-color: rgba(215, 215, 216, 0.6);
    }
`

function ProfileModal(props) {
    var id = window.localStorage.getItem('userid')

    async function uploadImg(img, id) {
        if (img != undefined) {
            var blob = img.slice(0, img.size, 'image/*');
            let image = new File([blob], id + '.png', { type: 'image/*' })
            var form = new FormData();
            form.append("file", image)
            console.log(image);
            await axios.post("https://site212224.tw.cs.unibo.it/image/", form, {
                headers: {
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false
                }
            }).then((res) => {
                console.log(res);
            })

        }
    }
    
    const [info, setInfo] = useState({
        name: "",
        surname: "",
        username: "",
        password: "",
        residence: "",
        tel: "",
        img: ""
    })

    if (!props.show) {
        return null;
    }

    function submitNewInfo(e) {
        Object.keys(info).forEach(k => !info[k] && delete info[k])

        fetch("https://site212224.tw.cs.unibo.it/user/id/" + id, { //mi serve la patch per utente
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    name: info.name ? info.name : null,
                    surname: info.surname ? info.surname : null,
                    username: info.username ? info.username : null,
                    password: info.password ? info.password : null,
                    residence: info.residence ? info.residence : null,
                    tel: info.tel ? info.tel : null,
                    img: info.img ? info.img : null
                }
            )
        }).then((res) => {
            console.log(res)
            uploadImg(document.getElementById("inputImg").files.item(0), id);
            if (info.username !== "" && info.username !== null && info.username !== undefined){
                localStorage.setItem("username", info.username)
            }
            // window.location.reload(false);
        }
        )
    }


    function handle(e) {
        const newdata = { ...info }
        newdata[e.target.id] = e.target.value
        if (document.getElementById("inputImg").files[0] !== undefined) {
            newdata.img = document.getElementById("inputImg").files[0].name
        }
        setInfo(newdata)
        console.log(newdata)
    }

    return (
        <MyModal className="modal" onClick={props.onClose}>
            <div className="modal-content" style={{ width: "60%" }} onClick={(e) => e.stopPropagation()}>
                <form style={{ padding: '2em' }}>
                    <div className="form-row" style={{ display: 'flex' }}>
                        <div className="form-group col-lg-6 col-md-6" style={{ padding: '1em' }}>
                            <label htmlFor="inputEmail4">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="name" onChange={(e) => handle(e)} />
                        </div>
                        <div className="form-group col-lg-6 col-md-6" style={{ padding: '1em' }}>
                            <label htmlFor="inputPassword4">Surname</label>
                            <input type="text" className="form-control" id="surname" placeholder="surname" onChange={(e) => handle(e)} />
                        </div>
                    </div>
                    <div className="form-row" style={{ display: 'flex' }}>
                        <div className="form-group col-lg-6 col-md-6" style={{ padding: '1em' }}>
                            <label htmlFor="inputEmail4">Username</label>
                            <input type="text" className="form-control" id="username" placeholder="username" onChange={(e) => handle(e)} />
                        </div>
                        <div className="form-group col-lg-6 col-md-6" style={{ padding: '1em' }}>
                            <label htmlFor="inputPassword4">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => handle(e)} />
                        </div>
                    </div>
                    <div className="form-group" style={{ padding: '1em' }}>
                        <label htmlFor="inputAddress">Address</label>
                        <input type="text" className="form-control" id="residence" placeholder="address" onChange={(e) => handle(e)} />
                    </div>
                    <div className="form-group" style={{ padding: '1em' }}>
                        <label htmlFor="inputAddress2">Number</label>
                        <input type="text" className="form-control" id="tel" placeholder="telephone number" />
                    </div>

                    <div style={{ padding: '1em' }}>
                        <label className="form-label" htmlFor="customFile">Immagine Profilo</label>
                        <input type="file" className="form-control" id="inputImg" onChange={(e) => handle(e)}/>
                    </div>

                    <div className="modal-footer" style={{ padding: '1em', display: 'flex', justifyContent: 'flex-end' }}>
                        <CloseButton onClick={props.onClose} > Close </CloseButton>
                        <SubmitButton type="button" onClick={(e) => submitNewInfo(e)}> Update </SubmitButton>
                    </div>
                </form>

            </div >
        </MyModal >
    )
}

export default ProfileModal