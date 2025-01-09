import React, {useState} from 'react';
import './App.css';
import {PropsTasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<PropsTasksType[]>([
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "HTMl/CSS", isDone: true},
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')

    const filterTasks = (filter: FilterValuesType) => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.isDone);
            case 'completed':
                return tasks.filter(task => task.isDone);
            default:
                return tasks;
        }
    };

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const removeTasks = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const addTasks = (title: string) => {
        const newTasks = {id: v1(), title: title, isDone: false}
        setTasks([...tasks, newTasks])
    }

    const changeStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, isDone: isDone } : task));
    }

    return (
        <div className="App">
            <Todolist tasks={filterTasks(filter)}
                      removeTasks={removeTasks}
                      filteredTasks={changeFilter}
                      addTasks={addTasks}
                      checkedTasks={changeStatus}
            />
        </div>
    );
}

export default App;
