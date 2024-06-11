import { Link } from 'react-router-dom';
import './LoginLanding.css';

export function LandingPage(panelData) {
  return (
    <div className="LoginLanding">
      {panelData.map((item) => {
        return (
          <Link to={item.redirectTo} style={{ textDecoration: 'inherit', color: 'inherit' }}>
            <div key={item.id} className="LoginLandingItem">
              <LoginLandingButton text={item.buttonText} />
              <img className='LoginLandingIcon' src={item.icon} alt='../assets/electrician.jpg'/>
              <p className="LoginLandingText">{item.body}</p>
            </div>
          </Link>
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
