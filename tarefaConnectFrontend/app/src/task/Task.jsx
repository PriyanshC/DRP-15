import "./Task.css";

import CreateTask from "./create/CreateTask";
import TaskDisplay from "./display/TaskDisplay.tsx"
import { useEffect, useState } from "react";
import { api } from "../App.tsx";

export default function Task({ userData_, startingIndex = -1 }) {
  const [userData, updateUserData] = useState(userData_);
  const [index, setIndex] = useState(startingIndex);

  const addTask = (task) => {
    updateUserData(prev => ({
      ...prev,
      tasks: [...prev.taks, task]
    }))
  }

  return (
    <div className="Container">
      <CurrentTaskPanel changeIndex={setIndex} data={userData.tasks.map((item) => [item.title, item.id])} />
      <TaskContentPanel index={index} data={userData.tasks[index]} addTask={addTask} />
    </div>
  );
}

function TaskContentPanel({ index, data, addTask }) {
  return (index === -1 ? <CreateTask addTask={addTask} /> : <TaskDisplay taskData={data} />);
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