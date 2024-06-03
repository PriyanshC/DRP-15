import './CreateTask.css'

import { useState } from 'react';
import { api } from '../../App.tsx';
import Loading from '../../loading/Loading.tsx'

export default function CreateTask({ addTask }) {
  const state = {
    error: 0,
    loading: 1,
    normal: 2
  }

  const emptyForm = { title: '', description: '' };

  const [formData, updateForm] = useState(emptyForm)
  const [currState, setState] = useState(state.normal);

  const handleChange = (e) => {
    updateForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = () => {
    setState(state.loading);
    api.post("create-task", formData)
      .then(data => {
        addTask(data.data);
        setState(state.normal)
      })
      .catch(err => { console.log(err); setState(state.error) });
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

          <form className='CreateTaskForm'>
            <div className="RightPanelElement">
              <label className="FieldLabel">Title:</label>
              <input
                type="text"
                className="TitleInput"
                name='title'
                placeholder="What do you need?"
                onChange={handleChange}
              />
            </div>
            <div className="RightPanelElement">
              <label className="FieldLabel">
                Description:
              </label>
              <textarea className="DescriptionInput"
                placeholder="Tell us a little more..."
                name='description'
                onChange={handleChange}
              />
            </div>
          </form>
          <button className="PostButton" onClick={handleSubmit} >
            Post
          </button>
        </div>
      );
  }
}