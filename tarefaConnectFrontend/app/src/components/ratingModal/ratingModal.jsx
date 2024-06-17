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
          <label style={{ flex: '1' }}> Let <b> {taskerName} </b> how they did: </label>
          <textarea type="text" className="ReviewDescription"
            onChange={(e) => updateDescription(e.target.value)}
            style={{ borderWidth: '3px', borderColor: descriptionisValid ? 'var(--accent-color)' : 'crimson' }}
            placeholder="E.g. I thought John did an amazing job, I would recommend him because..." />
        </div>
        <label className="TaskerRateHeader"> Cost Rating: </label>
                <div className="taskerRate" id='cost-rate'>
                    <input type="radio" id="star5" name="cost-rate" value="5" onChange={() => setCostRating(5)} />
                    <label htmlFor="star5" title="5 stars"></label>
                    <input type="radio" id="star4" name="cost-rate" value="4" onChange={() => setCostRating(4)} />
                    <label htmlFor="star4" title="4 stars"></label>
                    <input type="radio" id="star3" name="cost-rate" value="3" onChange={() => setCostRating(3)} />
                    <label htmlFor="star3" title="3 stars"></label>
                    <input type="radio" id="star2" name="cost-rate" value="2" onChange={() => setCostRating(2)} />
                    <label htmlFor="star2" title="2 stars"></label>
                    <input type="radio" id="star1" name="cost-rate" value="1" onChange={() => setCostRating(1)} />
                    <label htmlFor="star1" title="1 star"></label>
                </div>
        <label className="TaskerRateHeader"> Punctuality Rating: </label>
                <div className="taskerRate" id='punctuality-rate'>
                    <input type="radio" id="star5" name="punctuality-rate'" value="5" onChange={() => setPunctualityRating(5)} />
                    <label htmlFor="star5" title="5 stars"></label>
                    <input type="radio" id="star4" name="punctuality-rate'" value="4" onChange={() => setPunctualityRating(4)} />
                    <label htmlFor="star4" title="4 stars"></label>
                    <input type="radio" id="star3" name="punctuality-rate'" value="3" onChange={() => setPunctualityRating(3)} />
                    <label htmlFor="star3" title="3 stars"></label>
                    <input type="radio" id="star2" name="punctuality-rate'" value="2" onChange={() => setPunctualityRating(2)} />
                    <label htmlFor="star2" title="2 stars"></label>
                    <input type="radio" id="star1" name="punctuality-rate'" value="1" onChange={() => setPunctualityRating(1)} />
                    <label htmlFor="star1" title="1 star"></label>
                </div>
        <label className="TaskerRateHeader"> Time Rating: </label>
                <div className="taskerRate" id='time-rate'>
                    <input type="radio" id="star5" name="time-rate" value="5" onChange={() => setTimeRating(5)} />
                    <label htmlFor="star5" title="5 stars"></label>
                    <input type="radio" id="star4" name="time-rate" value="4" onChange={() => setTimeRating(4)} />
                    <label htmlFor="star4" title="4 stars"></label>
                    <input type="radio" id="star3" name="time-rate" value="3" onChange={() => setTimeRating(3)} />
                    <label htmlFor="star3" title="3 stars"></label>
                    <input type="radio" id="star2" name="time-rate" value="2" onChange={() => setTimeRating(2)} />
                    <label htmlFor="star2" title="2 stars"></label>
                    <input type="radio" id="star1" name="time-rate" value="1" onChange={() => setTimeRating(1)} />
                    <label htmlFor="star1" title="1 star"></label>
                </div>
        <label className="TaskerRateHeader"> Overall Rating: </label>
                <div className="taskerRate" id='overall-rate'>
                    <input type="radio" id="star5" name="overall-rate'" value="5" onChange={() => setOverallRating(5)} />
                    <label htmlFor="star5" title="5 stars"></label>
                    <input type="radio" id="star4" name="overall-rate'" value="4" onChange={() => setOverallRating(4)} />
                    <label htmlFor="star4" title="4 stars"></label>
                    <input type="radio" id="star3" name="overall-rate'" value="3" onChange={() => setOverallRating(3)} />
                    <label htmlFor="star3" title="3 stars"></label>
                    <input type="radio" id="star2" name="overall-rate'" value="2" onChange={() => setOverallRating(2)} />
                    <label htmlFor="star2" title="2 stars"></label>
                    <input type="radio" id="star1" name="overall-rate'" value="1" onChange={() => setOverallRating(1)} />
                    <label htmlFor="star1" title="1 star"></label>
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

              if (costRating === 0 || punctualityRating === 0 || punctualityRating === 0 || overallRating === 0) {
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