import { Link, useLocation } from 'react-router-dom';
import './style.css'

function TradesmanProfile() {

    const location = useLocation()
    const { name, jobTitle, description, distance, verified, rating} = location.state

    const image = "../Assets/electrician.jpg"

    return (
        <div className="TradesmanContainer">
            <MiniProfileInfo name={name} jobTitle={jobTitle} distance={distance}
             verified={verified} rating={rating} />
             <ExpandedProfile name = {name} jobTitle = {jobTitle} description = {description}
                 distance = {distance} verified = {verified} rating = {rating} image={image} />
        </div>
    )
}

function MiniProfileInfo({ name, jobTitle, distance, verified, rating }) {
    return (
        <div className="MiniProfileInfo">
            <Link to="/tradesmanList" style={{textDecoration:'none'}}>
                <button className='BackButton'> 
                    <i className='bi-caret-left'></i>
                    Go Back 
                </button>
            </Link>
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

function ExpandedProfile({ name, jobTitle, description, distance, verified, rating, image }) {
    return (
        <div className="ExpandedProfile">
            <ExpandedProfileInfo description={description} />
            <PictureAndMessage image={image} />
        </div>
    )
}

function ExpandedProfileInfo({description}) {
    return (
        <div className='ExpandedProfileInfo'>
            <ProfileBio description={description} />
            <hr style={{paddingInline: '20px', marginInline: '20px'}}></hr>
            <Reviews/>
        </div>
    )
}

function ProfileBio({description}) {
    return (
        <div className='ProfileBio'>
            <label className='TradesmanDescription'>
                 {description} 
            </label>
        </div>
    )
}

const reviewsData = [
    {
        name: "Melina",
        rating: 5,
        verified: true,
        message: "A great worker and got what I needed done quickly."
    }
];

function Reviews() {
    return (
        <div className='Reviews'>
            <h1> Top Reviews </h1>
            <TopReviews/>
        </div>
    )
}

function TopReviews() {
    const topReviews = reviewsData.map((item, index) => {
        return (
            <div className="ReplyElement" key={index}>
                <div className="ReplyNameContainer">
                    <label className="ReplyName"> {item.name} </label>
                    <VerifiedCheck verified={item.verified}/>
                    <div className="star-rating">
                        <div className="stars-container">
                            <StarDisplay number={item.rating} />
                        </div>
                    </div>
                </div>
                <div className="Divider"></div>
                <div className="ReplyMessageContainer">
                    <dd className="ReplyMessage"> {item.message} </dd>
                </div>
            </div>
        )
    })
    return <div> {topReviews} </div>
}

function PictureAndMessage({ image }) {
    return (
        <div className='PictureAndMessage'>
            <img className='ProfilePicture' src={require("../Assets/electrician.jpg")} 
            alt={require("../Assets/profilePicturePlaceholder.jpg")}/>
            <div className="QAndA">
                <h2> Q/A </h2>
            </div>
        </div>
    )
}

export default TradesmanProfile;