import React, {useState} from 'react';
import './App.css';
import {PropsTasksType, Todolist} from "./components/Todolist";
import {v1} from "uuid";


export type FilterValuesType = 'All' | 'Active' | 'Completed';


function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: true},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('All')

    let tasksForFilter = tasks

    if (filter === 'Active') {
        tasksForFilter = tasks.filter((el) => el.isDone === false)
    }
    if (filter === 'Completed') {
        tasksForFilter = tasks.filter((el) => el.isDone === true)
    }

    const removeTasks = (id: string) => {
        setTasks(tasks.filter((el) => el.id !== id))
    }

    const changeFilterTasks = (value: FilterValuesType) => {
        setFilter(value)
    }

    const addTasks = (title: string) => {
        const newTasks: PropsTasksType = {id: v1(), title: title, isDone: false}
        setTasks([newTasks, ...tasks])
    }


    return (
        <div className="App">
            <Todolist title={'What to Learn'}
                      tasks={tasksForFilter}
                      removeTasks={removeTasks}
                      changeFilterTasks={changeFilterTasks}
                      addTasks={addTasks}
            />
        </div>
    );
}

export default App;
