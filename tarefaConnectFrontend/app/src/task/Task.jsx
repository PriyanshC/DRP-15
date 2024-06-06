import "./Task.css";

import CreateTask from "./create/CreateTask";
import TaskDisplay from "./display/TaskDisplay.tsx"
import { useState } from "react";

export default function Task({ userData_, startingIndex = -1 }) {
  const [userData, updateUserData] = useState(userData_);
  const [index, setIndex] = useState(startingIndex);

  const addTask = (task) => {
    updateUserData(prev => ({
      ...prev,
      tasks: [...prev.tasks, task]
    }))
  }

  return (
    <div className="Container" >
      <CurrentTaskPanel changeIndex={setIndex} data={userData.tasks.map((item) => [item.title, item.id])} />
      {index === -1 ? <CreateTask addTask={addTask} userId={userData.id} /> : <TaskDisplay taskData={userData.tasks[index]} />}
    </div>
  );
}

function CurrentTaskPanel({ changeIndex, data }) {
  const [selected, changeSelected] = useState(-1);
  return (
    <div className="LeftPanel">
      <h1 className="CurrentTaskTitle">
        Current Tasks
      </h1>
      <hr style={{ borderColor: 'var(--accent-color)' }}></hr>
      <div className="TaskList">
        {data.map(([title, id], index) => {
          var styles = (index === selected ? { backgroundColor: 'var(--button-press-highlight)' } : {});
          return (
            <div key={id}>
              <button className="CurrentTaskButton" style={styles} onClick={() => { changeIndex(index); changeSelected(index) }}>
                {title}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}