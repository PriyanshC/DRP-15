import React from "react";
import { Link } from "react-router-dom"
import './Homepage.css';

export default function Homepage() {
  return (
    <div className="Homepage">
      <div className="TopBackground">
        <div className="TitleCard">
          <div className="TitleContainer">
            <div className="Title TitleFirst">
              Task
            </div>
            <div className="Title TitleSecond">
              Connect
            </div>
          </div>
          <div className="MainListContainer">
            <ul className="MainPointList">
              <li className="MainPoint">Spend more time doing what you love!</li>
              <li className="MainPoint">Give back to the community</li>
              <li className="MainPoint">Make lifelong connections</li>
            </ul>
          </div>
        </div>
        <div className="RedirectMenu">
          <Link to='/login' style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <div className="Redirect RedirectUser">
              <button className="SignInButton"><i className="bi-person-raised-hand"> </i>User Sign In</button>
              <div className="RedirectContent">Click here if you have odd jobs that need doing, and would like to post a task!</div>
            </div>
          </Link>
          <Link to='/workerSignUp' style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <div className="Redirect RedirectWorker">
              <button className="SignInButton"><i className="bi-person-walking"> </i>Worker Sign In</button>
              <div className="RedirectContent">Click here if you would like to connect to your community and help people out!</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="IconDisplay">
        <div className="IconContainer"><i className="bi-patch-question-fill Icon"></i>Our aim here at TaskConnect is to develop long lived and meaningful connections in the community. </div>
        <div className="IconContainer"><i className="bi-calendar2-check-fill Icon"></i>We specialise in repeatable tasks you may be unable to do due to time or physical constraints, i.e weekly lawn mowing or monthly gutter cleaning. </div>
        <div className="IconContainer"><i className="bi-chat-right-dots-fill Icon"></i>Simply post a task and let friendly people in the community come to you, then check out their profiles and connect!</div>
      </div>
    </div>
  );
}