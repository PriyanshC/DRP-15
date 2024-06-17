import React, { FormEventHandler, useState } from 'react';
import './Login.css'

import { api } from '../App.tsx'
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  setUserData: (data) => void,
  setTasker: (arg0: number) => void
}

const testLogin = {
  email: 'test@mail.com',
  password: 'test'
};

const exampleTasks = [
  { title: 'Lawn Mowing', description: 'Description', id: 1, category: 'Property A' },
  { title: 'Flower Watering', description: 'Description', id: 2, category: 'Property A' },
  { title: 'Raking Leaves', description: 'Description', id: 3, category: 'Property C' },
  { title: 'Home Cleaner', description: 'Description', id: 4, category: 'Property B' },
  { title: 'Large Furniture Removal', description: 'Description', id: 5, category: 'Property B' },
  { title: 'Broken Lightbulb', description: 'Description', id: 6, category: 'Property A' },
  { title: 'Misc Help', description: 'Description', id: 7, category: 'Misc' },
  { title: 'Shopping Help', description: 'Description', id: 8, category: 'Misc' },
]

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

    // TODO : remove this for production
    if (event.target[0].value === '' && event.target[1].value === '') {
      api.post('login', testLogin)
        .then(response => {
          console.log(response);
          props.setUserData(response.data);
          console.log('LOGGING IN AS TEST!');
          navigate('/home');
          return;
        })
        .catch(err => { console.log('TEST LOGIN ERROR', err); props.setUserData({ id: 1, tasks: exampleTasks }); navigate('/home') })
    } else {
      api.post('login', {
        email: event.target[0].value,
        password: event.target[1].value
      })
        .then(response => {
          if (response.status === 200) {
            var userData = {};
            try {
              userData = response.data.user;
              props.setTasker(response.data.id);
              console.log("Tasker Login");
            } catch (e) {
              userData = response.data;
              console.log("User Login");
            } finally {
              props.setUserData(userData)
              console.log('LOGIN SUCCESS!');
              navigate('/home')
            }
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