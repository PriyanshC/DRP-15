import './Login.css';
import React, { FormEventHandler } from 'react';
import { Link } from 'react-router-dom';

export default function Forgot() {
    const submitForgot: FormEventHandler = (event) => {
        event.preventDefault();
        console.log(event);
    }
    return (
        <div className="PageWrapper">
            <form onSubmit={submitForgot} className='Wrapper'>
                <h1> Forgot Password </h1>
                <div className='InputBox'>
                    <input type="password" placeholder='New password...' />
                    <i className='bi-lock-fill'></i>
                </div>
                <div className='InputBox'>
                    <input type="password" placeholder='Confirm password...' />
                    <i className='bi-lock-fill'></i>
                </div>
                <button type='submit'> Submit </button>
                <div className="ToRegisterLogin">
                    <Link to={'/login'} style={{ textDecoration: 'none', color: 'inherit' }}>
                        Back to
                        <label> Login </label>
                    </Link>
                </div>
            </form>
        </div>
    )
}