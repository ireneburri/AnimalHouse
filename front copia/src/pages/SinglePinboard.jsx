import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer/footer';
import Navbar from '../components/Navbar/navbar';
import Pinboard from '../components/Pinoboard/pinboard';

const Container = styled.div`
    justify-content: center;
    align-items: center;
`
const PostContainer = styled.div`
    justify-content: center;
    align-items: center;
`
const Posts = styled.div`
    justify-content: center;
    align-items: center;
`

export default function SinglePinboard() {

    return (
        <div>
            <Container>
                <Navbar />

                <PostContainer>
                    <Posts>
                        <Pinboard />
                    </Posts>
                </PostContainer>

                <Footer />
            </Container>
        </div>
    );
}

