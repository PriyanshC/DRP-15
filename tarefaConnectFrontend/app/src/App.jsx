import './App.css';
import Header from './header/Header';
import LoginLanding from './loginLanding/LoginLanding';
import Task from './task/Task';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import styles from './Global'
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const mainStyle = styles().fonts.paragraph;
  return (
    <main className="App" style={{ fontFamily: mainStyle }}>
      <Header />
      <Router>
        <Routes>
          <Route
            exact
            path='/'
            element={<LoginLanding />}
          />
          <Route
            exact
            path='/task'
            element={<Task />}
          />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
