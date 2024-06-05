import { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function TradesmanList() {
    const [filters, updateFilters] = useState([[]])
    const [search, setSearch] = useState('')
    
    /* 
        Indices

        0: Type
        1: Distance
        2: Relation
    */
   
    const addFilter = (index, filter) => {
        updateFilters(filters[index].push(filter))
    }

    const [distanceFilter, setDistance] = useState(null)
    const [ratingFilter, setRating] = useState(null)

    return (
        <div className="PageContainer">
            <FilterPanel addFilter = {addFilter} setRating = {setRating} distance={distanceFilter} setDistance = {setDistance} />
            <TradesmanPanel filters = {filters} setSearch={setSearch} search={search} distanceFilter= {distanceFilter} ratingFilter = {ratingFilter} />
        </div>
    )
}

function FilterPanel({ addFilter, setRating, distance, setDistance }) {

    return (
        <div className='FilterPanel'>
            <div>
                <label className='FilterPanelTitle'> Filter Results </label>
            </div>
            <div className='FilterSection'>
                <label className='FilterHeader'> Type: </label>
                <div className="FilterBox">
                    <input className='FilterCheckbox' type='checkbox'/>
                    <label> Home </label>
                </div>
                <div className="FilterBox">
                    <input className='FilterCheckbox' type='checkbox'/> 
                    <label> Garden </label>
                </div>
                <div className="FilterBox">
                    <input className='FilterCheckbox' type='checkbox'/> 
                    <label> Electrical </label>
                </div>
                <div className="FilterBox">
                    <input className='FilterCheckbox' type='checkbox'/>
                    <label> Water </label>
                </div> 
            </div>
            <div className='FilterSection'>
                <label className='FilterHeader'> Maximum distance: </label>
                <div className="DistanceSlider">
                    <input className='DistanceFilter' id='DistanceFilter' type='range'
                     min="0" max="10" steps="1" defaultValue="5" onChange={(e) => setDistance(e.target.value)}/>
                     <label> {distance == null ? 5 : distance} km </label>
                </div>
            </div>
            <div className="FilterSection">
                <label className='FilterHeader'> Relation: </label>
                <div className="Relations">
                    <div className="FilterBox">
                        <input className='FilterCheckbox' type='checkbox'/>
                        <label> Endorsed </label>
                    </div> 
                    <div className="FilterBox">
                        <input className='FilterCheckbox' type='checkbox'/>
                        <label> Friend </label> 
                    </div> 
                    <div className="FilterBox">
                        <input className='FilterCheckbox' type='checkbox'/>
                        <label> Endorsed by a Friend </label>
                    </div> 
                </div>
            </div>
            <div className="FilterSection">
                <label className="FilterHeader"> Minimum Rating: </label>
                <div class="rate" id='rate'>
                    <input type="radio" id="star5" name="rate" value="5" onChange={() => setRating(5)} />
                    <label for="star5" title="5 stars"></label>
                    <input type="radio" id="star4" name="rate" value="4" onChange={() => setRating(4)} />
                    <label for="star4" title="4 stars"></label>
                    <input type="radio" id="star3" name="rate" value="3" onChange={() => setRating(3)} />
                    <label for="star3" title="3 stars"></label>
                    <input type="radio" id="star2" name="rate" value="2" onChange={() => setRating(2)} />
                    <label for="star2" title="2 stars"></label>
                    <input type="radio" id="star1" name="rate" value="1" onChange={() => setRating(1)} />
                    <label for="star1" title="1 star"></label>
                </div>
            </div>
        </div>
    )
}

function TradesmanPanel({ filters, setSearch, search, distanceFilter, ratingFilter }) {
    return (
        <div className="TradesmanPanel">
            <SearchPanel setSearch={setSearch} />
            <AvailableTradesmen filters = {filters} search = {search} distanceFilter = {distanceFilter} ratingFilter = {ratingFilter} />
        </div>
    )
}

function SearchPanel({ setSearch }) {
    return (
        <div className="SearchPanel">
            <div className="SearchBar">
                <input type="search"
                 placeholder='Search for your task'
                 onChange={(e) => setSearch(e.target.value)}
                />
                <i className='bi-search'></i>
            </div>
        </div>
    )
}

const availableTradesmen =[
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

function AvailableTradesmen({ filters, search, distanceFilter, ratingFilter }) {
    const [selected, setSelected] = useState(null)
    const toggle = (index) => {
        if (selected == index) {
            return setSelected(null)
        }

        setSelected(index)
    }

    // FILTER HERE

    const tradesmen = availableTradesmen.filter((item) => {
        return (
            (search.toLowerCase() === '' ? item : item.jobTitle.toLowerCase().includes(search)) &&
            (ratingFilter == null ? item : item.rating >= ratingFilter) &&
            (distanceFilter == null ? item.distance >= 5 : item.distance >= distanceFilter)
        )
    }).map((item, index) => {
            return (
                <TradesmanMiniProfile index = {index} name = {item.name} 
                jobTitle = {item.jobTitle} description = {item.description}
                 distance = {item.distance} verified = {item.verified} 
                 rating = {item.rating} toggle = {toggle} selected= {selected} />
            )
        })

    return (<div className="AvailableTradesmen"> { tradesmen } </div>
    )
}

function TradesmanMiniProfile({ index, name, jobTitle, description, distance, verified, rating, toggle, selected }) {
    return (
        <div className="MiniProfile" onClick={ () => toggle(index)}>
            <ProfileInfo name={name} jobTitle={jobTitle} distance={distance}
             verified={verified} rating={rating}/>
             <ProfileDescription index = {index} name = {name} 
                jobTitle = {jobTitle} description = {description}
                 distance = {distance} verified = {verified} 
                 rating = {rating} selected= {selected}/>
        </div>
    )
}

function ProfileInfo({ name, jobTitle, distance, verified, rating }) {
    return (
        <div className="ProfileInfo">
            <label> { name } </label>
            <div className="VerticalLine"></div>
            <label> { jobTitle } </label>
            <div className="VerticalLine"></div>
            <label> { distance } km </label>
            <div className='VerifyRating'>
                <VerifiedCheck verified={verified} />
                <StarDisplay number={rating} />
            </div>
        </div>
    )
}



function ProfileDescription({ index, name, jobTitle, description, distance, verified, rating, selected }) {
    return(
        <div className={selected === index ? "ProfileDescriptionContainershow" 
        : "ProfileDescriptionContainer"}>
            <div className='ProfileTopInfo'>
                <div className= "ProfileDescription"> {description} </div>
                <img className='ProfileDescriptionImage' src={require("../Assets/electrician.jpg")}/>
            </div>
            <Link to='/tradesmanProfile' 
                state={{
                    name: name, 
                    jobTitle: jobTitle,
                    description: description,
                    distance: distance,
                    verified: verified,
                    rating: rating
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
        : <i className='bi-patch-check-fill' style={{opacity:'0.1'}}></i> 
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