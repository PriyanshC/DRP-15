import './TaskDisplay.css';

export default function TaskDisplay({ taskData }) {
    return (
        <div className="RightContainer">
            <div className="TaskContainer">
                <TaskInfoPanel taskData={taskData} />
                <TaskLocationPanel />
            </div>
            <TaskRepliesPanel />
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

function TaskInfoPanel({ taskData }) {
    return (
        <div className="TaskInfoPanel">
            <h1 className="TaskName"> {taskData.title} </h1>
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
        name: " Casanova",
        rating: 5,
        message: "Hey! I am an experienced gardener from Sao Miguel. I have many clients on the island and would love to add your garden to my clients!"
    },
    {
        name: "Brand Grent",
        rating: 4,
        message: "Hello! I love gardening and would love to get involved!"
    }
];

function RepliesSection() {
    const replies = repliesData.map((item, index) => {
        return (
            <div className="ReplyElement" key={index}>
                <div className="ReplyNameContainer">
                    <label className="ReplyName"> {item.name} </label>
                    <div className="star-rating">
                        <div className="stars-container">
                            <StarDisplay number={item.rating} />
                        </div>
                    </div>
                </div>
                <div className="Divider"></div>
                <div className="ReplyMessageContainer">
                    <dd className="ReplyMessage"> {item.message} </dd>
                </div>
            </div>
        );
    })
    return <div> {replies} </div>
}

function StarDisplay({ number }) {
    var stars = [];
    for (let i = 0; i < 5 - number; i++) {
        stars.push(
            <div className="star" key={i}>&#9733;</div>
        )
    }
    for (let i = 0; i < number; i++) {
        stars.push(
            <div className="golden-star" key={i + 100}>&#9733;</div>
        )
    }
    return <div> {stars} </div>
}