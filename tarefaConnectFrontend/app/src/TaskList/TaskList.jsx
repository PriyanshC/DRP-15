import './TaskList.css'
import React from 'react'
import { useState } from 'react'
import { FilterPanel } from './FilterPanel'
import { SearchPanel } from './SearchPanel'
import Modal from '../components/modal/Modal'

function TaskList() {
    const [search, setSearch] = useState('')

    // Filters
    const [distanceFilter, setDistance] = useState(null)
    const [ratingFilter, setRating] = useState(null)

    // Categories
    const [isPlumbing, setPlumbing] = useState(false)
    const [isElectrical, setElectrical] = useState(false)
    const [isGardening, setGardening] = useState(false)
    const [isDomestic, setDomestic] = useState(false)
    const [isDog, setDog] = useState(false)
    const [isOther, setOther] = useState(false)

    const handlePlumbing = () => {
        setPlumbing(!isPlumbing)
    }

    const handleElectrical = () => {
        setElectrical(!isElectrical)
    }

    const handleGardening = () => {
        setGardening(!isGardening)
    }

    const handleDomestic = () => {
        setDomestic(!isDomestic)
    }

    const handleDog = () => {
        setDog(!isDog)
    }

    const handleOther = () => {
        setOther(!isOther)
    }

    
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="PageContainer">
            <FilterPanel setRating = {setRating} distance={distanceFilter} setDistance = {setDistance}
             handlePlumbing={handlePlumbing} handleElectrical={handleElectrical} handleGardening={handleGardening}
             handleDomestic={handleDomestic} handleDog={handleDog} handleOther={handleOther} />
            <TaskPanel setSearch={setSearch} search={search} distanceFilter= {distanceFilter} ratingFilter = {ratingFilter} setShowModal={setShowModal}
             isPlumbing={isPlumbing} isElectrical={isElectrical} isGardening={isGardening}
             isDomestic={isDomestic} isDog={isDog} isOther={isOther} />
            {showModal && <Modal setShowModal={setShowModal} />}
        </div>
    )
}

function TaskPanel({ setSearch, search, distanceFilter, ratingFilter, setShowModal, isPlumbing,
    isElectrical, isGardening, isDomestic, isDog, isOther }) {
    return (
        <div className="TaskPanel">
            <div className="TaskPanelTitle">
                <h1> Find people in need of help </h1>
            </div>
             <div className='TaskContentPanel'>
                <SearchPanel setSearch={setSearch} toSearchFor={"a job"} />
                <AvailableTasks search = {search} distanceFilter = {distanceFilter} ratingFilter = {ratingFilter}
                 setShowModal={setShowModal} isPlumbing={isPlumbing} isElectrical={isElectrical} isGardening={isGardening}
                 isDomestic={isDomestic} isDog={isDog} isOther={isOther} />
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
        category: "gardening"
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
        category: "electrical"
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
        category: "plumbing"
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
        category: "plumbing"
    }
]

function AvailableTasks({ search, distanceFilter, ratingFilter, setShowModal, isPlumbing,
    isElectrical, isGardening, isDomestic, isDog, isOther }) {
    // FILTER HERE

    const tasks = availableTasks.filter((item) => {
        return (
            (search.toLowerCase() === '' ? item : item.taskTitle.toLowerCase().includes(search)) &&
            (ratingFilter == null ? item : item.rating >= ratingFilter) &&
            (distanceFilter == null ? item.distance <= 7 : item.distance <= distanceFilter) &&
            (isPlumbing ? item.category === "plumbing" : item) &&
            (isElectrical ? item.category === "electrical" : item) &&
            (isGardening ? item.category === "gardening" : item) &&
            (isDomestic ? item.category === "domestic" : item) &&
            (isDog ? item.category === "dog" : item) &&
            (isOther ? item.category === "other" : item)
        )
    }).map((item, index) => {
            return (
                <TaskMiniProfile index = {index} 
                taskTitle = {item.taskTitle} location={item.location} price={item.price}
                 description = {item.description} recurring={item.recurring}
                 distance = {item.distance} timePosted = {item.timePosted} 
                 rating = {item.rating} setShowModal={setShowModal} />
            )
        })

    return (
        (<div className="AvailableTasks"> { tasks } </div>)
    )
}

function TaskMiniProfile({ index, taskTitle, location, price, description, recurring, distance, timePosted, rating, setShowModal }) {

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
                        Posted {timePosted} 
                    </h5>
                    <h5 className='TaskProp'>
                        <i className='bi-pin-map'></i>
                        {distance} km
                    </h5>
                </div>
            </div>
            <button type='button' className='ConnectButton' onClick={() => {
                setShowModal(true)
                document.body.style.overflow = "hidden";
            }}> Connect </button>
        </div>
    )
}

function StarDisplay({ number }) {
    var stars = [];
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
    return <div className='StarDisplay'> {stars} </div>
}

export default TaskList;