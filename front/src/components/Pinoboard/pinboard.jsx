import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Post from '../Card/postCard';

const Container = styled.div`
    justify-content: center;
    align-items: center;
`
const PostContainer = styled.div`
    justify-content: center;
    align-items: center;
    margin: 1em;
`
const Button = styled.a`
    text-decoration: none;
    border: 1px solid teal;
    background-color: white;
    color: teal;
    cursor: pointer;
    font-weight: 900;
    border-radius: 10px;
    padding-left: 2em;
    padding-right: 2em;
    text-align: center;
    &:hover{
        background-color: teal;
        color: white;
        font-weight: 900;
        transition: all 0.4s ease;
    }
`
const ButtonContainer = styled.a`
    display: flex;
    justify-content: end;
    margin-right: 5em;

`

function Pinboard() {

    const [posts, setPosts] = useState([]);
    const paramPage = useParams();
    const page = paramPage.page;

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line
    }, []);

    const fetchPosts = async () => {
        const data = await fetch(`https://site212224.tw.cs.unibo.it/Board/category/${page.substring(1)}`);
        const fetched = await data.json();
        const filtered = fetched.filter(post => {
            return post.comment === false;
        });
        setPosts(filtered);
    }

    return (
        <div>
            <Container className='container'>

                <PostContainer className='row'>
                    {posts.map(post => (
                        <Post
                            key={post._id}
                            id={post._id}
                            author={post.author}
                            title={post.title}
                            text={post.text}
                            data={post.data}
                            category={post.category}
                        />
                    ))}
                </PostContainer>

                <ButtonContainer>
                    <Button href={`https://localhost:3000/form:${page.substring(1)}`}>
                        POST SOMETHING!
                    </Button>
                </ButtonContainer>

            </Container>
        </div>
    );
}

export default Pinboard;
