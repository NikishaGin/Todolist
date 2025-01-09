import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "React", isDone: false },
        {id: 2, title: "JS", isDone: true },
        {id: 3, title: "HTMl/CSS", isDone: true },
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter((el)=> el.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter((el)=> el.isDone === true)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const removeTasks = (id: number) => {
        setTasks(tasks.filter((task)=> task.id !== id))
    }

    return (
        <div className="App">
            <Todolist tasks={tasksForTodolist} removeTasks={removeTasks} filteredTasks={changeFilter}/>
        </div>
    );
}

export default App;
