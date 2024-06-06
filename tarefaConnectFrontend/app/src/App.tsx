import './App.css';
import CheckHeader from './header/CheckHeader'
import Header from './header/Header.tsx';
import LoginLanding from './loginLanding/LoginLanding';
import Task from './task/Task.tsx';
import Login from './login/Login.tsx'
import Register from './login/Register.tsx'
import Forgot from './login/Forgot.tsx'
import axios from 'axios';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";
import PageNotFound from "./404Page";
import useLocalStorage from 'use-local-storage';
import React, { useState } from 'react';

export const api = axios.create({
  baseURL: 'http://tarefaconnect.doc.ic.ac.uk/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

function App() {

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', isDarkMode ? 'dark' : 'light');
  const [userData, setUserData] = useState(null);

  // eslint-disable-next-line
  const changeTheme = () => {
    setTheme((prev) => {
      return (prev === 'dark' ? 'light' : 'dark');
    })
  }

  return (
    <main className="App" data-theme={theme} style={{ fontFamily: 'var(--font-family)' }}>
      <Router>
        <CheckHeader>
          <Header changeTheme={changeTheme} currentTheme={theme} />
        </CheckHeader>
        <Routes>
          <Route path='/'>
            <Route index element={<Navigate to={'/login'} />} />
            <Route path='login' element={<Login setUserData={setUserData} />} />
            <Route path='register' element={<Register setUserData={setUserData} />} />
            <Route path='forgot' element={<Forgot />} />
            <Route path='home' element={<LoginLanding />} />
            <Route path='task' element={userData === null ? <Navigate to='/login' /> : <Task userData_={userData} />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </main >
  );
}

export default App;
