import React, { useState, useEffect, useFetch, useCallback } from 'react';
import styled from 'styled-components';
import AnimalCard from '../Card/animalCard';
import AnimalModal from '../Modal/animalModal';
import ProfileModal from '../Modal/profileModal';
import profileimg from '/Users/beatricezamagna/Desktop/Animal/front/src/img/profile.jpg'
import OrderCard from '../Card/orderCard';
import Brunella from '../../img/Brunella.webp'
import ReservationCard from '../Card/reservationCard';

const Body = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #95d6bb;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
    `

const Container = styled.div`
    width: 80%;
    background: #ffffff;
    border-radius: 20px;
    margin: none;
    background: rgba(255, 255, 255, 0.75);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(7.4px);
    border: 1px solid rgba(226, 226, 226, 1);
    color: #1b1b6b;
`

const ContainerReservation = styled.div`
    width: 80%;
    background: #ffffff;
    border-radius: 20px;
    margin-bottom: 2em;
    background: rgba(255, 255, 255, 0.75);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(7.4px);
    border: 1px solid rgba(226, 226, 226, 1);
    color: #1b1b6b;
`

const ProfileContainer = styled.div`
    justify-content: center;
    align-items: center;
`

const ProfileButton = styled.button`
    display: inline-block;
    padding-left: 1em;
    padding-right: 1em;
    border: 0;
    text-decoration: none;
    border-radius: 15px;
    background-color: rgba(97, 196, 229, 0.5);
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(30px);
    color: black;
    font-size: 14px;
    letter-spacing: 2px;
    cursor: pointer;
    text-transform: uppercase;
    &:hover{
        background-color: rgba(97, 196, 229, 0.6);
    }
`
const Labels = styled.div`
    font-size: 1em;
`

const Vip = styled.span`
    font-size: 0.8em;
    border-radius: 10px;
    background-color: #dfbe00;
    color: #160505;
    border: none;
    background-color: rgba(255, 215, 0, 0.5);
    backdrop-filter: blur(30px);
    color: black;
    letter-spacing: 2px;
    padding-left: 1em;
    padding-right: 1em;
    text-transform: uppercase;
    &:hover{
        background-color: rgba(255, 215, 0, 0.6);
    }
`

const Img = styled.img`
    font-size: 1em;
    border-radius: 100%;
    width: 40%;
    padding-top: 1em;
`

const BrunellaImg = styled.img`
    margin-top: 2em;
    margin-bottom: 2em;
    margin-left: 2em;
    @media (max-width: 600px) {
        margin-left: 4em;
        width: 70%;
}
`

function Profile() {

    const [profile, setProfile] = useState('');
    const user = localStorage.getItem("username");
    const [vip, setVip] = useState('');
    const [animal, setAnimals] = useState([]);
    const [order, setOrder] = useState([]);
    const [reservation, setReservation] = useState([]);
    const [show, setShow] = useState(false);
    const [secondShow, setSecondShow] = useState(false);

    useEffect(() => {
        fetchProfile();
        fetchAnimal();
        fetchOrder();
        fetchReservation();
    }, []);

    const fetchProfile = async () => {
        const data = await fetch(`http://site212224.tw.cs.unibo.it/User/username/${user}`);
        const fetched = await data.json();
        setProfile(fetched[0]);
        setVip(fetched[0].vip)
        localStorage.setItem("userid", JSON.stringify(fetched[0]._id))
    }

    const fetchAnimal = async () => {
        const data = await fetch("https://site212224.tw.cs.unibo.it/animal");
        const items = await data.json();
        const filtered = items.filter((item) => item.client_id === user);
        setAnimals(filtered);
    }

    const fetchOrder = async () => {
        const data = await fetch("https://site212224.tw.cs.unibo.it/Order");
        const items = await data.json();
        const filtered = items.filter((item) => item.username === user && item.completed === true);
        setOrder(filtered);
    }

    const fetchReservation = async () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var todayFormat = yyyy + '-' + mm + '-' + dd;
        console.log(todayFormat)

        const data = await fetch("https://site212224.tw.cs.unibo.it/Reservation");
        const items = await data.json();
        const filtered = items.filter((item) => item.username === user && todayFormat <= item.date_end.substring(0, 10))
        setReservation(filtered);
        console.log(filtered)
    }

    return (
        <Body>
            <Container className='mt-5'>
                <div className="row">
                    {/* colonna profilo */}
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center py-4">
                            MY PROFILE
                            <Img
                                src={profileimg}
                            />
                            <div className='mt-3'>
                                <div className="font-weight-bold"> @{user} {profile.vip ? <Vip> VIP </Vip> : null}</div>
                            </div>
                            <div className="col-md-7 border-right">
                                <ProfileContainer className="">
                                    <div className="row mt-2">
                                        <div className="col col-md-6">
                                            <Labels>Name</Labels>
                                            <Labels> {profile.name} </Labels>
                                        </div>
                                        <div className="col col-md-6">
                                            <Labels>Surname</Labels>
                                            <Labels> {profile.surname} </Labels>
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col col-md-6">
                                            <Labels>Addess</Labels>
                                            <Labels> {profile.residence} </Labels>
                                        </div>
                                        <div className="col col-md-6">
                                            <Labels>Number</Labels>
                                            <Labels> {profile.tel} </Labels>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <ProfileButton type="button" onClick={(e) => setShow(true)}>
                                            MODIFY INFO
                                        </ProfileButton>
                                    </div>

                                </ProfileContainer>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 center">
                        <div className="d-flex flex-column align-items-center py-4">
                            MY ANIMALS
                            <div style={{ height: '17em', overflowY: 'scroll' }}>
                                <div className="row">
                                    {animal.map(animal => (
                                        <AnimalCard
                                            key={animal._id}
                                            id={animal._id}
                                            name={animal.name}
                                            breed={animal.breed}
                                            age={animal.age}
                                            sex={animal.sex}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4">
                                <ProfileButton type="button" onClick={(e) => setSecondShow(true)}>
                                    ADD ANIMAL
                                </ProfileButton>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5 border-left">
                        <div className="d-flex flex-column align-items-center py-4">
                            MY ORDERS
                            <div style={{ height: '17em', overflowY: 'scroll' }}>
                                <div className="row">
                                    {order.map(ord => (
                                        <OrderCard
                                            key={ord._id}
                                            id={ord._id}
                                            products={ord.products}
                                            price={ord.price}
                                            date={ord.date}
                                        />
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <hr></hr>

            <ContainerReservation>
                <div className="row align-items-center center">
                    <div className="col-md-7 col-lg-8 align-items-center center d-flex flex-column">
                        MY RESERVATION
                        <div style={{ overflowY: 'scroll', width: "90%", height: '17em'}}>
                            <div className="row">
                                {reservation.map(reser => (
                                    // console.log(new Date(reser.date_start).getHours())
                                    <ReservationCard
                                        key={reser._id}
                                        id={reser._id}
                                        date_start={new Date(reser.date_start)}
                                        date_end={new Date(reser.date_end)}
                                        location={reser.location}
                                        service={reser.service}
                                        time={reser.time}
                                        total={reser.total}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 col-lg-4 align-items-center center d-flex flex-column">
                        <BrunellaImg src={Brunella} alt="Brunella from Animal Crolssing"/>
                    </div>
                </div>
            </ContainerReservation>

            <ProfileModal show={show} onClose={() => setShow(false)} />
            <AnimalModal secondShow={secondShow} onClose={() => setSecondShow(false)} />
            
        </Body>
    );
}

export default Profile;
