import React, { ReactElement, useEffect, useState } from 'react';

import { api } from '../../App.tsx';
import './TaskDisplay.css';

import GmapsApi from '../../components/location/GmapsApi.tsx';
import { Link } from 'react-router-dom';

interface Rating {
  number_ratings: 0,
  overall_rating: 0,
  punctuality: 0,
  time_taken: 0,
  value_for_money: 0
}

interface TaskReply {
  tasker_id: number,
  tasker_forename: string,
  tasker_surname: string,
  rating: Rating,
  message: string
}

interface TaskData {
  id: number,
  title: string,
  description: string
}

export default function TaskDisplay(props: TaskData) {
  return (
    <div className="TaskDisplayPanel">
      <div className="TaskDisplay">
        <TaskInfoPanel {...props} />
        <div className='MapContainer'><GmapsApi /></div>
      </div>
      <TaskRepliesPanel task_id={props.id} />
    </div>
  );
}

function TaskInfoPanel({ title, description }: TaskData) {
  return (
    <div className="TaskInfoPanel">
      <h1 className="TaskTitle"> {title} </h1>
      <dd className="TaskDescription">
        {description}
      </dd>
    </div>
  );
}

function TaskRepliesPanel({ task_id }) {
  return (
    // Conditionally render this depending on # of replies
    <div className="TaskRepliesPanel">
      <h1 className="RepliesHeader">Replies from Taskers!</h1>
      <RepliesSection task_id={task_id} />
    </div>
  );
}

function RepliesSection({ task_id }) {


  const emptyReplies: TaskReply[] = []
  const [repliesData, setRepliesData] = useState(emptyReplies);


  const getReplies = (taskId: number) => {
    console.log('Getting Task Replies API');
    api.get('tasks/' + taskId + '/replies')
      .then(resp => {
        setRepliesData(resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    getReplies(task_id);
  }, [task_id])

  const maxContentChars = 65;

  const replies = repliesData.map((item, index) => {
    const aveRating = Math.round((item.rating.overall_rating + item.rating.punctuality + item.rating.time_taken + item.rating.value_for_money) / 4);
    return (
      <div className="ReplyElement" key={item.tasker_id} >
        <div className="ReplyNameContainer">
          <div className="ReplyName">
            {item.tasker_forename + " " + item.tasker_surname}
          </div>
          <div className="StarContainer">
            <StarDisplay number={aveRating} />
          </div>
        </div>
        <div className='Divider'></div>
        <div className='ReplyContent'>{item.message.length > maxContentChars ? item.message.substring(0, maxContentChars - 3) + '...' : item.message}</div>
        <div className='Divider'></div>
        <Link to={'/tradesmanProfile'} state={{ taskerId: item.tasker_id, pageFrom: '/task', task_id: task_id }} style={{
          color: 'inherit'
        }}>
          < button className='MessageButton' >
            See More
          </button>
        </Link>
      </div >
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