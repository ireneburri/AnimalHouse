import React, { useState, state, setState } from 'react';
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

    const [data, setData] = useState({
        author: "",
        title: "",
        text: "",
        category: "",
        comment: "",
        img: "",
    })

    function submit(e) {
        e.preventDefault();
        axios.post('https://site212224.tw.cs.unibo.it/Board/', {
            author: data.author,
            title: data.title,
            text: data.text,
            category: data.category,
            comment: data.comment,
            img: data.img
        }).then(res => {
            console.log(res.data._id)
            console.log(document.getElementById("inputImg").files.item(0))
            uploadImg(document.getElementById("inputImg").files.item(0), res.data._id);
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
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" onChange={(e) => handle(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Text</label>
                        <input type="text" className="form-control" id="text" onChange={(e) => handle(e)} />
                    </div>
                    <div>
                        <label className="form-label" htmlFor="customFile">Picture</label>
                        <input id="inputImg" type="file" className="form-control" name="file" onChange={(e) => handle(e)} />
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
