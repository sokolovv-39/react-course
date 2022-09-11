import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loginInitiate } from "../redux/actions";
import { NavLink, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(state => state.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email || !password) {
            return;
        }
        dispatch(loginInitiate(email, password))
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input id='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit'>SIGN IN</button>
            </form>
            <NavLink to='/'>Back to Home</NavLink>
        </div>
    );
};