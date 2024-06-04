import "./Task.css";

import CreateTask from "./create/CreateTask";
import TaskDisplay from "./display/TaskDisplay.tsx"
import { useEffect, useState } from "react";
import { api } from "../App.tsx";

export default function Task({ startingIndex = -1 }) {
  const exampleTasks = [
    {
      title: 'Gardening Every Week',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus dolores minus, quo fuga possimus iure iusto commodi voluptatibus, aut architecto nesciunt est amet reiciendis quas odit suscipit laudantium quis hic.'
    },
    {
      title: "Broken Toilet Seat",
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus dolores minus, quo fuga possimus iure iusto commodi voluptatibus, aut architecto nesciunt est amet reiciendis quas odit suscipit laudantium quis hic.'
    },
    {
      title: "Faulty Light Bulb",
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus dolores minus, quo fuga possimus iure iusto commodi voluptatibus, aut architecto nesciunt est amet reiciendis quas odit suscipit laudantium quis hic.'
    }
  ]
  const [index, setIndex] = useState(startingIndex);
  const [taskData, setTaskData] = useState(exampleTasks);

  useEffect(() => {
    api.get("create-task")
      .then(data => {
        setTaskData(data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const addTask = (task) => {
    setTaskData(prev => [...prev, task])
  }

  return (
    <div className="Container">
      <CurrentTaskPanel changeIndex={setIndex} data={taskData.map((item, index) => [item.title, index])} />
      <TaskContentPanel index={index} data={taskData} addTask={addTask} />
    </div>
  );
}

function TaskContentPanel({ index, data, addTask }) {
  return (index === -1 ? <CreateTask addTask={addTask} /> : <TaskDisplay taskData={data[index]} />);
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
        {data.map(([title, index]) => {
          var styles = (index === selected ? { backgroundColor: 'var(--button-press-highlight)' } : {});
          return (
            <div key={index}>
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