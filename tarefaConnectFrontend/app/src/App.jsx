import './App.css';
import Header from './header/Header';
import LoginLanding from './loginLanding/LoginLanding';
import Task from './task/Task';
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
      <Header />
        <Routes>
          <Route path='/'>
            <Route index element={<LoginLanding />} />
            <Route path='task' element={<Task />} />
            <Route path='*' element={<LoginLanding />} />
          </Route>
          {/* <Route
            path='/'
            element={<LoginLanding />}
          />
          <Route
            exact
            path='/task'
            element={<Task />}
          /> */}
        </Routes>
      </Router>
    </main>
  );
}

export default App;
