import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../components/Navbar/navbar';
// import { UserContext } from '../UserContext';
import axios from 'axios';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import ProfilePage from './ProfilePage';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [user, setUser] = useState()
    const [error,setError]=useState();

    const cred = {
        username: username,
        password: password
    };

    useEffect(() => {
        const loggedInUser = localStorage.getItem("token");
        if (loggedInUser) {
            const foundUser = loggedInUser;
            setUser(foundUser);
            console.log(foundUser);
        }
    }, []);

    async function handleSubmit (e) {
        e.preventDefault();
        axios.post('https://site212224.tw.cs.unibo.it/auth/login/user', {
            username: cred.username,
            password: cred.password
        })
            .then((res) => {
                console.log(res);
                localStorage.setItem("username", cred.username)
                localStorage.setItem("token", res.data.authority)
                

                //permette di tornare nella pagina che ti ha reindireizzato alla pagina di login
                if (location.state?.from) {
                    navigate(location.state.from)
                }
                else{
                    navigate('/account')
                }
            }, (err) => {
                setError('Invalid Username or Password')
            });
    }

    // se c'è uno user verrà mostrato il profilo
    if (user) {
        return <div> 
            < ProfilePage />
            </div>;
    }

    // altrimenti viene mostrata la pagian di login
    return (
        <div>
            <Navbar />
            <div className="login-wrapper">
                <h1>Please Log In DIOACN</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={e => setUserName(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                {error?<div>{error}</div>:null} 
            </div>
        </div>
    )
}