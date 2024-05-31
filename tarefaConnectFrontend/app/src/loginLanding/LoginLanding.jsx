import { Link } from 'react-router-dom';
import './styles.css';

const panelData = [
  {
    buttonText: "Find Someone",
    body: "Find a tasker to complete a job; filter by rating, distance and more!",
    redirectTo: ""
  },
  { 
    buttonText: "Create A Task",
    body: "Tell taskers what exactly you need doing by creating a task!",
    redirectTo: "/createTask"
  }
]

export default function LoginLanding() {
  const panels = panelData.map((item) => {
    return (
    <div key={item.buttonText} className="LoginLandingItem">
      <Link to={item.redirectTo}>
        <button className="LoginLandingButton">
          {item.buttonText}
        </button>
      </Link>
      <p className="LoginLandingText">{item.body}</p>
    </div>);
  })
  return <div className="LoginLanding">{panels}</div>
}