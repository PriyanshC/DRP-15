import './App.css';
import Header from './header/Header';
import LoginLanding from './loginLanding/LoginLanding';
import styles from './Global'
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const mainStyle = styles().fonts.paragraph;
  return (
    <main className="App" style={{fontFamily:mainStyle}}>
      <Header />
      <LoginLanding />
    </main>
  );
}

export default App;
