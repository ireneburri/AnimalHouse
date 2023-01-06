import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Footer from '../components/Footer/footer';
import Navbar from '../components/Navbar/navbar';
// import Newsletter from '../components/Newsletter/newsletter';

const Container = styled.div`
    justify-content: center;
    align-items: center;

`
const Form = styled.div`
    margin: 2em;

`

function PostForm() {

    const paramPage = useParams();
    const category = paramPage.category;

    async function uploadImg(img, id) {
        if (img != undefined) {
            console.log("up")

            var blob = img.slice(0, img.size, 'image/*');
            let imm = new File([blob], id + ".png", { type: 'image/*' })
            console.log(id)
            console.log(imm)

            let formData = new FormData();
            formData.append("file", imm);
            console.log(formData.getAll('file'))

            // axios.post('http://site212224.tw.cs.unibo.it/image', {
            //     data: formData
            // }).then(res => {
            //     console.log(res)
            // })   

            fetch("http://site212224.tw.cs.unibo.it/image", { //mi serve la patch per utente
                method: "POST",
                crossDomain: true,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                data: formData,
            }).then((res) => {
                console.log(res)
            }
            )
            return false;
        }
    }

    const [data, setData] = useState({
        author: "",
        title: "",
        text: "",
        category: "",
        comment: "",
        img: "",
    })

    function submit(e) {
        console.log(data)
        e.preventDefault();
        axios.post('http://site212224.tw.cs.unibo.it/Board/', {
            author: data.author,
            title: data.title,
            text: data.text,
            category: data.category,
            comment: data.comment,
            img: data.img
        }).then(res => {
            console.log(res.data._id)
            console.log(document.getElementById("inputImg").files[0])
            uploadImg(document.getElementById("inputImg").files[0], res.data._id);
        })
    }

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        newdata.author = window.localStorage.getItem('username')
        newdata.category = category.substring(1)
        newdata.comment = false
        if (document.getElementById("inputImg").files[0] !== undefined) {
            newdata.img = document.getElementById("inputImg").files[0].name
        }
        setData(newdata)
        console.log(newdata)
    }

    return (
        <Container>
            <Navbar />
            <div style={{ textAlign: 'center', justifyContent: 'center', marginTop: '1rem', fontSize: '30px' }}> YOU ARE CURRENTLY PUBLISHING ON THE '{category.substring(1).toUpperCase()}' PINBOARD </div>
            <Form>
                {/* <form onSubmit={(e) => submit(e)}> */}
                <form>
                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">Author</label>
                        <input value={window.localStorage.getItem('username')} type="text" className="form-control" id="author" aria-describedby="emailHelp" onChange={(e) => handle(e)} readOnly />
                    </div>
                    <div>
                        <label className="form-label" htmlFor="customFile">Picture</label>
                        <input id="inputImg" type="file" className="form-control" onChange={(e) => handle(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" onChange={(e) => handle(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Text</label>
                        <input type="text" className="form-control" id="text" onChange={(e) => handle(e)} />
                    </div>
                    <hr />
                    <button type="submit" className="btn btn-primary" onClick={(e) => submit(e)}>Submit</button>
                </form>
            </Form>
            <Footer />
        </Container >
    );
}

export default PostForm;
