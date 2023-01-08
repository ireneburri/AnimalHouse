import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CommentForm() {

    const paramPage = useParams();
    const id = paramPage.post;

    const [data, setData] = useState({
        author: "",
        title: "",
        text: "",
        post_id: "",
        comment: ""
    })

    function submit(e) {
        e.preventDefault();
        axios.post('https://site212224.tw.cs.unibo.it/Board/', {
            author: data.author,
            title: data.title,
            text: data.text,
            post_id: data.post_id,
            comment: data.comment
        })
            .then(res => {
                window.location.reload(false);
            })
    }

    function handle(e) {
        const newdata = { ...data }
        newdata.author = window.localStorage.getItem('username')
        newdata.post_id = id.substring(1)
        newdata.comment = true
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    return (
        <div>
            <form onSubmit={(e) => submit(e)}>
                <h3> ADD A COMMENT </h3>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input type="text" value={window.localStorage.getItem('username')} className="form-control" id="author" aria-describedby="emailHelp" onChange={(e) => handle(e)} readOnly/>
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
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    );
}

export default CommentForm;
