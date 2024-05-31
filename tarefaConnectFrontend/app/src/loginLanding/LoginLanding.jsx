import { Link } from 'react-router-dom';
import './styles.css';

import styles from '../Global'

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
    redirectTo: ""
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
  const style = styles();
  const buttonProps = {
    background: style.colours.secondary,
    hover: style.colours.primary,
    textFont: style.fonts.heading,
    textColour: 'black'
  };
  return (
    <div className="LoginLanding">
      {panelDataExample.map((item) => {
        return (
          <div key={item.id} className="LoginLandingItem">
            <Link to={item.redirectTo} style={{ textDecoration: 'none' }}>
              <LoginLandingButton props={buttonProps} text={item.buttonText} />
            </Link>
            <p className="LoginLandingText">{item.body}</p>
          </div>
        )
      })}
    </div>
  );
}

function LoginLandingButton({ props, text }) {
  return (
    <div style={{ /*backgroundColor: props.background, */color: props.textColour, fontFamily: props.textFont }} className='LoginLandingButton'>
      {text}
    </div>
  );

}