import { useState } from 'react';
import './style.css'
import { Link } from 'react-router-dom';

function LoginRegister() {
    const [index, setIndex] = useState(0)
    return (
        <div className="PageWrapper">
            <div className="Wrapper">
                <FormPanel isLogin={index} toggleFunc={setIndex}/>
            </div>
        </div>
    ) 
}

function FormPanel({isLogin: index, toggleFunc}) {
    return index === 0 ? <Login toggleFunc={toggleFunc}/> : 
    (index === 1 ? <Register toggleFunc={toggleFunc}/> : <ForgotPassword toggleFunc={toggleFunc}/>)
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
                    <input type="checkbox" /> Remember me
                </label>
                <label className='ForgotPassword' onClick={() => toggleFunc(2)}> Forgot password? </label>
            </div>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <button type='submit'> Login </button>
            </Link>
            <div className="ToRegisterLogin">
                <p onClick={() => toggleFunc(1)}>
                    Don't have an account yet?
                    <label> Register </label>
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
            <p onClick={() => toggleFunc(0)}>
                Already have an account yet?
                <label> Login </label>
            </p>
        </div>
    </form>  
   )
}

function ForgotPassword({toggleFunc}) {
    return (
     <form action="">
         <h1> Forgot Password </h1>
         <div className='InputBox'>
             <input type="password" placeholder='New password...' />
             <i className='bi-lock-fill'></i>
         </div>
         <div className='InputBox'>
             <input type="password" placeholder='Confirm password...' />
             <i className='bi-lock-fill'></i>
         </div>
         <Link to="/" style={{ textDecoration: 'none' }}>
             <button type='submit'> Submit </button>
         </Link>
         <div className="ToRegisterLogin">
             <p onClick={() => toggleFunc(0)}>
                 Back to
                 <label> Login </label>
             </p>
         </div>
     </form>  
    )
 }

export default LoginRegister;