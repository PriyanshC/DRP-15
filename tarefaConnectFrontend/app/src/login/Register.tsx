import React, { FormEventHandler, useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../App.tsx'

interface Props {
  setUserData: (data) => void
}

export default function Register(props: Props) {
  const error = {
    none: 0,
    post: 1,
    password: 2
  }

  const [registerError, setRegisterError] = useState(error.none);
  const navigate = useNavigate();

  const submitRegister: FormEventHandler = (event) => {
    event.preventDefault();

    if (event.target[3].value !== event.target[4].value) {
      setRegisterError(error.password)
      return;
    }

    api.post('create-user', {
      email: event.target[2].value,
      forename: event.target[0].value,
      surname: event.target[1].value,
      post_code: event.target[5].value,
      password: event.target[3].value
    })
      .then(response => {
        props.setUserData(response.data);
        console.log('REGISTER SUCCESS!');
        navigate('/home');
      })
      .catch(err => {
        setRegisterError(err.post);
        console.log(err);
      })
  }

  const getErrMsg = () => {
    switch (registerError) {
      case error.password:
        return (<p className='ErrorMessage'>Passwords Must Match</p>);
      case error.post:
        return (<p className='ErrorMessage'>Register Credentials Invalid / Network Error</p>);
      default:
        return null;
    }
  }

  const passwordStyle =
    (registerError === error.password ? { borderColor: 'red' } : {})

  return (
    <div className="PageWrapper">
      <form onSubmit={submitRegister} className='Wrapper'>
        <h1> Register </h1>
        <div className='InputBox'>
          <input type="text" placeholder='First Name...' maxLength={15} pattern={'[A-Za-z]*'} title='letters A-Z' required autoFocus />
          <i className='bi-person-fill'></i>
        </div>
        <div className='InputBox'>
          <input type="text" placeholder='Last Name...' maxLength={15} pattern={'[A-Za-z]*'} title='letters A-Z' required />
          <i className='bi-person-fill'></i>
        </div>
        <div className='InputBox'>
          <input type="email" placeholder='Email...' maxLength={50} required />
          <i className='bi-envelope-at-fill InputIcon'></i>
        </div>
        <div className='InputBox'>
          <input type="password" placeholder='Choose password...' maxLength={25} minLength={6} required style={passwordStyle} />
          <i className='bi-lock-fill'></i>
        </div>
        <div className='InputBox'>
          <input type="password" placeholder='Confirm password...' maxLength={25} required style={passwordStyle} />
          <i className='bi-lock-fill'></i>
        </div>
        <div className='InputBox'>
          <input type="text" placeholder='Postcode...' maxLength={15} required />
          <i className='bi-person-fill'></i>
        </div>
        <button type='submit'> Register </button>
        {getErrMsg()}
        <div className="ToRegisterLogin">
          <Link to={'/login'} style={{ textDecoration: 'none', color: 'inherit' }}>
            Already have an account?
            <label> Login </label>
          </Link>
        </div>
      </form>
    </div>
  )
}
