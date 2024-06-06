import './CreateTask.css'

import React, { FormEventHandler, useState } from 'react';
import { api } from '../../App.tsx';
import Loading from '../../loading/Loading.tsx'

interface Props {
  userId: number,
  addTask: (data) => void,
  categoryInfo: string[]
}

export default function CreateTask(props: Props) {
  const state = {
    error: 0,
    loading: 1,
    normal: 2
  }

  const [currState, setState] = useState(state.normal);
  const [categoryChoice, setCategory] = useState(-1);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (categoryChoice === -1) {
      return false;
    }

    setState(state.loading);

    api.post(props.userId + "/create-task", {
      title: event.target[0].value,
      description: event.target[1].value,
      // category: props.categoryInfo[categoryChoice]
    })
      .then(data => {
        props.addTask(data.data);
        setState(state.normal);
      })
      .catch(err => {
        console.log(err);
        console.log('err');
        setState(state.error);
      });
    return true;
  }

  switch (currState) {
    case (state.error):
      return (<div style={{ margin: 'auto', marginTop: '40px' }}>Error Occurred!</div>);
    case (state.loading):
      return (
        <div style={{ width: '200px', height: '200px', margin: 'auto', marginTop: '40px' }}>
          <Loading />
        </div>);
    default:
      return (
        <div className="RightPanel">
          <h1 className="CreateTaskTitle">
            Create a New Task
          </h1>

          <form onSubmit={handleSubmit}>
            <div className='CreateTaskForm'>
              <div className="RightPanelElement">
                <label className="FieldLabel">Title:</label>
                <input
                  type="text"
                  className="TitleInput Input"
                  name='title'
                  placeholder="What do you need?"
                  maxLength={100}
                  required
                />
              </div>
              <div className="RightPanelElement">
                <label className="FieldLabel">
                  Description:
                </label>
                <textarea className="DescriptionInput Input"
                  placeholder="Tell us a little more..."
                  name='description'
                  maxLength={1000}
                  required
                />
              </div>
              <div className="RightPanelElement">
                <label className="FieldLabel">
                  Category:
                </label>
                <div className='CategoryDropdown Input' style={{ color: (categoryChoice === -1 ? 'var(--accent-color)' : 'inherit') }}>
                  {categoryChoice === -1 ? 'Choose One By Hovering...' : props.categoryInfo[categoryChoice]}
                  <div className='DropDownContainer'>
                    {props.categoryInfo.map((item, index) => {
                      const styles = (index === categoryChoice ? { backgroundColor: 'var(--button-press)' } : {});
                      return (<div key={item} className='DropDownItem' style={styles} onClick={() => { setCategory(index) }}>{item}</div>)
                    })}
                  </div>
                </div>
              </div>
            </div>
            <button className="PostButton" type='submit' >
              Post
            </button>
          </form >
        </div >
      );
  }
}