import { Link } from 'react-router-dom';
import './LoginLanding.css';

export function LandingPage(panelData) {
  return (
    <div className="LoginLanding">
      {panelData.map((item) => {
        return (
          <div key={item.id} className="LoginLandingItem">
            <Link to={item.redirectTo} style={{ textDecoration: 'inherit', color: 'inherit' }}>
              <LoginLandingButton text={item.buttonText} /> 
              <img className='LoginLandingIcon' src={item.icon} alt='../assets/electrician.jpg'/>
            </Link>
            <p className="LoginLandingText">{item.body}</p>
          </div>
        )
      })}
    </div>
  );
}

function LoginLandingButton({ text }) {
  return (
    <button className='LoginLandingButton'>
      {text}
    </button>
  );
}
