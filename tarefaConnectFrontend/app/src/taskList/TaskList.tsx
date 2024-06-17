import './TaskList.css'
import React from 'react'
import { Dispatch } from 'react'
import { SetStateAction } from 'react'
import { useState } from 'react'
import { FilterPanel } from './FilterPanel.jsx'
import { SearchPanel } from './SearchPanel.jsx'
import Modal from '../components/modal/Modal.jsx'
import { api } from '../App.tsx'
import Loading from '../components/loading/Loading.tsx'
import Error from '../components/error/Error.tsx';
import { useInterval } from 'usehooks-ts'
import { POLLING_INTERVAL_MILLIS } from '../index.jsx'

interface Props {
  handleSearch: (word: string) => void,
  search: string,
  distanceFilter: number,
  ratingFilter: number,
  setShowModal: Dispatch<SetStateAction<boolean>>,
  setTaskUsername: React.Dispatch<React.SetStateAction<string>>,
  categories: string[],
  setScrollHeight: React.Dispatch<React.SetStateAction<number>>
  post_code: string,
  setTaskIdCB: (arg0: number) => void
}

function TaskList({ post_code, user_id }) {
  const [search, setSearch] = useState('')

  const handleSearch = (word: string) => {
    setSearch(word)
  }

  // Filters
  const [distanceFilter, setDistance] = useState(-1)
  const [ratingFilter, setRating] = useState(-1)

  // Categories
  const [categories, setCategory] = useState(["priyansh"])

  const handleCategory = (category: string) => {

    if (categories.includes(category)) {
      setCategory(prev => prev.filter(cat => cat !== category))
    } else {
      setCategory(prev => [...prev, category])
    }
  }

  const [taskId, setTaskId] = useState(-1);

  const handlePost = (msg: string) => {

    const data = {
      tasker_id: user_id,
      task_id: taskId,
      message: msg
    }

    console.log(data);

    api.post('tasks/reply', data)
      .then(resp => {
        console.log("sent message: " + resp.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const [scrollHeight, setScrollHeight] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [taskUsername, setTaskUsername] = useState("Priyansh")

  const setTaskIdCB = (taskId: number) => {
    setTaskId(taskId);
  }

  return (
    <div className="PageContainer">
      <FilterPanel setRating={setRating} distance={distanceFilter} setDistance={setDistance}
        handleCategory={handleCategory} />
      <TaskPanel {...{
        handleSearch: handleSearch, search: search, distanceFilter: distanceFilter, ratingFilter: ratingFilter, setShowModal: setShowModal,
        setTaskUsername: setTaskUsername, categories: categories, setScrollHeight: setScrollHeight, post_code: post_code, setTaskIdCB: setTaskIdCB
      }} />
      {showModal && <Modal setShowModal={setShowModal} taskUsername={taskUsername} scrollHeight={scrollHeight} handleSubmit={handlePost} />}
    </div>
  )
}

interface TaskProps {
  handleSearch: (word: string) => void,
  search: string,
  distanceFilter: number,
  ratingFilter: number,
  setShowModal: Dispatch<SetStateAction<boolean>>,
  setTaskUsername: React.Dispatch<React.SetStateAction<string>>,
  categories: string[],
  setScrollHeight: React.Dispatch<React.SetStateAction<number>>
  post_code: string,
  setTaskIdCB: (arg0: number) => void
}

function TaskPanel(props: Props) {
  const taskProps: TaskProps = { ...props };

  return (
    <div className="TaskPanel">
      <div className="TaskPanelTitle">
        <h1> Find people in need of help </h1>
      </div>
      <div className='TaskContentPanel'>
        <SearchPanel handleSearch={props.handleSearch} toSearchFor={"a job"} />
        <AvailableTasks {...taskProps} />
      </div>
    </div>
  )
}

function AvailableTasks(props: TaskProps) {
  const [taskData, setTaskData] = useState([(<div key={-1} style={{ height: '10vmin', width: '10vmin' }}><Loading /></div>)]);
  useInterval(() => {
    api.post('tasks', { post_code: props.post_code, limit: 1000 })
      .then(resp => {
        console.log(resp.data);
        console.log("filtering with: " + props);
        const tasks = resp.data.filter((item) => {
          return (
            (props.search === '' || item.title.toLowerCase().includes(props.search.toLowerCase())) &&
            (props.ratingFilter === -1 || item.rating >= props.ratingFilter) &&
            (props.distanceFilter === -1 || item.distance <= props.distanceFilter) &&
            (props.categories.length === 1 || props.categories.includes(item.category))
          );
        }).map((item) => {
          return (
            <TaskMiniProfile
              taskTitle={item.title} location={item.location} price={item.expected_price}
              description={item.description} recurring={item.frequency}
              distance={Math.round(item.distance * 10) / 10} timePosted={item.post_date_time}
              rating={(item.title.length % 5) + 1} postedBy={item.name} setShowModal={props.setShowModal}
              setTaskUsername={props.setTaskUsername} setScrollHeight={props.setScrollHeight} setTaskIdCB={props.setTaskIdCB} taskId={item.id} />
          );
        });
        setTaskData(tasks);
      })
      .catch(err => {
        setTaskData (
            [(<div style={{ margin: 'auto', marginTop: '40px', color: 'var(--red)', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '50px', fontWeight: 'bold' }}>
              <Error size={200} />
              A network error has occurred!
            </div>)]);
      })
  }, POLLING_INTERVAL_MILLIS)

  console.log('taskData: ', taskData);
  return <div className='AvailableTasks'>{taskData}</div>
}

function TaskMiniProfile({ taskTitle, location, price, description, recurring, distance, timePosted, rating, postedBy, setShowModal, setTaskUsername, setScrollHeight, setTaskIdCB, taskId }) {
  var today = new Date();
  var dateOf = new Date(timePosted.toString().split(" ")[0]);
  var timeInMillis = dateOf.getTime() - today.getTime();
  var timeInDays = Math.ceil(timeInMillis / (1000 * 60 * 60 * 24));
  console.log("posted on: " + timePosted);
  console.log("days is: " + timeInDays);

  const timePostedText = "Posted " + (timeInDays === 0 ? "today" : (timeInDays === 1 ? "yesterday" : timeInDays + " days ago"))

  return (
    <div className="TaskMiniProfile" key={taskId}>
      <div className="TaskLeftContainer">
        <div className="PriceAndRating">
          <h3> £{price} </h3>
          <StarDisplay number={rating} />
        </div>
      </div>
      <div className="TaskInfo">
        <div className='TaskDetails'>
          <h2 style={{ marginBottom: '5px' }}> {taskTitle} </h2>
          <h4 style={{ marginBottom: '15px' }}> {location} </h4>
          <label style={{ textOverflow: 'ellipsis' }}>
            {description}
          </label>
        </div>
        <div className='TaskProps'>
          <h5 className='TaskProp'>
            <i className='bi-calendar-event'></i>
            Every {recurring} days
          </h5>
          <h5 className='TaskProp'>
            <i className='bi-clock-history'></i>
            {timePostedText}
          </h5>
          <h5 className='TaskProp'>
            <i className='bi-pin-map'></i>
            {distance} km
          </h5>
        </div>
      </div>
      <button type='button' className='ConnectButton' onClick={() => {
        setTaskIdCB(taskId)
        setTaskUsername(postedBy)
        setShowModal(true)
        setScrollHeight(window.scrollY)
        document.body.style.overflow = "hidden";
      }}> Message </button>
    </div>
  )
}

function StarDisplay({ number }) {
  var stars: JSX.Element[] = [];
  for (let i = 0; i < number; i++) {
    stars.push(
      <div className="golden-star" key={i + 100}>&#9733;</div>
    )
  }
  for (let i = 0; i < 5 - number; i++) {
    stars.push(
      <div className="star" key={i}>&#9733;</div>
    )
  }
  return <div className='StarDisplay' style={{ textWrap: 'nowrap' }}> {stars} </div>
}

export default TaskList;