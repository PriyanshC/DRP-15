import './createTask.css'

function CreateTask() {
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
            style={{ padding: '5px' }}
            type="text"
            className="form-control"
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