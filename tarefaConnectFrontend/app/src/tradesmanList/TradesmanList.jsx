import { useState } from 'react'
import { Link } from 'react-router-dom'
import './TradesmanList.css'
import { FilterPanel } from './FilterPanel'
import { SearchPanel } from './SearchPanel'

function TradesmanList() {
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
            <FilterPanel setRating={setRating} distance={distanceFilter} setDistance={setDistance} />
            <TradesmanPanel setSearch={setSearch} search={search} distanceFilter={distanceFilter} ratingFilter={ratingFilter} />
        </div>
    )
}

function TradesmanPanel({ setSearch, search, distanceFilter, ratingFilter }) {
    return (
        <div className="TradesmanPanel">
            <SearchPanel setSearch={setSearch} toSearchFor={"your task"} />
            <AvailableTradesmen search={search} distanceFilter={distanceFilter} ratingFilter={ratingFilter} />
        </div>
    )
}

const availableTradesmen = [
    {
        name: "Audrey Prenton",
        jobTitle: "Dog Walker",
        description: "DOG WALKER DOG WALKER DOG WALKER DOG WALKER DOG WALKER DOG WALKER DOG WALKER",
        distance: 3.9,
        verified: false,
        rating: 3,
        jobType: "Garden",
        relation: "Endorsed"
    },
    {
        name: "Pedro Pronto",
        jobTitle: "Home Help",
        description: "HOME HELP HOME HELP HOME HELP HOME HELP HOME HELP HOME HELP HOME HELP HOME HELP",
        distance: 2.3,
        verified: false,
        rating: 1,
        jobType: "Home",
        relation: "Friend"
    },
    {
        name: "Maria Plum",
        jobTitle: "Cleaner",
        description: "CLEANER CLEANER CLEANER CLEANER CLEANER CLEANER CLEANER CLEANER CLEANER CLEANER CLEANER",
        distance: 1.9,
        verified: true,
        rating: 4,
        jobType: "Home",
        relation: null
    },
    {
        name: "Genova Hardy",
        jobTitle: "Labourer",
        description: "LABOURER LABOURER LABOURER LABOURER LABOURER LABOURER LABOURER LABOURER LABOURER",
        distance: 0.2,
        verified: true,
        rating: 5,
        jobType: "Garden",
        relation: "EndorsedByAFriend"
    },
    {
        name: "Andre Glassover",
        jobTitle: "Electrician",
        description: "ELECTRICIAN ELECTRICIAN ELECTRICIAN ELECTRICIAN ELECTRICIAN ELECTRICIAN ELECTRICIAN",
        distance: 5.1,
        verified: false,
        rating: 1,
        jobType: "Electrical",
        relation: "Endorsed"
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
            (search.toLowerCase() === '' ? item : item.jobTitle.toLowerCase().includes(search)) &&
            (ratingFilter == null ? item : item.rating >= ratingFilter) &&
            (distanceFilter == null ? item.distance <= 5 : item.distance <= distanceFilter)
        )
    }).map((item, index) => {
        return (
            <TradesmanMiniProfile index={index} name={item.name}
                jobTitle={item.jobTitle} description={item.description}
                distance={item.distance} verified={item.verified}
                rating={item.rating} toggle={toggle} selected={selected} taskerId={1} />
        )
    })

    return (<div className="AvailableTradesmen"> {tradesmen} </div>
    )
}

function TradesmanMiniProfile({ index, name, jobTitle, description, distance, verified, rating, toggle, selected, taskerId }) {
    return (
        <div className="MiniProfile" onClick={() => toggle(index)}>
            <ProfileInfo name={name} jobTitle={jobTitle} distance={distance}
                verified={verified} rating={rating} />
            <ProfileDescription index={index} description={description}
                selected={selected} taskerId={taskerId} />
        </div>
    )
}

function ProfileInfo({ name, jobTitle, distance, verified, rating }) {
    return (
        <div className="ProfileInfo">
            <label> {name} </label>
            <div className="VerticalLine"></div>
            <label> {jobTitle} </label>
            <div className="VerticalLine"></div>
            <label> {distance} km </label>
            <div className='VerifyRating'>
                <VerifiedCheck verified={verified} />
                <StarDisplay number={rating} />
            </div>
        </div>
    )
}



function ProfileDescription({ index, description, selected, taskerId }) {
    return (
        <div className={selected === index ? "ProfileDescriptionContainershow"
            : "ProfileDescriptionContainer"}>
            <div className='ProfileTopInfo'>
                <div className="ProfileDescription"> {description} </div>
                <img className='ProfileDescriptionImage' src={require("../assets/electrician.jpg")}
                    alt={"Profile"} />
            </div>
            <Link to='/tradesmanProfile'
                state={{
                    taskerId: taskerId,
                    pageFrom: '/tradesmanList'
                }}>
                <button>
                    See more...
                </button>
            </Link>
        </div>
    )
}

function VerifiedCheck({ verified }) {
    return (
        verified ? <i className='bi-patch-check-fill'></i>
            : <i className='bi-patch-check-fill' style={{ opacity: '0.1' }}></i>
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

export default TradesmanList;