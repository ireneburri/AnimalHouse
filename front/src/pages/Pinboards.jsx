import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer/footer';
import Navbar from '../components/Navbar/navbar';
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
                    <div className="card text-center col-12 col-md-6 col-lg-4">
                        <div className="card-header">NONE</div>
                        <div className="card-body">
                            <p className="card-text">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quasi nulla totam expedita.
                            </p>
                            <a href="/pinboard:None" className="btn btn-primary">
                                VISITA
                            </a>
                        </div>
                        <div className="card-footer text-muted"></div>
                    </div>
                    <div className="card text-center col-12 col-md-6 col-lg-4">
                        <div className="card-header">ECCOLO QUA</div>
                        <div className="card-body">
                            <p className="card-text">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quasi nulla totam expedita.
                            </p>
                            <a href="/pinboard:Eccolo%20qua" className="btn btn-primary">
                                VISITA
                            </a>
                        </div>
                        <div className="card-footer text-muted"></div>
                    </div>
                    <div className="card text-center col-12 col-md-6 col-lg-4">
                        <div className="card-header">CERCO PARTNER</div>
                        <div className="card-body">
                            <p className="card-text">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quasi nulla totam expedita.
                            </p>
                            <a href="/pinboard:Cerco%20Partner" className="btn btn-primary">
                                VISITA
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
