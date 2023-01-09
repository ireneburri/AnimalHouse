import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer/footer';
import Navbar from '../components/Navbar/navbar';
import Comment from '../components/Card/commentCard';
import CommentForm from '../components/Form/commentForm';
import ball from '../img/63ba0f6d8a941ae73743cf0e.png'

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;   
    margin-top: 2em;
    @media (max-width: 1024px) {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
}
`
const PostContainer = styled.div`
`

const PostandComments = styled.div`
    /* margin: 1em;
@media (max-width: 1024px) {
    margin: 2em;
} */
`

const CommentsContainer = styled.div`
`
const FormContainer = styled.div`
    width: 50%;
    background-color: #77d2d2;
    padding: 2em;
    border-radius: 20px;
    border: 5px dotted white;
    @media (max-width: 1024px) {
        width: 80%;
        margin-top: 2em;
}
`
const Comments = styled.div`
`

function SinglePost() {

    const data = useParams();
    const id = data.post;

    const [post, setPost] = useState([]);  //conservo quello originale
    const [comments, setComments] = useState([]);  //conservo quello originale

    useEffect(() => {
        fetchPost();
        fetchComments();
        // eslint-disable-next-line
    }, []);

    const fetchPost = async () => {
        const data = await fetch(`https://site212224.tw.cs.unibo.it/Board/id/${id.substring(1)}`);
        const items = await data.json();
        setPost(items);
    }

    const fetchComments = async () => {
        const data = await fetch(`https://site212224.tw.cs.unibo.it/Board/comments/${id.substring(1)}`);
        const items = await data.json();
        setComments(items);
    }

    return (
        <div>
            <Navbar />
            <Container >
                <PostandComments>
                    <PostContainer>
                        <Comment
                            key={post._id}
                            id={post._id}
                            title={post.title}
                            author={post.author}
                            text={post.text}
                            date={post.data}
                            comment={post.comment}
                        />
                    </PostContainer>
                    <span style={{margin: "2em"}}> Comments: </span>
                    <CommentsContainer>
                        <Comments>
                            <div>
                                {comments.map(comment => (
                                    <Comment
                                        key={comment._id}
                                        id={comment._id}
                                        author={comment.author}
                                        title={comment.title}
                                        text={comment.text}
                                        date={comment.data}
                                        comment={comment.comment}
                                    />
                                ))}
                            </div>
                        </Comments>
                    </CommentsContainer>
                </PostandComments>

                <FormContainer style={{margin: '2em'}}>
                    <CommentForm />
                </FormContainer>

            </Container>
            <Footer />
        </div>
    );
}

export default SinglePost;
