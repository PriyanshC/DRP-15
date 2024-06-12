import { Link, useLocation } from 'react-router-dom';
import './TradesmanProfile.css'
import React, { ReactElement, useEffect, useState } from 'react';
import { api } from '../App.tsx';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

interface Rating {
  punctuality: number,
  time: number,
  cost: number,
  overall: number
}

interface Review {
  reviewerName: string,
  ratingAverage: number,
  title: string,
  desc: string
}

interface Expertise {
  name: string,
  desc: string
}

interface ContactInfo {
  email: string,
  phone: string,
  website: string
}

interface Tasker {
  name: string,
  description: string,
  expertises: Expertise[],
  contact: ContactInfo,
  why: string
  address: string,
  distance: number,
  rating: Rating,
  lat: number,
  long: number,
  reviews: Review[]
}

export default function TradesmanProfile() {

  const location = useLocation();
  const { taskerId } = location.state;

  // enum state {
  //   loading = 0,
  //   done = 1
  // };

  const emptyTasker: Tasker = {
    name: 'Jason Mimosa',
    description: "Hello! I'm Sam Johnson, a dedicated and passionate gardening amateur based in the beautiful city of Minneapolis. With over 15 years of experience in the gardening and landscaping my own garden, I have honed my skills to transform my outdoor space into a lush, vibrant garden.Let's work together to create the garden of your dreams! Whether you need a complete garden makeover or just a little help with maintenance, I'm here to help. Give me a call or send me an email, and let's get started on your next gardening project.",
    expertises: [
      {
        name: "Lawn Care",
        desc: "I currently tend to several people's gardens, mowing them once a week, as well as watering some people's houseplants."
      },
      {
        name: "Plant Trimming",
        desc: "I also have a plant trimming set, and have sculpted friends and family bushes for about a year now!"
      }
    ],
    why: "I am a kind person, I promise to be exceptionally punctual and forthcoming about my vaccancies and workload. I'll always try my best to give you a well nurtured garden!",
    contact: {
      phone: "(612) 555-1243",
      email: "jasonmimosa1989@gmail.com",
      website: ""
    },
    distance: 1.9,
    address: '54033, Minneapolis, United States',
    lat: 44.921787,
    long: -93.231356,
    rating: {
      punctuality: 3,
      time: 2,
      cost: 2,
      overall: 4
    },
    reviews: [
      {
        reviewerName: 'Mother Theresa',
        ratingAverage: 3,
        title: 'Great',
        desc: 'He was a great help! Always kind and punctual.'
      },
      {
        reviewerName: 'Gengis Khan',
        ratingAverage: 2,
        title: 'Awful Gardener!',
        desc: 'My garden was butchered! This guy doesn\'t know what he is doing! Not Pleased !!!'
      }
    ]
  };

  // const [currentState, setState] = useState(state.loading);
  const [taskerData, setTaskerData] = useState(emptyTasker);

  useEffect(() => {
    api.get('taskers/' + taskerId)
      .then(resp => {
        setTaskerData(resp.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [taskerId]);

  return (
    <div className="TradesmanContainer">
      <div className="TopContainer">
        <Link to="/tradesmanList" style={{ textDecoration: 'none' }}>
          <button className='BackButton'>
            <i className='bi-caret-left'></i>
            Go Back
          </button>
        </Link>
        <div className='ReportProfile'>
          <i className='bi-flag-fill ReportFlag'></i>
          <p className='ReportMessage'>Report</p>
        </div>
      </div>
      <Profile {...taskerData} />
    </div>
  )
}

function StarDisplay({ stars }) {
  var starArr: ReactElement[] = [];
  for (let i = 0; i < stars; i++) {
    starArr.push(
      <div className="golden-star" key={i}>&#9733;</div>
    )
  }
  for (let i = 0; i < 5 - stars; i++) {
    starArr.push(
      <div className="star" key={i + stars}>&#9733;</div>
    )
  }
  return <div className='StarDisplay'> {starArr} </div>
}

function Profile(profile: Tasker) {

  const maxReview = 190;
  const [mapZoom, setMapZoom] = useState(10);

  return (
    <div className="Profile">
      <div className='ProfileHeader'>
        <div className='ProfileName'>{profile.name}</div>
        <div className='ProfileImage'></div>
      </div>
      <div className='ProfileContentContainer'>
        <div className='ProfileContent'>
          <label className='ProfileLabels'>Address :</label>
          <div className='ProfileLocation'>{profile.address}<br /> {profile.distance} km from task</div>
          <label className='ProfileLabels'>About Me :</label>
          <div className='ProfileDescriptionContent'>{profile.description}</div>
          <label className='ProfileLabels'>Expertise :</label>
          <ul className='ProfileExpertise'>
            {profile.expertises.map((item, index) => (
              <li className='ExpertiseItem' key={index}><b>{item.name} </b>{item.desc}</li>
            ))}
          </ul>
          <label className='ProfileLabels'>Why Choose Me :</label>
          <div className='ProfileDescriptionContent'>{profile.why}</div>
          <label className='ProfileLabels'>Contact Me :</label>
          <div className='ProfileLocation'>
            {profile.contact.email !== '' && 'Email : ' + profile.contact.email}
            {profile.contact.email !== '' && < br />}
            {profile.contact.phone !== '' && 'Phone : ' + profile.contact.phone}
            {profile.contact.phone !== '' && < br />}
            {profile.contact.website !== '' && 'Website : ' + profile.contact.website}
          </div>
          <hr></hr>
          <div className='ProfileReviews'>
            <div className='ProfileReviewsHeader'>Top Reviews</div>
            {profile.reviews.map((item, index) => (
              <div className='ProfileReviewElement' key={index}>
                <div className='ProfileReviewLeft'>
                  <div className='ProfileReviewName'>
                    <i className='bi-person-circle'> </i>
                    {item.reviewerName}
                  </div>
                  <div className='ProfileReviewRating'>
                    <StarDisplay stars={item.ratingAverage} />
                  </div>
                </div>
                <div className='VerticalLine'></div>
                <div className='ProfileReviewDesc'>
                  <b>{item.title}</b>
                  <br />
                  {
                    item.desc.length > maxReview ? item.desc.substring(0, maxReview) + '...' : item.desc
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='ProfileStats'>
          <div className='ProfileMaps' onMouseEnter={() => { setMapZoom(14) }} onMouseLeave={() => { setMapZoom(10) }}>
            <APIProvider apiKey={'REMOVED'} onLoad={() => console.log('Maps API has loaded.')}>
              <Map
                id="gmap"
                mapId="8c732c82e4ec29d9"
                zoom={mapZoom}
                defaultCenter={{ lat: profile.lat, lng: profile.long }}
              >
                <AdvancedMarker position={{ lat: profile.lat, lng: profile.long }}>
                  <Pin background={'var(--font-color-secondary)'} glyphColor={'var(--background-primary)'} borderColor={'black'} />
                </AdvancedMarker>
              </Map>
            </APIProvider>
          </div>
          <Ratings {...profile.rating} />
        </div>
      </div>
    </div >
  )
}

function Ratings(ratings: Rating) {
  return (
    <div className='RatingContainer'>
      <div className='RatingElement'>
        <label className='RatingLabel'>Cost</label>
        <StarDisplay stars={ratings.cost} />
      </div>
      <div className='RatingElement'>
        <label className='RatingLabel'>Punctuality</label>
        <StarDisplay stars={ratings.punctuality} />
      </div>
      <div className='RatingElement'>
        <label className='RatingLabel'>Time</label>
        <StarDisplay stars={ratings.time} />
      </div>
      <div className='RatingElement'>
        <label className='RatingLabel'>Overall</label>
        <StarDisplay stars={ratings.overall} />
      </div>
    </div>
  );
}
