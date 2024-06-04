import React, { ReactElement } from 'react';
import './TaskDisplay.css';

import { Map, APIProvider } from '@vis.gl/react-google-maps';

export default function TaskDisplay({ taskData }) {
  return (
    <div className="TaskDisplayPanel">
      <div className="TaskDisplay">
        <TaskInfoPanel taskData={taskData} />
        <TaskLocationPanel />
      </div>
      <TaskRepliesPanel />
    </div>
  );
}

function TaskLocationPanel() {
  return (
    <div className='MapContainer'>
      <APIProvider apiKey={'REMOVED'} onLoad={() => console.log('Maps API has loaded.')}>
        <Map defaultZoom={7.5}
          defaultCenter={{ lat: 38.205542, lng: -28.284108 }}
        >
        </Map>
      </APIProvider>
    </div>
  );
}

function TaskInfoPanel({ taskData }) {
  return (
    <div className="TaskInfoPanel">
      <h1 className="TaskTitle"> {taskData.title} </h1>
      <dd className="TaskDescription">
        {taskData.description}
      </dd>
    </div>
  );
}

function TaskRepliesPanel() {
  return (
    // Conditionally render this depending on # of replies
    <div className="TaskRepliesPanel">
      <h1 className="RepliesHeader">Replies from Taskers!</h1>
      <RepliesSection />
    </div>
  );
}

const repliesData = [
  {
    name: "Casanova Miguel",
    rating: 5
  },
  {
    name: "Brand Grent",
    rating: 4
  },
  {
    name: "Casanova Miguel",
    rating: 5
  },
  {
    name: "Brand Grent",
    rating: 4
  },
  {
    name: "Casanova Miguel",
    rating: 5
  },
  {
    name: "Brand Grent",
    rating: 4
  },
  {
    name: "Casanova Miguel",
    rating: 5
  },
  {
    name: "Brand Grent",
    rating: 4
  },
  {
    name: "Casanova Miguel",
    rating: 5
  },
  {
    name: "Brand Grent",
    rating: 4
  },
  {
    name: "Casanova Miguel",
    rating: 5
  },
  {
    name: "Brand Grent",
    rating: 4
  }
];

function RepliesSection() {
  const replies = repliesData.map((item) => {
    return (
      <div className="ReplyElement" key={item.name}>
        <div className="ReplyNameContainer">
          <div className="ReplyName">
            {item.name}
          </div>
          <div className="StarContainer">
            <StarDisplay number={item.rating} />
          </div>
        </div>
        <div className='Divider'></div>
        <button className='MessageButton'>
          Message
        </button>
      </div>
    );
  })
  return <div className='RepliesContainer'> {replies} </div>
}

function StarDisplay({ number }) {
  var stars: ReactElement[] = [];
  for (let i = 0; i < number; i++) {
    stars.push(
      <div className="GoldenStar Star" key={i + 100}>&#9733;</div>
    )
  }
  for (let i = 0; i < 5 - number; i++) {
    stars.push(
      <div className="BlankStar Star" key={i}>&#9733;</div>
    )
  }
  return <div> {stars} </div>
}