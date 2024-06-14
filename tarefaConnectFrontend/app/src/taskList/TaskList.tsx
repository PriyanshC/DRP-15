import './TaskList.css'
import React, { useEffect } from 'react'
import { Dispatch } from 'react'
import { SetStateAction } from 'react'
import { useState } from 'react'
import { FilterPanel } from './FilterPanel.jsx'
import { SearchPanel } from './SearchPanel.jsx'
import Modal from '../components/modal/Modal.jsx'
import { api } from '../App.tsx'

interface Props {
  handleSearch: (word: string) => void,
  search: string,
  distanceFilter: number,
  ratingFilter: number,
  setShowModal: Dispatch<SetStateAction<boolean>>,
  setTaskUsername: React.Dispatch<React.SetStateAction<string>>,
  categories: string[],
  setScrollHeight: React.Dispatch<React.SetStateAction<number>>
  post_code: string
}

function TaskList({ post_code }) {
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

  const [scrollHeight, setScrollHeight] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [taskUsername, setTaskUsername] = useState("Priyansh")

  return (
    <div className="PageContainer">
      <FilterPanel setRating={setRating} distance={distanceFilter} setDistance={setDistance}
        handleCategory={handleCategory} />
      <TaskPanel {...{
        handleSearch: handleSearch, search: search, distanceFilter: distanceFilter, ratingFilter: ratingFilter, setShowModal: setShowModal,
        setTaskUsername: setTaskUsername, categories: categories, setScrollHeight: setScrollHeight, post_code: post_code
      }} />
      {showModal && <Modal setShowModal={setShowModal} taskUsername={taskUsername} scrollHeight={scrollHeight} />}
    </div>
  )
}

function TaskPanel(props: Props) {
  return (
    <div className="TaskPanel">
      <div className="TaskPanelTitle">
        <h1> Find people in need of help </h1>
      </div>
      <div className='TaskContentPanel'>
        <SearchPanel handleSearch={props.handleSearch} toSearchFor={"a job"} />
        <AvailableTasks {...props} />
      </div>
    </div>
  )
}

function AvailableTasks(props: Props) {
  const [taskData, setTaskData] = useState(<div></div>);

  useEffect(() => {
    api.get('tasks/?post_code=' + props.post_code.replace(" ", "%20"))
      .then(resp => {
        console.log(resp);
        console.log(resp.data);
        const tasks = resp.data.filter((item) => {
          return (
            (props.search.toLowerCase() === '' ? item : item.taskTitle.toLowerCase().includes(props.search)) &&
            (props.ratingFilter === -1 ? item : item.rating >= props.ratingFilter) &&
            (props.distanceFilter === -1 ? item.distance <= 7 : item.distance <= props.distanceFilter) &&
            (props.categories.length === 1 ? item : props.categories.includes(item.category))
          );
        }).map((item) => {
          return (
            <TaskMiniProfile
              taskTitle={item.taskTitle} location={item.location} price={item.price}
              description={item.description} recurring={item.recurring}
              distance={item.distance} timePosted={item.timePosted}
              rating={item.rating} postedBy={item.postedBy} setShowModal={props.setShowModal}
              setTaskUsername={props.setTaskUsername} setScrollHeight={props.setScrollHeight} />
          );
        });
        setTaskData(tasks);
      })
      .catch(err => {
        console.log(err);
      })
  }, [props])

  return <div>{taskData}</div>
}

function TaskMiniProfile({ taskTitle, location, price, description, recurring, distance, timePosted, rating, postedBy, setShowModal, setTaskUsername, setScrollHeight }) {

  const timePostedText = "Posted " + (timePosted === 0 ? "today" : (timePosted === 1 ? "yesterday" : timePosted + " days ago"))

  return (
    <div className="TaskMiniProfile">
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