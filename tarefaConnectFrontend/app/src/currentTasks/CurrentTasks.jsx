import "./style.css"
import CurrentTaskPanel from '../currentTasks/CurrentTaskPanel'
import { useLocation } from 'react-router-dom'

function CurrentTask(props) {
    const location = useLocation()
    const { taskName } = location.state
    return (
        <div className="Container">
            {CurrentTaskPanel()}
            {RightContainer(taskName)}
        </div>
      );
}

function RightContainer(taskName) {
    return (
        <div className="RightContainer">
            {TaskInfoPanel(taskName)}
            {TaskRepliesPanel(taskName)}
        </div>
    );
}

function TaskInfoPanel(taskName) {
    return (
        <div className="TaskInfoPanel">
            <label> {taskName} </label>
        </div>
    );
}

function TaskRepliesPanel(taskName) {
    return (
        <div className="TaskRepliesPanel">
           <button> {taskName} </button> 
        </div>
    );
}

export default CurrentTask