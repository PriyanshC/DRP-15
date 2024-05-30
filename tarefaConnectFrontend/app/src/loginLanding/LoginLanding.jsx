import './styles.css';

const panelData = [
  {
    buttonText: "Find Someone",
    body: "Find a tasker to complete a job; filter by rating, distance and more!"
  },
  { 
    buttonText: "Create A Task",
    body: "Tell taskers what exactly you need doing by creating a task!"
  }
]

export default function LoginLanding() {
  const panels = panelData.map((item) => {
    return (
    <div key={item.buttonText} className="LoginLandingItem">
      <button className="LoginLandingButton">
        {item.buttonText}
      </button>
      <p className="LoginLandingText">{item.body}</p>
    </div>);
  })
  return <div className="LoginLanding">{panels}</div>
}