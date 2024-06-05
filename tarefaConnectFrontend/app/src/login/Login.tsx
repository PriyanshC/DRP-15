import React, { FormEventHandler, useState } from 'react';
import './Login.css'

import { api } from '../App.tsx'
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  setUserData: (data) => void
}

const testLogin = {
  email: 'test@mail.com',
  password: 'test'
};

export default function Login(props: Props) {
  const error = {
    none: 0,
    network: 1,
    validation: 2
  }
  const [loginErr, setLoginErr] = useState(error.none);
  const navigate = useNavigate();

  const submitLogin: FormEventHandler = (event) => {
    event.preventDefault();

    if (event.target[0].value === '' && event.target[1].value === '') {
      api.post('login', testLogin)
        .then(response => {
          console.log(response);
          props.setUserData(response.data);
          console.log('LOGGING IN AS TEST!');
          navigate('/home');
          return;
        })
        .catch(err => { console.log('TEST LOGIN ERROR', err); props.setUserData({ id: 1, tasks: [{ title: '', description: '', id: 1 }] }); navigate('/home') })
    } else {
      api.post('login', {
        email: event.target[0].value,
        password: event.target[1].value
      })
        .then(response => {
          if (response.status === 200) {
            props.setUserData(response.data)
            console.log('LOGIN SUCCESS!');
            navigate('loginLanding')
          } else {
            setLoginErr(error.validation);
            console.log('LOGIN FAILURE!');
            return;
          }
        })
        .catch(err => {
          console.log(err);
          setLoginErr(error.network);
        })
    }
  }

  const getErrMsg = () => {
    switch (loginErr) {
      case error.validation:
        return (<p className='ErrorMessage'>Email or Password Invalid!</p>);
      case error.network:
        return (<p className='ErrorMessage'>A Network Error Has Occurred</p>)
      default:
        return null;
    }
  }

  return (
    <div className="PageWrapper">
      <form onSubmit={submitLogin} className='Wrapper'>
        <h1> Login </h1>
        <div className='InputBox'>
          <input type="email" placeholder='Email...' maxLength={50} />
          <i className='bi-person-fill'></i>
        </div>
        <div className='InputBox'>
          <input type="password" placeholder='Password...' maxLength={25} minLength={6} />
          <i className='bi-lock-fill'></i>
        </div>
        <div className="RememberForgot">
          <label className='RememberContainer'>
            <input type="checkbox" className='RememberCheck' />
            Remember me
          </label>
          <Link to={'/forgot'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <label className='ForgotPassword'> Forgot password? </label>
          </Link>
        </div>
        <button type='submit'> Login </button>
        {getErrMsg()}
        <div className="ToRegisterLogin">
          <Link to={'/register'} style={{ textDecoration: 'none', color: 'inherit' }}>
            Don't have an account yet?
            <label> Register </label>
          </Link>
        </div>
      </form >
    </div >
  )
}