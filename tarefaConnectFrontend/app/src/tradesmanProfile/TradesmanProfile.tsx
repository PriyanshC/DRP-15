import { Link, useLocation } from 'react-router-dom';
import './TradesmanProfile.css'
import React, { ReactElement, useEffect, useState } from 'react';
import { api } from '../App.tsx';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

interface Rating {
  punctuality: number,
  time_taken: number,
  value_for_money: number,
  overall_rating: number
}

interface Review {
  comment: string
}

interface Expertise {
  title: string,
  description: string
}

interface User {
  email: string,
  forename: string,
  surname: string,
  post_code: string,
  id: number,
  hashed_password: string,
  rating: number
}

interface Tasker {
  headline: string,
  user: User,
  rating: Rating,
  expertise: Expertise[],
  reviews: Review[]
}

export default function TradesmanProfile({ isTasker }) {

  const location = useLocation();
  const { taskerId, pageFrom } = location.state;

  // enum state {
  //   loading = 0,
  //   done = 1
  // };

  const emptyTasker: Tasker = {
    headline: '',
    user: {
      email: '',
      forename: '',
      surname: '',
      post_code: '',
      id: 0,
      hashed_password: '',
      rating: 0
    },
    rating: {
      punctuality: 0,
      time_taken: 0,
      value_for_money: 0,
      overall_rating: 0
    },
    expertise: [],
    reviews: []
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
        <Link to={pageFrom} style={{ textDecoration: 'none' }}>
          <button className='BackButton'>
            <i className='bi-caret-left'></i>
            Go Back
          </button>
        </Link>
      </div>
      <Profile profile={taskerData} isTasker={isTasker} />
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

function Profile({profile, isTasker}) {

  const maxReview = 190;
  const [mapZoom, setMapZoom] = useState(10);

  return (
    <div className="Profile">
      <div className='ProfileHeader'>
        <div className='ProfileName'>{profile.user.forename + ' ' + profile.user.surname}</div>
        <div className='ProfileImage'></div>
      </div>
      <div className='ProfileContentContainer'>
        <div className='ProfileContent'>
          <label className='ProfileLabels'>Address :</label>
          <div className='ProfileLocation'>{profile.user.post_code}<br /> {3.8} km from task</div>
          <label className='ProfileLabels'>About Me :</label>
          <div className='ProfileDescriptionContent'>{profile.headline}</div>
          <label className='ProfileLabels'>Expertise :</label>
          <ul className='ProfileExpertise'>
            {profile.expertise.map((item, index) => (
              <li className='ExpertiseItem' key={index}><b>{item.title} </b>{item.description}</li>
            ))}
          </ul>
          <label className='ProfileLabels'>Why Choose Me :</label>
          <div className='ProfileDescriptionContent'>I am a committed and hardworking individual, and will never be late!</div>
          <label className='ProfileLabels'>Contact Me :</label>
          <div className='ProfileLocation'>
            {profile.user.email !== '' && 'Email : ' + profile.user.email}
            {profile.user.email !== '' && < br />}
            {/* {profile.contact.phone !== '' && 'Phone : ' + profile.contact.phone}
            {profile.contact.phone !== '' && < br />}
            {profile.contact.website !== '' && 'Website : ' + profile.contact.website} */}
          </div>
          <hr></hr>
          <div className='ProfileReviews'>
            <div className='ProfileReviewsHeader'>Top Reviews</div>
            {profile.reviews.map((item, index) => (
              <div className='ProfileReviewElement' key={index}>
                <div className='ProfileReviewLeft'>
                  <div className='ProfileReviewName'>
                    <i className='bi-person-circle'> </i>
                    Reviewer
                  </div>
                  <div className='ProfileReviewRating'>
                    <StarDisplay stars={3} />
                  </div>
                </div>
                <div className='VerticalLine'></div>
                <div className='ProfileReviewDesc'>
                  <b>Comment :</b>
                  <br />
                  {
                    item.comment.length > maxReview ? item.comment.substring(0, maxReview) + '...' : item.comment
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
                defaultCenter={{ lat: 44.921787, lng: -59 }}
              >
                <AdvancedMarker position={{ lat: 44.921787, lng: -59 }}>
                  <Pin background={'var(--font-color-secondary)'} glyphColor={'var(--background-primary)'} borderColor={'black'} />
                </AdvancedMarker>
              </Map>
            </APIProvider>
          </div>
          <Ratings {...profile.rating} />
        </div>
        <div>
          <RateButton isTasker={isTasker} />
        </div>
      </div>
    </div >
  )
}

function RateButton({isTasker}) {
  return (
    isTasker ? <button> Rate </button> : null
  )
}

function Ratings(ratings: Rating) {
  return (
    <div className='RatingContainer'>
      <div className='RatingElement'>
        <label className='RatingLabel'>Cost</label>
        <StarDisplay stars={ratings.value_for_money} />
      </div>
      <div className='RatingElement'>
        <label className='RatingLabel'>Punctuality</label>
        <StarDisplay stars={ratings.punctuality} />
      </div>
      <div className='RatingElement'>
        <label className='RatingLabel'>Time</label>
        <StarDisplay stars={ratings.time_taken} />
      </div>
      <div className='RatingElement'>
        <label className='RatingLabel'>Overall</label>
        <StarDisplay stars={ratings.overall_rating} />
      </div>
    </div>
  );
}
