import "../App.css";
import { useState } from "react";

function Task() {
    const [tasks, setTasks] = useState([]);
    const [note, setNote] = useState("");

    const addTask = (event) => {
        //Doesn't refresh on submit form
        event.preventDefault();

        //If note is blank, stop here!
        if (note.trim().length <= 0) {
            return;
        }

        //Prepend task in existing tasks array
        setTasks([{ note: note, completed: false }, ...tasks]);
        //Clear input field
        setNote("");
    };

    const renderTaskItem = (item, index) => {
        return (
            <li key={index} className="task-item">
                <input type="checkbox" checked={item.completed} />
                {item.note}
            </li>
        );
    };

    return (
        <div className="container">
            <h1 className="header">Shopping List</h1>
            <form className="form" onSubmit={addTask}>
                <input className="input" type="text" placeholder="Create new task" value={note} onChange={(event) => setNote(event.target.value)} />
                <button type="submit" className="button">
                    Add
                </button>
            </form>
            <ul className="todo-list">{tasks.map(renderTaskItem)}</ul>
        </div>
    );
}

export default Task;
