import React from "react";
import "./Modal.css";
import { useState } from "react";

function Modal({ setShowModal, taskUsername, scrollHeight, handleSubmit }) {
    const [taskHelpDescription, updateDescription] = useState('')
    const [descriptionisValid, setDescriptionValid] = useState(true)

  return (
    <div className="modalBackground" style={{ position: 'absolute', top: (scrollHeight + "px")}}>
      <div className="modalContainer">
        <div className="title">
          <h1> Connect Now! </h1>
        </div>
        <div className="body">
          <label style={{flex:'1'}}> Let <b> {taskUsername} </b> know how you can help out: </label>
          <textarea type="text" className="HelpDescription"
           onChange={(e) => updateDescription(e.target.value)} 
           style={{ borderWidth: '3px', borderColor: descriptionisValid ? 'none' : 'crimson'}}
           placeholder="E.g. Hello there, my name is Jane. I'd love to get involved..." />
        </div>
        <div className="footer">
          <button
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
            if (taskHelpDescription.length === 0) {
                (setDescriptionValid(false))
            } else {
                handleSubmit(taskHelpDescription);
                setShowModal(false)
                document.body.style.overflow = "scroll"
            }
          }
          }>Connect</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;