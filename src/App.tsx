import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";


export type FilterValuesType = 'All' | 'Active' | 'Completed';


function App() {

    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'React', isDone: true},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('All')

    let tasksForFilter = tasks

    if (filter === 'Active') {
        tasksForFilter = tasks.filter((el) => el.isDone === false)
    }
    if (filter === 'Completed') {
        tasksForFilter = tasks.filter((el) => el.isDone === true)
    }

    const removeTasks = (id: number) => {
        setTasks(tasks.filter((el) => el.id !== id))
    }

    const changeFilterTasks = (value: FilterValuesType) => {
        setFilter(value)
    }


    return (
        <div className="App">
            <Todolist title={'What to Learn'}
                      tasks={tasksForFilter}
                      removeTasks={removeTasks}
                      changeFilterTasks={changeFilterTasks}
            />
        </div>
    );
}

export default App;
