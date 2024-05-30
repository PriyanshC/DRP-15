import "./styles.css";
import styles from '../Global';

function CreateTask() {
    const style = styles();

  return (
    <div className="Container">
        {LeftPanel()}
        {RightPanel()}
    </div>
  );
}

function LeftPanel() {
    return <div className="LeftPanel">
        <h1 className="CurrentTaskTitle">
            Your Current Tasks
        </h1>
        <hr></hr>
    </div>;
}

function RightPanel() {
    return (
    <div className="RightPanel">
      <h1 className="CreateTaskTitle">
        Create a New Task
      </h1>
      
      <form>
        <div className="RightPanelElement">
          <label className="FieldLabel">
            Title:
          </label>
          <input
            type="text"
            class="form-control"
            id="TaskTitleField"
            placeholder="title..."
          />
        </div>
        <div className="RightPanelElement">
          <label className="FieldLabel">
            Description:
          </label>
          <textarea className="DescriptionTextArea"
            placeholder="description..."
          />
        </div>
        <div className="RightPanelElement">
          <label className="FieldLabel"> 
            Task Location:
         </label>
        </div>
        <button
        className="PostButton" 
        type="submit">
          Post
        </button>
      </form>
    </div>
    );
}

export default CreateTask;