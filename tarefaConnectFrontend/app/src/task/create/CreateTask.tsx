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

  const categoryEnum = [
    {
      name: 'Plumbing',
      value: 'plumbing'
    },
    {
      name: 'Electric',
      value: 'electric'
    },
    {
      name: 'Gardening',
      value: 'gardening'
    },
    {
      name: 'Domestic Cleaning',
      value: 'domestic cleaning'
    },
    {
      name: 'Dog Walking',
      value: 'dog walking'
    },
    {
      name: 'Other',
      value: 'other'
    }
  ];

  const [currState, setState] = useState(state.normal);
  const [userCategory, setUserCategory] = useState(-1);
  const [category, setCategory] = useState(-1);
  const [needsCategory, setNeedsCategory] = useState(false);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (category === -1) {
      setNeedsCategory(true);
      return false;
    }

    setState(state.loading);

    api.post(props.userId + "/create-task", {
      title: event.target[0].value,
      description: event.target[1].value,
      category: categoryEnum[category],
      user_heading: props.categoryInfo[userCategory]
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
              <div className='RightPanelElement'>
                <label className='FieldLabel'>
                  Category of Task:
                </label>
                <div className='ProfessionalCategoryDropdown Input' style={{ color: (category === -1 ? 'var(--accent-color)' : 'inherit'), border: (needsCategory ? '1px solid red' : '') }}>
                  {category === -1 ? 'Choose A Category By Hovering...' : categoryEnum[category].name}
                  <div className='DropDownContainer'>
                    {categoryEnum.map((item, index) => {
                      return (
                        <div key={index} className='DropDownItem' style={(category === index ? { backgroundColor: 'var(--button-press)' } : {})}
                          onClick={() => {
                            setCategory(index);
                          }}>{item.name}</div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="RightPanelElement">
                <label className="FieldLabel">
                  Your task subheading:
                </label>
                <div className='CategoryDropdown Input' style={{ color: (userCategory === -1 ? 'var(--accent-color)' : 'inherit') }}>
                  {userCategory === -1 ? 'Set A Subheading...' : props.categoryInfo[userCategory]}
                  <div className='DropDownContainer'>
                    <div className='DropDownItem' style={(userCategory === -1 ? { backgroundColor: 'var(--button-press)' } : {})} onClick={() => { setUserCategory(-1) }}>No category</div>
                    {props.categoryInfo.map((item, index) => {
                      const styles = (index === userCategory ? { backgroundColor: 'var(--button-press)' } : {});
                      return (<div key={item} className='DropDownItem' style={styles} onClick={() => { setUserCategory(index) }}>{item}</div>)
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