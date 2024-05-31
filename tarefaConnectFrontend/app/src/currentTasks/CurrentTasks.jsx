import "./style.css"
import CurrentTaskPanel from '../currentTasks/CurrentTaskPanel'
import { useLocation } from 'react-router-dom'

function CurrentTask(props) {
    const location = useLocation()
    const { taskName } = location.state
    return (
        <div className="Container">
            {CurrentTaskPanel()}
            {RightContainer(taskName)}
        </div>
      );
}

function RightContainer(taskName) {
    return (
        <div className="RightContainer">
            {TaskContainer(taskName)}
            {TaskRepliesPanel(taskName)}
        </div>
    );
}

function TaskContainer(taskName) {
    return (
        <div className="TaskContainer">
            {TaskInfoPanel(taskName)}
            {TaskLocationPanel()}
        </div>
    );
}

function TaskLocationPanel() {
    return (
        <div className="TaskLocationPanel">
            <label> LOCATION </label>
        </div>
    );
}

function TaskInfoPanel(taskName) {
    return (
        <div className="TaskInfoPanel">
            <h1 className="TaskName"> {taskName} </h1>
            <dd className="TaskDescription"> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Donec tincidunt quam ultricies tortor gravida, nec malesuada tellus blandit. 
                Nunc imperdiet libero ex, nec malesuada nisl sollicitudin at. 
                Praesent placerat ullamcorper ex, eu eleifend elit varius non. 
                Suspendisse et magna sit amet risus efficitur pulvinar eget id augue.
            </dd>
        </div>
    );
}

function TaskRepliesPanel(taskName) {
    return (
        <div className="TaskRepliesPanel">
            <h1 className="RepliesHeader"> Replies </h1>
           {RepliesSection()}
        </div>
    );
}

const repliesData = [
    {
      name: "Andre Casanova",
      rating: 5,
      message: "Hey! I am an experienced gardener from Sao Miguel. I have many clients on the island and would love to add your garden to my clients!"
    },
    { 
      name: "Brand Grent",
      rating: 4,
      message: "Hello! I love gardening and would love to get involved!"
    }
  ]

function RepliesSection(taskName) {
    const replies = repliesData.map((item) => {
        return (
            <div className="ReplyElement">
                <div className="ReplyNameContainer">
                    <label className="ReplyName"> { item.name } </label>
                    <div class="star-rating">
                        <div class="stars-container">
                            {StarDisplay(item.rating)}
                        </div>
                    </div>
                </div>
                <div className="Divider"></div>
                <div className="ReplyMessageContainer">
                    <dd className="ReplyMessage"> { item.message } </dd>
                </div>
            </div>
        );
    })
    return <div> {replies} </div>
}

function StarDisplay(number) {
    var stars = new Array()
    for (let i=0; i<5-number; i++) {
        stars.push(
            <div class="star">&#9733;</div> 
        )
    }
    for(let i=0; i<number; i++) {
        stars.push(
            <div class="golden-star">&#9733;</div>
        )
    }
    return <div> {stars} </div>
}

export default CurrentTask