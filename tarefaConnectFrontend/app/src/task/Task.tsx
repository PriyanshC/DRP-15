import "./Task.css";

import CreateTask from "./create/CreateTask.tsx";
import TaskDisplay from "./display/TaskDisplay.tsx"
import React, { FormEvent, ReactNode, useState } from "react";

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
  startingIndex: number,
  addTask: (arg0: ITask) => void
}

export default function Task(props: Props) {
  const taskData = props.taskData;
  const [index, setIndex] = useState(props.startingIndex);
  const [categories, setCategories] = useState(Array.from(new Set(props.taskData.map((item) => item.user_heading).filter((item) => { return item }))));

  const addCategory: (arg0: string) => boolean = (category: string) => {
    if ((categories.filter((str) => str === category).length === 0) && (category.length < 25)) {
      setCategories(prev => [...prev, category]);
      return true;
    }
    return false;
  }

  return (
    <div className="Container" >
      <CurrentTaskPanel addCategory={addCategory} changeIndex={setIndex} data={taskData.map((item) => [item.title, item.user_heading, item.id])} categories={categories} />
      {index === -1 ? <CreateTask addTask={props.addTask} userId={props.userId} categoryInfo={categories} /> : <TaskDisplay {...taskData[index]} />}
    </div>
  );
}

interface PanelProps {
  changeIndex: (number: number) => void,
  data: [string, string, number][],
  categories: string[]
  addCategory: (category: string) => boolean
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

  const handleNewCategory: ((arg0: FormEvent) => boolean) = (event) => {
    event.preventDefault();
    return props.addCategory(event.target[0].value);
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
  const [newSubheadingValid, setSubheadingValid] = useState(true);

  const buttonStyle = (newCategoryExpanded ? { backgroundColor: 'var(--button-color)' } : {})

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
              <div className="CategoryName"><div>{category}</div><i className="bi-caret-down-fill"></i></div>
              <div className="CategoryContainer">
                {buttons.filter(([_, itemCategory]) => { return itemCategory === category }).map(([fst, _]) => fst)}
              </div>
            </div>
          ))
        }
        <div onClick={() => { categoryExpand(); setExpanded(prev => !prev) }} style={buttonStyle} className="NewButton NewCategoryButton">
          New Sub-heading
          <form className="NewCategoryDropdown" id='category-expand' onSubmit={(e) => { setSubheadingValid(handleNewCategory(e)) }}>
            <input
              className='NewCategoryInput'
              type="text"
              placeholder="Sub-heading name..."
              onDragLeave={(event) => { event.stopPropagation() }}
              onClick={(event: FormEvent) => { event.stopPropagation() }}
              style={{ borderColor: (newSubheadingValid ? '' : 'red') }}
            />
            <button className="NewCategorySubmit" type="submit" onClick={(e) => { e.stopPropagation(); }}>Submit</button>
          </form>
        </div>
        <div onClick={() => { props.changeIndex(-1) }} className="NewButton NewTaskButton">
          New Task
        </div>

      </div>
    </div>
  );
}