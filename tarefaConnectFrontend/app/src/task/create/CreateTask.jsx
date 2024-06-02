import './CreateTask.css'

import { useState } from 'react';
import { api } from '../../App.tsx';

export default function CreateTask() {
  const [formData, updateForm] = useState({ title: '', desc: '' })

  const handleChange = (e) => {
    updateForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = () => {
    api.post("create-task", formData).catch(err => console.log(err));
  }

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
            name='desc'
            onChange={handleChange}
          />
        </div>
      </form>
      <button className="PostButton" style={{ color: 'inherit' }} onClick={() => { handleSubmit() }} >
        Post
      </button>
    </div>
  );
}