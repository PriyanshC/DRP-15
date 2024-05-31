import "./panelStyle.css";
import "./createTask.css";

import CreateTask from "./CreateTask";
import TaskDisplay from "./TaskDisplay"
import { useState } from "react";

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
    return (
        <div className="Container">
            <CurrentTaskPanel changeIndex={setIndex} data={taskData.map((item, index) => [item.title, index])} />
            <TaskContentPanel index={index} data={taskData} />
        </div>
    );
}

function TaskContentPanel({ index, data }) {
    return (
        <div>
            {index == -1 ? <CreateTask /> : <TaskDisplay taskData={data[index]} />}
        </div>
    );
}

function CurrentTaskPanel({ changeIndex, data }) {
    return (
        <div className="LeftPanel">
            <h1 className="CurrentTaskTitle">
                Your Current Tasks
            </h1>
            <hr></hr>
            <div className="CurrentTasks">
                {data.map(([title, index]) => {
                    return (
                        <div key={index}>
                            <button className="CurrentTaskButton" onClick={() => { changeIndex(index) }}>
                                {title}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}