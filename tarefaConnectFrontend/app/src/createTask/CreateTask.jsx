import "./styles.css";
import styles from '../Global';
import CurrentTaskPanel from '../currentTasks/CurrentTaskPanel'

function CreateTask() {
    const style = styles();
  return (
    <div className="Container">
        {CurrentTaskPanel()}
        {RightPanel()}
    </div>
  );
}

function RightPanel() {
    return (
    <div className="RightPanel" id="TaskRightPanel">
      <h1 className="CreateTaskTitle">
        Create a New Task
      </h1>
      
      <form>
        <div className="RightPanelElement">
          <label className="FieldLabel">
            Title:
          </label>
          <input
            style={{padding:5}}
            type="text"
            class="form-control"
            id="TaskTitleField"
            placeholder="what do you need?"
          />
        </div>
        <div className="RightPanelElement">
          <label className="FieldLabel">
            Description:
          </label>
          <textarea className="DescriptionTextArea"
            placeholder="tell us a little more..."
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