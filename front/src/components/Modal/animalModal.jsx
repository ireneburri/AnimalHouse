import axios from "axios";
import React, { useState } from "react";
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

function AnimalModal(props) {
    const [info, setInfo] = useState({
        name: "",
        breed: "",
        sex: "",
        age: "",
        description: "",
        species: "",
        sale: "",
        client_id: "",

    })

    if (!props.secondShow) {
        return null;
    }

    function submitNewInfo(e) {
        console.log(info);
        axios.post('http://site212224.tw.cs.unibo.it/animal/', {
            name: info.name,
            breed: info.breed,
            sex: info.sex,
            age: info.age,
            species: info.species,
            description: info.description,
            client_id: info.client_id,
            sale: info.sale
        }).then(res => {
            console.log(res)
            window.location.reload(false);
        })
    }


    function handle(e) {
        const newdata = { ...info }
        newdata[e.target.id] = e.target.value
        newdata.client_id = localStorage.getItem('username')
        newdata.sale = false
        newdata.age = parseFloat(document.getElementById('age').value)
        setInfo(newdata)
        // console.log(newdata)
    }

    return (
        <MyModal className="modal" onClick={props.onClose}>
            <div className="modal-content" style={{ width: "60%" }} onClick={(e) => e.stopPropagation()}>
                <form style={{ padding: '2em' }} >
                    <div className="form-row" style={{ display: 'flex' }}>
                        <div className="form-group col-lg-6 col-md-6" style={{ padding: '1em' }}>
                            <label htmlFor="inputEmail4">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="name" onChange={(e) => handle(e)} />
                        </div>
                        <div className="form-group col-lg-6 col-md-6" style={{ padding: '1em' }}>
                            <label htmlFor="inputPassword4">Description</label>
                            <input type="text" className="form-control" id="description" placeholder="description" onChange={(e) => handle(e)} />
                        </div>
                    </div>
                    <div className="form-row" style={{ display: 'flex' }}>
                        <div className="form-group col-lg-6 col-md-6" style={{ padding: '1em' }}>
                            <label htmlFor="inputEmail4">sex</label>
                            <select type="text" className="form-control" id="sex" placeholder="sex" onChange={(e) => handle(e)} >
                                <option value='' key=''> sex </option>
                                <option value='Maschio' key='Maschio'> male </option>
                                <option value='Femmina' key='Femmina'> female </option>
                            </select>
                        </div>
                        <div className="form-group col-lg-6 col-md-6" style={{ padding: '1em' }}>
                            <label htmlFor="inputPassword4">Age</label>
                            <input type="number" className="form-control" id="age" placeholder="age" min={0} onChange={(e) => handle(e)} />
                        </div>
                    </div>
                    <div className="form-row" style={{ display: 'flex' }}>
                        <div className="form-group col-lg-6 col-md-6" style={{ padding: '1em' }}>
                            <label htmlFor="inputEmail4">Species</label>
                            <input type="text" className="form-control" id="species" placeholder="species" onChange={(e) => handle(e)} />
                        </div>
                        <div className="form-group col-lg-6 col-md-6" style={{ padding: '1em' }}>
                            <label htmlFor="inputPassword4">Breed</label>
                            <input type="text" className="form-control" id="breed" placeholder="breed" onChange={(e) => handle(e)} />
                        </div>
                    </div>

                    <div style={{ padding: '1em' }}>
                        <label className="form-label" htmlFor="customFile">Profile Picture</label>
                        <input type="file" className="form-control" id="file" />
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

export default AnimalModal