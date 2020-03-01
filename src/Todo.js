import React, { useState, useEffect } from 'react';
import './Todo.css';


function Task({ task, index, completeTask, removeTask }) {
    return (
        <div
            className="task"
            style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
            <input type="checkbox" checked={task.completed} onClick={() => completeTask(index)}/>
            <span className="todo_item_text"> {task.title}</span>
            <button style={{ background: "red" }} onClick={() => removeTask(index)}>x</button>
        </div>
    );
}

function CreateTask({ addTask }) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTask(value);
        setValue("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                placeholder="Add a new task"
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
}

function Todo(props) {
    const [tasksRemaining, setTasksRemaining] = useState(props.todoContent.tasksRemaining);
    const [tasks, setTasks] = useState(props.todoContent.tasks);

    useEffect(() => { setTasksRemaining(tasks.filter(task => !task.completed).length) }, [tasks]);

    useEffect(() => {
        setTasks(props.todoContent.tasks);
      }, [props.todoContent.tasks]);
     

    const addTask = title => {
        const newTasks = [...tasks, { title, completed: false }];
        setTasks(newTasks);        
        props.taskChanged({tasksRemaining:newTasks.filter(task => !task.completed).length, tasks:newTasks})
    };

    const completeTask = index => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
        props.taskChanged({tasksRemaining:newTasks.filter(task => !task.completed), tasks:newTasks})
    };

    const removeTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
        props.taskChanged({tasksRemaining:newTasks.filter(task => !task.completed), tasks:newTasks})
    };
    return (
        <div className="todo-container">
            <div className="header">Pending tasks ({tasksRemaining})</div>
            <div className="tasks">
                {tasks.map((task, index) => (
                    <Task
                    task={task}
                    index={index}
                    completeTask={completeTask}
                    removeTask={removeTask}
                    key={index}
                    />
                ))}
            </div>
            <div className="create-task" >
                <CreateTask addTask={addTask} />
            </div>
        </div>
    );
}

export default Todo;