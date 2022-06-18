import "../App.css";
import { useEffect, useState } from "react";
import TodoApi from "../api/TodoApi";

function Task() {
    const [tasks, setTasks] = useState([]);
    const [note, setNote] = useState("");

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const data = await TodoApi.getAll();
        setTasks(data);
    };

    const addTask = async () => {
        if (note.trim().length <= 0) {
            return;
        }
        await TodoApi.add({ note: note, completed: false });
        await loadTasks();

        //Clear input field
        setNote("");
    };

    const handleCompleted = async (task) => {
        await TodoApi.update(task);
        await loadTasks();
    };

    const removeTask = async (id) => {
        await TodoApi.remove(id);
        await loadTasks();
    };

    const renderTaskItem = (item, index) => {
        return (
            <li key={index} className="task-item">
                <div className="task-info" onClick={(event) => handleCompleted({ ...item, completed: !item.completed })}>
                    <span className="material-icons task-checked">{item.completed ? "check_box" : "check_box_outline_blank"}</span>
                    <span className={item.completed ? "task-completed" : ""}>{item.note}</span>
                </div>
                <button className="task-item-remove" onClick={(event) => removeTask(item.id)}>
                    Del
                </button>
            </li>
        );
    };

    return (
        <div className="container">
            <h1 className="header">Shopping List</h1>
            <form
                className="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    addTask();
                }}
            >
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
