import React from "react";
import "./ratingModal.css";
import { useState } from "react";

export function RatingModal({ setShowModal, taskerName, handleRate }) {
  const [taskHelpDescription, updateDescription] = useState('')

  const [descriptionisValid, setDescriptionValid] = useState(true)
  const [ratingsAreValid, setRatingsAreValid] = useState(true)  

  const [costRating, setCostRating] = useState(-1)
  const [punctualityRating, setPunctualityRating] = useState(-1)
  const [timeRating, setTimeRating] = useState(-1)
  const [overallRating, setOverallRating] = useState(-1)

  return (
    <div className="modalBackground" style={{ position: 'absolute' }}>
      <div className="modalContainer">
        <div className="title">
          <h1> Rate Worker </h1>
        </div>
        <div className="body">
          <label style={{ flex: '1', marginBottom: '10px'}}> Let <b> {taskerName} </b> how they did: </label>
          <textarea type="text" className="ReviewDescription"
            onChange={(e) => updateDescription(e.target.value)}
            style={{ borderWidth: '3px', borderColor: descriptionisValid ? 'var(--accent-color)' : 'crimson' }}
            placeholder="E.g. I thought John did an amazing job, I would recommend him because..." />
          <label className="TaskerRateHeader"> Cost: </label>
          <div className="taskerRate" id='cost-rate'>
              <input className="rate-input" type="radio" onChange={() => setCostRating(5)} />
              <input className="rate-input" type="radio" onChange={() => setCostRating(4)} />
              <input className="rate-input" type="radio" onChange={() => setCostRating(3)} />
              <input className="rate-input" type="radio" onChange={() => setCostRating(2)} />
              <input className="rate-input" type="radio" onChange={() => setCostRating(1)} />
          </div>
          <label className="TaskerRateHeader"> Punctuality: </label>
          <div className="taskerRate" id='punctuality-rate'>
              <input className="rate-input" type="radio" onChange={() => setPunctualityRating(5)} />
              <input className="rate-input" type="radio" onChange={() => setPunctualityRating(4)} />
              <input className="rate-input" type="radio" onChange={() => setPunctualityRating(3)} />
              <input className="rate-input" type="radio" onChange={() => setPunctualityRating(2)} />
              <input className="rate-input" type="radio" onChange={() => setPunctualityRating(1)} />
          </div>
          <label className="TaskerRateHeader"> Time: </label>
          <div className="taskerRate" id='time-rate'>
              <input className="rate-input" type="radio" onChange={() => setTimeRating(5)} />
              <input className="rate-input" type="radio" onChange={() => setTimeRating(4)} />
              <input className="rate-input" type="radio" onChange={() => setTimeRating(3)} />
              <input className="rate-input" type="radio" onChange={() => setTimeRating(2)} />
              <input className="rate-input" type="radio" onChange={() => setTimeRating(1)} />
          </div>
          <label className="TaskerRateHeader"> Overall: </label>
          <div className="taskerRate" id='overall-rate'>
              <input className="rate-input" type="radio" onChange={() => setOverallRating(5)} />
              <input className="rate-input" type="radio" onChange={() => setOverallRating(4)} />
              <input className="rate-input" type="radio" onChange={() => setOverallRating(3)} />
              <input className="rate-input" type="radio" onChange={() => setOverallRating(2)} />
              <input className="rate-input" type="radio" onChange={() => setOverallRating(1)} />
          </div>
        </div>
        <div className="footer">
          <button
            style={{borderWidth: '3px', borderColor: ratingsAreValid ? 'none' : 'crimson'}}
            onClick={() => {
              setShowModal(false);
              document.body.style.overflow = "scroll";
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button
            onClick={() => {

              if (costRating === -1 || punctualityRating === -1 || punctualityRating === -1 || overallRating === -1) {
                setRatingsAreValid(false)
              }

              if (taskHelpDescription.length === 0) {
                (setDescriptionValid(false))
              } else {
                if (ratingsAreValid) {
                  handleRate(taskHelpDescription, costRating, punctualityRating, timeRating, overallRating);
                  setShowModal(false)
                  document.body.style.overflow = "scroll"
                }
              }
            }
            }> Submit </button>
        </div>
      </div>
    </div>
  );
}