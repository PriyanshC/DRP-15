import React, { FormEventHandler, useState } from 'react';
import './Login.css'

import { api } from '../App.tsx'
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  setUserData: (data) => void
}

const exampleUser = {
  email: "user@example.com",
  forename: "Test",
  surname: "Account",
  id: 0,
  hashed_password: "string",
  tasks: [
    {
      title: "Mow my lawn once a fortnight",
      description: "I'd like my lawn mowed once every 14 days. I do not have a lawnmower so you would need to bring one. I live on the eastern side of Sao Miguel in a small house on the hill. Anyone can apply and free lunch is included! Thanks.",
      id: 0,
      owner_id: 0
    },
    {
      title: "Take my trash down to the curb",
      description: "I am now unable to take the trash cans all the way to the road from my house, so would need someone to do this for me once a week. And ofcourse free lunch is included! Thanks.",
      id: 1,
      owner_id: 0
    }
  ]
}

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
      props.setUserData(exampleUser);
      console.log('LOGGING IN AS TEST!');
      navigate('/home');
      return;
    }

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