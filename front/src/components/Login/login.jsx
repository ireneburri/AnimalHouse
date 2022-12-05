import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
	box-sizing: border-box;
	display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(97, 196, 229, 0.6);
    padding: 2em;
    @media (min-width: 1024px) {
        padding-left: 6em;
        padding-right: 6em;
}
`

const Form = styled.form`
    justify-content: center;
    background: rgba( 255, 255, 255, 0.5 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 8.5px );
    -webkit-backdrop-filter: blur( 8.5px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    margin: 1em; 
    padding: 1em;
`

const Input = styled.input`
    padding: 5px 12px;
    font-size: 14px;
    line-height: 20px;
    color: #24292e;
    vertical-align: middle;
    background-color: #ffffff;
    background-repeat: no-repeat;
    background-position: right 8px center;
    border: 1px solid #e1e4e8;
    border-radius: 10px;
    outline: none;
    box-shadow: rgba(225, 228, 232, 0.2) 0px 1px 0px 0px inset;
    :focus{
        border-color: rgba(97, 196, 229, 0.6);
        outline: none;
        box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
    }
`
const Button = styled.button`
    display: inline-block;
    padding-left: 1em;
    padding-right: 1em;
    border: 0;
    text-decoration: none;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.5);
    border: 1px solid  rgba(97, 196, 229, 0.6);
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
function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const [nameReg, setnameReg] = useState();
    const [surnameReg, setsurnameReg] = useState();
    const [usernameReg, setusernameReg] = useState();
    const [passwordReg, setpasswordReg] = useState();
    const [residenceReg, setresidenceReg] = useState();
    const [telephoneReg, settelephoneReg] = useState();

    
    const credLoginIn = {
        username: username,
        password: password
    };

    const credRegistration = {
        name: nameReg,
        surname: surnameReg,
        username: usernameReg,
        password: passwordReg,
        residence: residenceReg,
        telephone: telephoneReg
    };

    async function handleLogIn(e) {
        e.preventDefault();
        axios.post('https://site212224.tw.cs.unibo.it/auth/login/user', {
            username: credLoginIn.username,
            password: credLoginIn.password
        })
            .then((res) => {
                console.log(res);
                localStorage.setItem("username", credLoginIn.username)
                localStorage.setItem("token", res.data.authority)

                //permette di tornare nella pagina che ti ha reindireizzato alla pagina di login
                if (location.state?.from) {
                    navigate(location.state.from)
                }
                else {
                    navigate('/account')
                }
            }, (err) => {
                setError('Invalid Username or Password')
            });
    }

    async function hangleRegistration(e){
        e.preventDefault()
        axios.post('http://site212224.tw.cs.unibo.it/user/', {
            name: credRegistration.name,
            surname: credRegistration.surname,
            username: credRegistration.username,
            password: credRegistration.password,
            tel: credRegistration.telephone,
            residence: credRegistration.residence
        }).then(res => {
            console.log(res);
                localStorage.setItem("username", credRegistration.username)

                //permette di tornare nella pagina che ti ha reindireizzato alla pagina di login
                if (location.state?.from) {
                    navigate('/login')
                }
                else {
                    navigate('/account')
                }
                window.location.reload(false);
            }, (err) => {
                setError('Invalid Username or Password')
            });
    }


    return (
        <Container className=" d-flex row" >
            <Form action="#" className="login active col-lg-6 row" onSubmit={handleLogIn}>
                <h2 className="title">Login with your account</h2>
                <div className="form-group col-md-6" style={{ marginBottom: '14px' }}>
                    <label htmlFor="username">Username</label>
                    <div className="input-group">
                        <Input type="text" id="username" placeholder="username" onChange={e => setUserName(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="password">Password</label>
                    <div className="input-group">
                        <Input type="password" id="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
                    </div>
                </div>
                <hr />
                <div>
                    <Button type="submit" className="btn-submit">Login</Button>
                </div>

                {error?<div>{error}</div>:null} 
            </Form>

            <Form action="#" className="register col-lg-6 row" onSubmit={hangleRegistration}>
                <h2 className="title">Register your account</h2>
                <div className="form-group col-md-6" style={{ marginBottom: '14px' }}>
                    <label htmlFor="name">Name</label>
                    <div className="input-group">
                        <Input required type="text" id="name" placeholder="name" onChange={e => setnameReg(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="surname">Surname</label>
                    <div className="input-group">
                        <Input required type="text" id="surname" placeholder="surname" onChange={e => setsurnameReg(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group col-md-6" style={{ marginBottom: '14px' }}>
                    <label htmlFor="username">username</label>
                    <div className="input-group">
                        <Input required type="text" id="username" placeholder="username" onChange={e => setusernameReg(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="password">Password</label>
                    <div className="input-group">
                        <Input required type="password" pattern=".{8,}" id="password" placeholder="Your password" onChange={e => setpasswordReg(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group col-md-6" style={{ marginBottom: '14px' }}>
                    <label htmlFor="residence">Residence</label>
                    <div className="input-group">
                        <Input required type="text" id="residence" placeholder="residence" onChange={e => setresidenceReg(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="telephone">Telephone</label>
                    <div className="input-group">
                        <Input required type="text" id="telehone" placeholder="telephone" onChange={e => settelephoneReg(e.target.value)}/>
                    </div>
                </div>
                <hr />
                <div>
                    <Button type="submit" className="btn-submit">Register</Button>
                </div>
            </Form>
        </Container>


    );
}

export default Login;
