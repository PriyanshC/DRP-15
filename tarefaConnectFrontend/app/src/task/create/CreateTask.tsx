import './CreateTask.css'

import React, { FormEventHandler, useState } from 'react';
import { api } from '../../App.tsx';
import Loading from '../../components/loading/Loading.tsx'
import Complete from '../../components/complete/Complete.tsx';
import Error from '../../components/error/Error.tsx';

interface Props {
  userId: number,
  addTask: (data) => void,
  categoryInfo: string[]
}


export default function CreateTask(props: Props) {
  enum state {
    error = 0,
    loading = 1,
    normal = 2,
    complete = 3
  }

  const frequencySelect = [
    'Once',
    'Twice'
  ];

  const numberSelect = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12
  ];

  const periodSelect = [
    { name: 'day', days: 1 },
    { name: 'week', days: 7 },
    { name: 'month', days: 30 }
  ];

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

  const emptyForm = { title: '', description: '' }

  const [formData, setFormData] = useState({ category: -1, userCategory: -1, timePeriod: { freq: 0, number: 1, period: 0 } });

  const setUserCategory = (category) => {
    setFormData(prev => ({
      ...prev,
      userCategory: category
    }))
  }

  const setCategory = (category) => {
    setFormData(prev => ({
      ...prev,
      category: category
    }))
  }

  const setFreq = (freq) => {
    setFormData(prev => ({
      ...prev,
      timePeriod: {
        ...prev.timePeriod,
        freq: freq
      }
    }))
  }

  const setNumber = (number) => {
    setFormData(prev => ({
      ...prev,
      timePeriod: {
        ...prev.timePeriod,
        number: number
      }
    }))
  }

  const setPeriod = (period) => {
    setFormData(prev => ({
      ...prev,
      timePeriod: {
        ...prev.timePeriod,
        period: period
      }
    }))
  }

  const [currState, setState] = useState(state.normal);
  const [needsCategory, setNeedsCategory] = useState(false);

  const [savedFormData, setSavedForm] = useState(emptyForm);

  const calculateDays = ({ freq, number, period }) => {
    return Math.round((number * periodSelect[period].days) / (freq + 1));
  }

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (formData.category === -1) {
      setNeedsCategory(true);
      return false;
    }

    setState(state.loading);

    const data = {
      title: event.target[0].value,
      description: event.target[1].value,
      category: categoryEnum[formData.category].value,
      user_heading: props.categoryInfo[formData.userCategory],
      frequency: calculateDays(formData.timePeriod)
    }

    api.post(props.userId + "/create-task", data)
      .then(data => {
        props.addTask(data.data);
        setState(state.complete);

        // Reset form to be blank
        setSavedForm(emptyForm);
        setCategory(-1);
        setUserCategory(-1);

        setTimeout(() => { setState(state.normal) }, 2000);
      })
      .catch(err => {
        console.log(err);
        setState(state.error);
        setSavedForm({ title: data.title, description: data.description })
        setTimeout(() => { setState(state.normal) }, 4000);
      });
    return true;
  }

  switch (currState) {
    case (state.complete):
      return (
        <div style={{ width: '200px', height: '200px', margin: 'auto', marginTop: '40px' }}>
          <Complete size={200} />
        </div>
      );
    case (state.error):
      return (
        <div style={{ margin: 'auto', marginTop: '40px', color: 'var(--red)', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '50px', fontWeight: 'bold' }}>
          <Error size={200} />
          A network error has occurred!
        </div>);
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
                <label className="FieldLabel">Title :</label>
                <input
                  type="text"
                  className="TitleInput Input"
                  name='title'
                  placeholder="What do you need?"
                  maxLength={100}
                  defaultValue={savedFormData.title}
                  required
                />
              </div>
              <div className="RightPanelElement">
                <label className="FieldLabel">
                  Description :
                </label>
                <textarea className="DescriptionInput Input"
                  placeholder="Tell us a little more..."
                  name='description'
                  maxLength={1000}
                  required
                  defaultValue={savedFormData.description}
                />
              </div>
              <div className='RightPanelElement'>
                <label className='FieldLabel'>
                  Category of Task :
                </label>
                <div className='ProfessionalCategoryDropdown Input' style={{ color: (formData.category === -1 ? 'var(--accent-color)' : 'inherit'), border: (needsCategory ? '1px solid red' : '') }}>
                  {formData.category === -1 ? 'Choose A Category By Hovering...' : categoryEnum[formData.category].name}
                  <div className='DropDownContainer'>
                    {categoryEnum.map((item, index) => {
                      return (
                        <div key={index} className='DropDownItem' style={(formData.category === index ? { backgroundColor: 'var(--button-press)' } : {})}
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
                  Your task subheading :
                </label>
                <div className='CategoryDropdown Input' style={{ color: (formData.userCategory === -1 ? 'var(--accent-color)' : 'inherit') }}>
                  {formData.userCategory === -1 ? 'Set A Subheading...' : props.categoryInfo[formData.userCategory]}
                  <div className='DropDownContainer'>
                    <div className='DropDownItem' style={(formData.userCategory === -1 ? { backgroundColor: 'var(--button-press)' } : {})} onClick={() => { setUserCategory(-1) }}>No category</div>
                    {props.categoryInfo.map((item, index) => {
                      const styles = (index === formData.userCategory ? { backgroundColor: 'var(--button-press)' } : {});
                      return (<div key={item} className='DropDownItem' style={styles} onClick={() => { setUserCategory(index) }}>{item}</div>)
                    })}
                  </div>
                </div>
              </div>
              <div className="RightPanelElement">
                <label className="FieldLabel">
                  How often :
                </label>
                <div className='Input TimeContainer'>
                  <div className='TimeDropdown TimeSelector FreqSelect'>
                    {frequencySelect[formData.timePeriod.freq]}
                    <div className='DropDownContainer'>
                      {frequencySelect.map((item, index) => (
                        <div className='DropDownItem' key={index} onClick={() => { setFreq(index) }}>{item}</div>
                      ))}
                    </div>
                  </div>
                  <p className='TimeSpacer'>every</p>
                  <div className='TimeDropdown TimeSelector NumbSelect'>
                    {numberSelect[formData.timePeriod.number - 1]}
                    <div className='DropDownContainer'>
                      {numberSelect.map((item, index) => (
                        <div className='DropDownItem' key={index} onClick={() => { setNumber(index + 1) }}>{item}</div>
                      ))}
                    </div>
                  </div>
                  <div className='TimeDropdown TimeSelector PeriodSelect'>
                    {periodSelect[formData.timePeriod.period].name + (formData.timePeriod.number > 1 ? 's' : '')}
                    <div className='DropDownContainer'>
                      {periodSelect.map((item, index) => (
                        <div className='DropDownItem' key={index} onClick={() => { setPeriod(index) }}>{item.name}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="PostButton" type='submit' >
              Post Task
            </button>
          </form >
        </div >
      );
  }
}