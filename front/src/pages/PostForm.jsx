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
    const username = localStorage.getItem("username");
    console.log(category)

    const [data, setData] = useState({
        author: "",
        title: "",
        text: "",
        category: "",
        comment: ""
    })

    function submit(e) {
        e.preventDefault();
        console.log(data);
        axios.post('http://site212224.tw.cs.unibo.it/Board/', {
            author: data.author,
            title: data.title,
            text: data.text,
            category: data.category,
            comment: data.comment
        })
            .then(res => {
                console.log(res.data)
                window.location.href = `/pinboard${category}`
            })
    }

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        newdata.category = category.substring(1)
        newdata.comment = false
        setData(newdata)
        console.log(newdata)
    }

    return (
        <Container>
            <Navbar />
            <Form>
                <form onSubmit={(e) => submit(e)}>
                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">Author</label>
                        <input defaultValue={username} type="text" className="form-control" id="author" aria-describedby="emailHelp" onChange={(e) => handle(e)} />
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
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </Form>
            <Footer />
        </Container >
    );
}

export default PostForm;
