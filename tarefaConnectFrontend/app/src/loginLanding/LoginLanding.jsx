import { Link } from 'react-router-dom';
import './LoginLanding.css';

// eslint-disable-next-line
const panelData = [
  {
    id: 0,
    buttonText: "Find Someone",
    body: "Find a tasker to complete a job; filter by rating, distance and more!",
    redirectTo: ""
  },
  {
    id: 1,
    buttonText: "Create A Task",
    body: "Tell taskers what exactly you need doing by creating a task!",
    redirectTo: "/task"
  }
]

// eslint-disable-next-line
const panelDataExample = [
  {
    id: 0,
    buttonText: "Find Someone",
    body: "Find a tasker to complete a job; filter by rating, distance and more!",
    redirectTo: "/tradesmanList"
  },
  {
    id: 1,
    buttonText: "Create A Task",
    body: "Tell taskers what exactly you need doing by creating a task!",
    redirectTo: "/task"
  },
  {
    id: 2,
    buttonText: "View Task",
    body: "See what people need doing, negotiate a contract and work!",
    redirectTo: ""
  }
]

export default function LoginLanding() {
  return (
    <div className="LoginLanding">
      {panelDataExample.map((item) => {
        return (
          <div key={item.id} className="LoginLandingItem">
            <Link to={item.redirectTo} style={{ textDecoration: 'inherit', color: 'inherit' }}>
              <LoginLandingButton text={item.buttonText} />
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
    <div className='LoginLandingButton'>
      {text}
    </div>
  );

}