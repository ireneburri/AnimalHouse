import React, { useState, useEffect, useFetch } from 'react';
import styled from 'styled-components';
import profileimg from '/Users/beatricezamagna/Desktop/Animal/front/src/img/profile.jpg'

const Body = styled.div`
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(
        to top,
        white 0%,
        lightblue 70%,
        lightblue 30%,
        white 100%
    );
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
    `

const Container = styled.div`
    width: 60%;
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
    font-size: 11px;
`

const Vip = styled.button`
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
    font-size: 11px;
    border-radius: 100%;
    width: 55%;
`

function Profile() {

    const [profile, setProfile] = useState('');
    const user = localStorage.getItem("username");

    
    useEffect(() => {
        fetchProfile();
        // eslint-disable-next-line
    }, []);

    const fetchProfile = async () => {
        const data = await fetch(`http://site212224.tw.cs.unibo.it/User/username/${user}`);
        const fetched = await data.json();
        console.log(fetched[0]);
        setProfile(fetched[0]);
    }

    return (
        <Body>
            <div className='mt-4'>
                <h3 className="font-weight-bold">My Profile</h3>
            </div>
            <Container>

                <div className="row">
                    <div className="col-md-4 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <Img
                                src={profileimg}
                            />
                            <div className='mt-3'>
                                <div className="font-weight-bold"> @{user} </div>
                            </div>
                            <span> </span>
                        </div>
                    </div>

                    <div className="col-md-7 border-right">
                        <ProfileContainer className="p-3 py-5">
                            <div className="mb-3">
                                <h4 className="text-right"> Profile Settings </h4>
                                <Vip className=''> VIP </Vip>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <Labels>Name</Labels>
                                    <h4> {profile.name} </h4>
                                </div>
                                <div className="col-md-6">
                                    <Labels>Surname</Labels>
                                    <h4> {profile.surname} </h4>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <Labels>Addess</Labels>
                                    <h4> {profile.residence} </h4>
                                </div>
                                <div className="col-md-6">
                                    <Labels>Number</Labels>
                                    <h4> {profile.tel} </h4>
                                </div>
                            </div>

                            <div className="mt-4">
                                <ProfileButton type="button">
                                    Modify Profile
                                </ProfileButton>
                            </div>

                        </ProfileContainer>
                    </div>

                </div>
            </Container>

        </Body>
    );
}

export default Profile;
