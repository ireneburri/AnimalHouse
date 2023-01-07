import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer/footer';
import Navbar from '../components/Navbar/navbar';
import animalCrossing from '../img/acback.jpg'
// import Newsletter from '../components/Newsletter/newsletter';

const Container = styled.div`
    align-items: center;
    justify-content: center;
`

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
`

function Pinboards() {
    return (
        <div>
            <Container>
                <Navbar />
                <div style={{ textAlign: 'center', justifyContent: 'center', marginTop: '1rem', fontSize: '30px' }}>
                    CHOOSE THE PINBOARD!
                </div>

                <CardContainer className='row'>
                    <div className="card text-center col-12 col-md-6 col-lg-4" style={{backgroundColor: "#cbffd5"}}>
                        <div className="card-header">NONE</div>
                        <div className="card-body">
                            <p className="card-text">
                                General pinboard to publish thoughts, photos and funny stories about our animal friends
                            </p>
                            <a href="/front/pinboard:None" className="btn btn-primary" style={{backgroundColor: "#6ad24d", border: 'none'}}>
                                VISIT
                            </a>
                        </div>
                        <div className="card-footer text-muted"></div>
                    </div>
                    <div className="card text-center col-12 col-md-6 col-lg-4" style={{backgroundColor: "#ffe0eb"}}>
                        <div className="card-header">REVIEW</div>
                        <div className="card-body">
                            <p className="card-text">
                                Space for the reviews! We are always happy to hear the opinions of our customers
                            </p>
                            <a href="/front/pinboard:Review" className="btn btn-primary" style={{backgroundColor: "#d24d8b", border: 'none'}}>
                                VISIT
                            </a>
                        </div>
                        <div className="card-footer text-muted"></div>
                    </div>
                    <div className="card text-center col-12 col-md-6 col-lg-4" style={{backgroundColor: "#fdffbe"}}>
                        <div className="card-header">FINDING PARTNERS</div>
                        <div className="card-body">
                            <p className="card-text">
                                Are you looking for a partner for your animal friend or do you have any suggestions? Write it here!                            
                            </p>
                            <a href="/front/pinboard:Finding%20Partners" className="btn btn-primary" style={{backgroundColor: "#d2bc4d", border: 'none'}}>
                                VISIT
                            </a>
                        </div>
                        <div className="card-footer text-muted"></div>
                    </div>
                    <div className="card text-center col-12 col-md-6 col-lg-4" style={{backgroundColor: "#cbecff"}}>
                        <div className="card-header">STRAY ANIMALS</div>
                        <div className="card-body">
                            <p className="card-text">
                                If you have found a stray animal or are looking for a lost animal maybe this is the right place!
                            </p>
                            <a href="/front/pinboard:Stray%Animals" className="btn btn-primary" style={{backgroundColor: "#4d96d2", border: 'none'}}>
                                VISIT
                            </a>
                        </div>
                        <div className="card-footer text-muted"></div>
                    </div>
                </CardContainer>

                <Footer />
            </Container>
        </div>
    );
}

export default Pinboards;
