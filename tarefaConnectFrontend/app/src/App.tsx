import './App.css';
import CheckHeader from './header/CheckHeader'
import Header from './header/Header.tsx';
import LoginLanding from './loginLanding/LoginLanding';
import LoginLandingForHelp from './loginLanding/LoginLandingForHelp.jsx';
import Task from './task/Task.tsx';
import Login from './login/Login.tsx'
import Register from './login/Register.tsx'
import Forgot from './login/Forgot.tsx'
import TradesmanList from './tradesmanList/TradesmanList.jsx';
import TradesmanProfile from './tradesmanProfile/TradesmanProfile.tsx';
import TaskList from './taskList/TaskList.tsx';
import PageNotFound from "./404Page";

import "bootstrap-icons/font/bootstrap-icons.css";
import useLocalStorage from 'use-local-storage';
import React, { useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Homepage from './homepage/Homepage.tsx';
import WorkerSignUp from './workerSignUp/WorkerSignUp.tsx';

export const api = axios.create({
  baseURL: 'http://tarefaconnect.doc.ic.ac.uk/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

interface UserData {
  email: string,
  forename: string,
  surname: string,
  id: number,
  hashed_password: string,
  rating: number,
  post_code: string
}

function App() {

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', isDarkMode ? 'dark' : 'light');

  const emptyData: UserData = {
    email: '',
    forename: '',
    surname: '',
    id: -1,
    hashed_password: '',
    rating: -1,
    post_code: ''
  }

  const [userData, setUserData] = useLocalStorage('user_data', emptyData);
  const [taskerid, setTaskerId] = useState({ tasker: false, id: -1 });

  const changeTheme = () => {
    setTheme((prev) => {
      return (prev === 'dark' ? 'light' : 'dark');
    })
  }

  const setTaskerLogin: (arg1: number) => void = (id) => {
    setTaskerId({ tasker: true, id: id });
    return;
  }

  return (
    <main className="App" data-theme={theme} style={{ fontFamily: 'var(--font-family)' }}>
      <Router>
        <CheckHeader>
          <Header changeTheme={changeTheme} currentTheme={theme} />
        </CheckHeader>
        <Routes>
          <Route path='/'>
            <Route index element={<Homepage />} />
            <Route path='login' element={<Login setUserData={setUserData} setTasker={setTaskerLogin} />} />
            <Route path='register' element={<Register setUserData={setUserData} />} />
            <Route path='forgot' element={<Forgot />} />
            <Route path='workerSignUp' element={<WorkerSignUp setUserData={setUserData} setTasker={setTaskerLogin} />} />
            <Route path='home' element={userData === emptyData ? <Navigate to='/login' /> : <LoginLanding isTasker={taskerid.tasker} />} />
            <Route path='findHelp' element={userData === emptyData ? <Navigate to='/login' /> : <LoginLandingForHelp />} />
            <Route path='tradesmanList' element={userData === emptyData ? <Navigate to='/login' /> : <TradesmanList />} />
            <Route path='tradesmanProfile' element={userData === emptyData ? <Navigate to='/login' /> : <TradesmanProfile />} />
            <Route path='taskList' element={userData === emptyData ? <Navigate to='/login' /> : <TaskList post_code={userData.post_code} user_id={userData.id} />} />
            <Route path='task' element={userData === emptyData ? <Navigate to='/login' /> : <Task userId={userData.id} />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </main >
  );
}

export default App;