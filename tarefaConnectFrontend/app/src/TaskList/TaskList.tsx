import './TaskList.css'
import React from 'react'
import { Dispatch } from 'react'
import { SetStateAction } from 'react'
import { useState } from 'react'
import { FilterPanel } from './FilterPanel.jsx'
import { SearchPanel } from './SearchPanel.jsx'
import Modal from '../components/modal/Modal.jsx'
import { api } from '../App.tsx'
import sampleTaskData from './sampleTaskData.json'

interface Props {
    handleSearch: (word: string) => void,
    search: string,
    distanceFilter: number,
    ratingFilter: number,
    setShowModal: Dispatch<SetStateAction<boolean>>,
    setTaskUsername: React.Dispatch<React.SetStateAction<string>>,
    categories: string[],
    setScrollHeight: React.Dispatch<React.SetStateAction<number>>,
  }

function TaskList() {
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
            <FilterPanel setRating = {setRating} distance={distanceFilter} setDistance = {setDistance}
             handleCategory={handleCategory} />
            <TaskPanel {...{ handleSearch: handleSearch, search: search, distanceFilter: distanceFilter, ratingFilter: ratingFilter, setShowModal: setShowModal,
             setTaskUsername: setTaskUsername, categories: categories, setScrollHeight: setScrollHeight}} />
            {showModal && <Modal setShowModal={setShowModal} taskUsername={taskUsername} scrollHeight={scrollHeight} /> }
        </div>
    )
}

function TaskPanel( props: Props ) {
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

const availableTasks =[
    {
        taskTitle: "Lawn Mowing",
        location: "South Kensington",
        price: 10,
        recurring: 4,
        description: "10x10m square lawn, very overgrown and lots of weeds",
        distance: 5.1,
        timePosted: "2 days ago",
        rating: 4,
        category: "gardening",
        postedBy: "John"
    },
    {
        taskTitle: "Light Bulb",
        location: "Notting Hill",
        price: 15,
        recurring: 10,
        description: "I can't see anything in my room! Please help ASAP.",
        distance: 0.3,
        timePosted: "today",
        rating: 3,
        category: "electrical",
        postedBy: "John"
    },
    {
        taskTitle: "Broken Pipe",
        location: "Camden",
        price: 20,
        recurring: 7,
        description: "Sink pipe has burst - my husband's fault :(",
        distance: 2.3,
        timePosted: "5 days ago",
        rating: 5,
        category: "plumbing",
        postedBy: "John"
    },
    {
        taskTitle: "Toilet Disaster",
        location: "Soho",
        price: 12,
        recurring: 3,
        description: "My mate came over and the toilet doesn't flush anymore",
        distance: 1.6,
        timePosted: "yesterday",
        rating: 4,
        category: "plumbing",
        postedBy: "John"
    }
]

function AvailableTasks(props: Props) {

        // var availableTasks = []

        // api.get("/listings", {
        //     responseType: 'blob'
        // })
        // .then(response => {
        //     availableTasks = response.data
        // })

    // FILTER HERE
    const tasks = sampleTaskData.filter((item) => {
        return (
            (props.search.toLowerCase() === '' ? item : item.taskTitle.toLowerCase().includes(props.search)) &&
            (props.ratingFilter === -1 ? item : item.rating >= props.ratingFilter) &&
            (props.distanceFilter === -1 ? item.distance <= 7 : item.distance <= props.distanceFilter) &&
            (props.categories.length === 1 ? item : props.categories.includes(item.category))
        )
    }).map((item, index) => {
            return (
                <TaskMiniProfile 
                 taskTitle = {item.taskTitle} location={item.location} price={item.price}
                 description = {item.description} recurring={item.recurring}
                 distance = {item.distance} timePosted = {item.timePosted} 
                 rating = {item.rating} postedBy={item.postedBy} setShowModal={props.setShowModal}
                 setTaskUsername={props.setTaskUsername} setScrollHeight={props.setScrollHeight} />
            )
        })

    return (
        (<div className="AvailableTasks"> { tasks } </div>)
    )
}

function TaskMiniProfile({ taskTitle, location, price, description, recurring, distance, timePosted, rating, postedBy, setShowModal, setTaskUsername, setScrollHeight }) {

    const timePostedText = "Posted " + (timePosted === 0 ? "today" : (timePosted === 1 ? "yesterday" : timePosted + " days ago"))

    return (
        <div className="TaskMiniProfile">
            <div className="TaskLeftContainer">
                 <div className="PriceAndRating">
                    <h3> £{price} </h3>
                    <StarDisplay number={rating}/>
                 </div>
            </div>
            <div className="TaskInfo">
                <div className='TaskDetails'>
                    <h2 style={{marginBottom:'5px'}}> {taskTitle} </h2>
                    <h4 style={{marginBottom:'15px'}}> {location} </h4>
                    <label style={{textOverflow:'ellipsis'}}>
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
    return <div className='StarDisplay' style={{textWrap: 'nowrap'}}> {stars} </div>
}

export default TaskList;