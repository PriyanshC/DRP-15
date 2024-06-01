import { useState } from 'react';
import './style.css'
import { Link } from 'react-router-dom';

function LoginRegister() {
    const [isLogin, setLoginStatus] = useState(true)
    return (
        <div className="PageWrapper">
            <div className="Wrapper">
                <FormPanel isLogin={isLogin} toggleFunc={setLoginStatus}/>
            </div>
        </div>
    ) 
}

function FormPanel({isLogin, toggleFunc}) {
    return isLogin ? <Login toggleFunc={toggleFunc}/> : <Register toggleFunc={toggleFunc}/>
}

function Login({toggleFunc}) {
    return (
        <form action="">
            <h1> Login </h1>
            <div className='InputBox'>
                <input type="email" placeholder='Email...' />
                <i className='bi-person-fill'></i>
            </div>
            <div className='InputBox'>
                <input type="password" placeholder='Password...' />
                <i className='bi-lock-fill'></i>
            </div>
            <div className="RememberForgot">
                <label>
                    <input type="checkbox" />
                    Remember me
                </label>
                <a> Forgot password? </a>
            </div>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <button type='submit'> Login </button>
            </Link>
            <div className="ToRegisterLogin">
                <p onClick={() => toggleFunc(false)}>
                    Don't have an account yet?
                    <a> Register </a>
                </p>
            </div>
        </form>      
    ) 
}

function Register({toggleFunc}) {
   return (
    <form action="">
        <h1> Register </h1>
        <div className='InputBox'>
            <input type="email" placeholder='Email...' />
            <i className='bi-person-fill'></i>
        </div>
        <div className='InputBox'>
            <input type="password" placeholder='Choose password...' />
            <i className='bi-lock-fill'></i>
        </div>
        <div className='InputBox'>
            <input type="password" placeholder='Confirm password...' />
            <i className='bi-lock-fill'></i>
        </div>
        <Link to="/" style={{ textDecoration: 'none' }}>
            <button type='submit'> Register </button>
        </Link>
        <div className="ToRegisterLogin">
            <p onClick={() => toggleFunc(true)}>
                Already have an account yet?
                <a> Login </a>
            </p>
        </div>
    </form>  
   )
}

export default LoginRegister;