import './App.css';
import CheckHeader from './header/CheckHeader'
import Header from './header/Header';
import LoginLanding from './loginLanding/LoginLanding';
import Task from './task/Task';
import LoginRegister from './loginRegister/LoginRegister'
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import useLocalStorage from 'use-local-storage';

export const api = axios.create({
  baseURL: 'http://tarefaconnect.doc.ic.ac.uk/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

function App() {

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', isDarkMode ? 'dark' : 'light');

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
          <Header />
        </CheckHeader>
        <Routes>
          <Route path='/'>
            <Route index element={<LoginLanding />} />
            <Route path='task' element={<Task />} />
            <Route path='loginRegister' element={<LoginRegister />} />
            <Route path='*' element={<LoginLanding />} />
          </Route>
        </Routes>
      </Router>
    </main >
  );
}

export default App;
