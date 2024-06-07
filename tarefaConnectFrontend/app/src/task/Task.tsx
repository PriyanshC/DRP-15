import "./Task.css";

import CreateTask from "./create/CreateTask.tsx";
import TaskDisplay from "./display/TaskDisplay.tsx"
import React, { FormEvent, FormEventHandler, ReactNode, useState } from "react";

export interface ITask {
  title: string,
  description: string,
  category: string,
  user_heading: string,
  id: number
}

interface Props {
  taskData: ITask[],
  userId: number,
  startingIndex: number
}

export default function Task(props: Props) {
  const [taskData, updateTaskData] = useState(props.taskData);
  const [index, setIndex] = useState(props.startingIndex);
  const [categories, setCategories] = useState(Array.from(new Set(props.taskData.map((item) => item.user_heading).filter((item) => { return item }))));

  const addCategory = (category: string) => {
    setCategories(prev => [...prev, category]);
  }

  const addTask = (task: ITask) => {
    updateTaskData(prev => ([...prev, task]))
    console.log(task);
  }

  return (
    <div className="Container" >
      <CurrentTaskPanel addCategory={addCategory} changeIndex={setIndex} data={taskData.map((item) => [item.title, item.user_heading, item.id])} categories={categories} />
      {index === -1 ? <CreateTask addTask={addTask} userId={props.userId} categoryInfo={categories} /> : <TaskDisplay taskData={taskData[index]} />}
    </div>
  );
}

interface PanelProps {
  changeIndex: (number: number) => void,
  data: [string, string, number][],
  categories: string[]
  addCategory: (category: string) => void
}

function CurrentTaskPanel(props: PanelProps) {
  const categoryExpand = () => {
    const content = document.getElementById('category-expand');
    if (!content) {
      return;
    }
    if (content.style.maxHeight) {
      content.style.maxHeight = '';
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  const handleNewCategory: FormEventHandler = (event) => {
    event.preventDefault();
    props.addCategory(event.target[0].value);
  }

  const [selected, changeSelected] = useState(-1);
  const buttons: [ReactNode, string][] = props.data.map(([title, category, id], index) => {
    return ([
      (<div key={id}>
        <button className="CurrentTaskButton" style={selected === index ? { backgroundColor: 'var(--button-press-highlight)' } : {}} onClick={() => { props.changeIndex(index); changeSelected(index) }}>
          {title}
        </button>
      </div>),
      category
    ])
  });

  const [newCategoryExpanded, setExpanded] = useState(false);
  const buttonStyle = (newCategoryExpanded ? { backgroundColor: 'var(--button-color)' } : {})

  console.log(buttons.filter(([_, itemCategory]) => { return itemCategory === 'London Estate' }).map(([fst, _]) => fst))

  return (
    <div className="LeftPanel">
      <h1 className="CurrentTaskTitle">
        Current Tasks
      </h1>
      <hr style={{ borderColor: 'var(--accent-color)' }}></hr>
      <div className="TaskList">
        {
          buttons.filter(([_, itemCategory]) => { return !itemCategory }).map(([fst, _]) => fst)
        }
        {
          props.categories.map((category) => (
            <div className="Category" key={category}>
              <p className="CategoryName"><div>{category}</div><i className="bi-caret-down-fill"></i></p>
              <div className="CategoryContainer">
                {buttons.filter(([_, itemCategory]) => { return itemCategory === category }).map(([fst, _]) => fst)}
              </div>
            </div>
          ))
        }
        <div onClick={() => { categoryExpand(); setExpanded(prev => !prev) }} style={buttonStyle} className="NewButton NewCategoryButton">
          New Sub-heading
          <form className="NewCategoryDropdown" id='category-expand' onSubmit={handleNewCategory}>
            <input className='NewCategoryInput' type="text" placeholder="Sub-heading name..." onClick={(event: FormEvent) => { event.stopPropagation() }} />
            <button className="NewCategorySubmit">Submit</button>
          </form>
        </div>
        <div onClick={() => { props.changeIndex(-1) }} className="NewButton NewTaskButton">
          New Task
        </div>

      </div>
    </div>
  );
}