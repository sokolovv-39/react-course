import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerInitiate } from "../redux/actions";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [displayName, setDisplayName] = useState('');
    const user = useSelector(state => state.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate])


    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            return;
        }
        dispatch(registerInitiate(email, password, displayName))
    }

    return (
        <div>
            <header>
            </header>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input id='name' value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='repeatPassword'>Repeat Password</label>
                    <input type='password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                </div>
                <button type='submit'>SIGN UP</button>
            </form>
            <NavLink to='/'>Back to Home</NavLink>
        </div>
    );
};