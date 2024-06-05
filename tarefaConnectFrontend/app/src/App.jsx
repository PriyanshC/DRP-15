import './App.css';
import CheckHeader from './header/CheckHeader'
import Header from './header/Header';
import LoginLanding from './loginLanding/LoginLanding';
import Task from './task/Task';
import LoginRegister from './loginRegister/LoginRegister'
import TradesmanList from './tradesmanList/TradesmanList';
import TradesmanProfile from './tradesmanProfile/TradesmanProfile';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import styles from './Global'
import "bootstrap-icons/font/bootstrap-icons.css";

export const api = axios.create({
  baseURL: 'http://tarefaconnect.doc.ic.ac.uk/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

function App() {
  const mainStyle = styles().fonts.paragraph;
  return (
    <main className="App" style={{ fontFamily: mainStyle }}>
      <Router>
      <CheckHeader>
        <Header />
      </CheckHeader>  
        <Routes>
          <Route path='/'>
            <Route index element={<LoginLanding />} />
            <Route path='task' element={<Task />} />
            <Route path='loginRegister' element={<LoginRegister />} />
            <Route path='tradesmanList' element={<TradesmanList/>} />  
            <Route path='tradesmanProfile' element ={<TradesmanProfile/> } />          
            <Route path='*' element={<LoginLanding />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
