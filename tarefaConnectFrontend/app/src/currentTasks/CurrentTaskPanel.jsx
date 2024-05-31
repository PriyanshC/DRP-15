import "./panelStyle.css";
import { Link } from 'react-router-dom';

function CurrentTaskPanel() {
    return <div className="LeftPanel">
        <h1 className="CurrentTaskTitle">
            Your Current Tasks
        </h1>
        <hr></hr>
        {CurrentTaskSection()}
    </div>;
}

const taskData = [
    {
      title: "Gardening Every Week",
    },
    { 
      title: "Broken Toilet Seat"
    },
    {
      title: "Faulty Light Bulb"
    }
  ]

function CurrentTaskSection() {
    const tasks = taskData.map((item) => {
        return (
            <div>
              <Link to="/currentTask" state={{taskName: item.title}}>
                <button className="CurrentTaskButton">
                   {item.title}
                </button>
              </Link>
            </div>
        );
    })
    return <div className="CurrentTasks">{tasks}</div>
}

export default CurrentTaskPanel;