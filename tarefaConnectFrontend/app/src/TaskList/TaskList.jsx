import './TaskList.css'
import React from 'react'
import { useState } from 'react'
import './TaskList.css'
import { FilterPanel } from './FilterPanel'
import { SearchPanel } from './SearchPanel'

function TaskList() {
    const [search, setSearch] = useState('')
    
    /* 
        Indices

        0: Type
        1: Distance
        2: Relation
    */

    const [distanceFilter, setDistance] = useState(null)
    const [ratingFilter, setRating] = useState(null)

    return (
        <div className="PageContainer">
            <FilterPanel setRating = {setRating} distance={distanceFilter} setDistance = {setDistance} />
            <TradesmanPanel setSearch={setSearch} search={search} distanceFilter= {distanceFilter} ratingFilter = {ratingFilter} />
        </div>
    )
}

function TradesmanPanel({ setSearch, search, distanceFilter, ratingFilter }) {
    return (
        <div className="TradesmanPanel">
            <div className="TradesmanPanelTitle">
                <h1> Find people in need of help </h1>
            </div>
            <SearchPanel setSearch={setSearch} toSearchFor={"a job"} />
            <AvailableTradesmen search = {search} distanceFilter = {distanceFilter} ratingFilter = {ratingFilter} />
        </div>
    )
}

const availableTradesmen =[
    {
        taskTitle: "Lawn Mowing",
        description: "10x10m square lawn, very overgrown and lots of weeds",
        distance: 5.1,
        timePosted: "2 days ago",
        rating: 4,
    },
    {
        taskTitle: "Light Bulb",
        description: "I can't see anything in my room! Please help ASAP.",
        distance: 0.3,
        timePosted: "today",
        rating: 3,
    },
    {
        taskTitle: "Broken Pipe",
        description: "Sink pipe has burst - my husband's fault :(",
        distance: 2.3,
        timePosted: "5 days ago",
        rating: 5,
    },
    {
        taskTitle: "Toilet Disaster",
        description: "My mate came over and the toilet doesn't flush anymore",
        distance: 1.6,
        timePosted: "yesterday",
        rating: 4,
    }
]

function AvailableTradesmen({ search, distanceFilter, ratingFilter }) {
    const [selected, setSelected] = useState(null)
    const toggle = (index) => {
        if (selected === index) {
            return setSelected(null)
        }

        setSelected(index)
    }

    // FILTER HERE

    const tradesmen = availableTradesmen.filter((item) => {
        return (
            (search.toLowerCase() === '' ? item : item.taskTitle.toLowerCase().includes(search)) &&
            (ratingFilter == null ? item : item.rating >= ratingFilter) &&
            (distanceFilter == null ? item.distance <= 5 : item.distance <= distanceFilter)
        )
    }).map((item, index) => {
            return (
                <TradesmanMiniProfile index = {index} 
                taskTitle = {item.taskTitle} description = {item.description}
                 distance = {item.distance} timePosted = {item.timePosted} 
                 rating = {item.rating} toggle = {toggle} selected= {selected} />
            )
        })

    return (<div className="AvailableTradesmen"> { tradesmen } </div>
    )
}

function TradesmanMiniProfile({ index, taskTitle, description, distance, timePosted, rating, toggle, selected }) {
    return (
        <div className="MiniProfile" onClick={ () => toggle(index)}>
            <ProfileInfo taskTitle={taskTitle} distance={distance}
             timePosted={timePosted} rating={rating}/>
             <ProfileDescription index = {index} 
                taskTitle = {taskTitle} description = {description}
                 distance = {distance} timePosted = {timePosted} 
                 rating = {rating} selected= {selected}/>
        </div>
    )
}

function ProfileInfo({ taskTitle, distance, timePosted, rating }) {
    return (
        <div className="ProfileInfo">
            <label> { taskTitle } </label>
            <div className="VerticalLine"></div>
            <label> { timePosted } </label>
            <div className="VerticalLine"></div>
            <label> { distance } km </label>
            <div className='VerifyRating'>
                <StarDisplay number={rating} />
            </div>
        </div>
    )
}



function ProfileDescription({ index, name, jobTitle, description, distance, timePosted, rating, selected }) {
    return(
        <div className={selected === index ? "ProfileDescriptionContainershow" 
        : "ProfileDescriptionContainer"}>
            <div className='ProfileTopInfo'>
                <div className= "ProfileDescription"> {description} </div>
                <img className='ProfileDescriptionImage' src={require("../assets/electrician.jpg")}
                 alt={require("../assets/profilePicturePlaceholder.jpg")}/>
            </div>
            {/* <Link to='/tradesmanProfile' 
                state={{
                    name: name, 
                    jobTitle: jobTitle,
                    description: description,
                    distance: distance,
                    timePosted: verified,
                    rating: rating
                }}>
                <button> 
                    See more... 
                </button>
            </Link> */}
        </div>
    )
}

// function VerifiedCheck({ verified }) {
//     return (
//         verified ? <i className='bi-patch-check-fill'></i> 
//         : <i className='bi-patch-check-fill' style={{opacity:'0.1'}}></i> 
//     )
// }

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