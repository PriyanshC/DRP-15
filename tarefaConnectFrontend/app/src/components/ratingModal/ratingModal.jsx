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
    // <div className="modalBackground" style={{ position: 'absolute' }}>
      <div className="ratingModalContainer">
        <div className="title">
          <h1> Rate Worker </h1>
        </div>
        <div className="body">
          <label style={{ flex: '1', marginBottom: '10px'}}> Let <b> {taskerName} </b> how they did: </label>
          <textarea type="text" className="ReviewDescription"
            onChange={(e) => updateDescription(e.target.value)}
            style={{ borderWidth: '3px', borderColor: descriptionisValid ? 'var(--accent-color)' : 'crimson' }}
            placeholder="E.g. I thought John did an amazing job, I would recommend him because..." />
          <div className="taskerRate" id='cost-rate'>
            <label className="TaskerRateHeader"> Cost: </label>
            <fieldset className="cost-rating">
              <input id="cost-rate-input-5" name="cost-rate" type="radio" value="5" onChange={() => setCostRating(5)} /><label for="cost-rate-input-5"> 5 </label>
              <input id="cost-rate-input-4" name="cost-rate" type="radio" value="4" onChange={() => setCostRating(4)} /><label for="cost-rate-input-4"> 4 </label>
              <input id="cost-rate-input-3" name="cost-rate" type="radio" value="3" onChange={() => setCostRating(3)} /><label for="cost-rate-input-3"> 3 </label>
              <input id="cost-rate-input-2" name="cost-rate" type="radio" value="2" onChange={() => setCostRating(2)} /><label for="cost-rate-input-2"> 2 </label>
              <input id="cost-rate-input-1" name="cost-rate" type="radio" value="1" onChange={() => setCostRating(1)} /><label for="cost-rate-input-1"> 1 </label>
            </fieldset>
          </div>
          <div className="taskerRate" id='punctuality-rate'>
            <label className="TaskerRateHeader"> Punctuality: </label>
            <fieldset className="punctuality-rating">
              <input id="punctuality-rate-input-5" name="punctuality-rate" type="radio" value="5" onChange={() => setPunctualityRating(5)} /><label for="punctuality-rate-input-5"> 5 </label>
              <input id="punctuality-rate-input-4" name="punctuality-rate" type="radio" value="4" onChange={() => setPunctualityRating(4)} /><label for="punctuality-rate-input-4"> 4 </label>
              <input id="punctuality-rate-input-3" name="punctuality-rate" type="radio" value="3" onChange={() => setPunctualityRating(3)} /><label for="punctuality-rate-input-3"> 3 </label>
              <input id="punctuality-rate-input-2" name="punctuality-rate" type="radio" value="2" onChange={() => setPunctualityRating(2)} /><label for="punctuality-rate-input-2"> 2 </label>
              <input id="punctuality-rate-input-1" name="punctuality-rate" type="radio" value="1" onChange={() => setPunctualityRating(1)} /><label for="punctuality-rate-input-1"> 1 </label>
            </fieldset>
          </div>
          <div className="taskerRate" id='time-rate'>
            <label className="TaskerRateHeader"> Time: </label>
            <fieldset className="time-rating">
              <input id="time-rate-input-5" name="time-rate" type="radio" value="5" onChange={() => setTimeRating(5)} /><label for="time-rate-input-5"> 5 </label>
              <input id="time-rate-input-4" name="time-rate" type="radio" value="4" onChange={() => setTimeRating(4)} /><label for="time-rate-input-4"> 4 </label>
              <input id="time-rate-input-3" name="time-rate" type="radio" value="3" onChange={() => setTimeRating(3)} /><label for="time-rate-input-3"> 3 </label>
              <input id="time-rate-input-2" name="time-rate" type="radio" value="2" onChange={() => setTimeRating(2)} /><label for="time-rate-input-2"> 2 </label>
              <input id="time-rate-input-1" name="time-rate" type="radio" value="1" onChange={() => setTimeRating(1)} /><label for="time-rate-input-1"> 1 </label>
            </fieldset>
          </div>
          <div className="taskerRate" id='overall-rate'>
            <label className="TaskerRateHeader"> Overall: </label>
            <fieldset className="overall-rating">
              <input id="overall-rate-input-5" name="overall-rate" type="radio" value="5" onChange={() => setOverallRating(5)} /><label for="overall-rate-input-5"> 5 </label>
              <input id="overall-rate-input-4" name="overall-rate" type="radio" value="4" onChange={() => setOverallRating(4)} /><label for="overall-rate-input-4"> 4 </label>
              <input id="overall-rate-input-3" name="overall-rate" type="radio" value="3" onChange={() => setOverallRating(3)} /><label for="overall-rate-input-3"> 3 </label>
              <input id="overall-rate-input-2" name="overall-rate" type="radio" value="2" onChange={() => setOverallRating(2)} /><label for="overall-rate-input-2"> 2 </label>
              <input id="overall-rate-input-1" name="overall-rate" type="radio" value="1" onChange={() => setOverallRating(1)} /><label for="overall-rate-input-1"> 1 </label>

            </fieldset>
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
                console.log("ratings not allowed")
                setRatingsAreValid(false)
              } else {
                if (taskHelpDescription.length === 0) {
                  (setDescriptionValid(false))
                } else {
                    handleRate(taskHelpDescription, costRating, punctualityRating, timeRating, overallRating);
                    setShowModal(false)
                    document.body.style.overflow = "scroll"
                }
              }
            }
            }> Submit </button>
        </div>
      </div>
    // </div>
  );
}