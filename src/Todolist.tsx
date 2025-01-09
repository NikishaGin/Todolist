import React from 'react';
import {FilterValuesType} from "./App";

type PropsTasksType = {
    id: number,
    title: string,
    isDone: boolean
}

type PropsType = {
    tasks: PropsTasksType []
    removeTasks: (id: number) => void
    filteredTasks: (value: FilterValuesType) => void
}

export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h1>What to learn</h1>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((task) => {

                    const removeTasksHandler = () => props.removeTasks(task.id)

                    return <li key={task.id}>
                        <button onClick={removeTasksHandler}>X</button>
                        <input type={'checkbox'} checked={task.isDone}/>{task.title}
                    </li>
                })}
            </ul>
            <div>
                <button onClick={() => props.filteredTasks('all')}>All</button>
                <button onClick={() => props.filteredTasks('active')}>Active</button>
                <button onClick={() => props.filteredTasks('completed')}>Completed</button>
            </div>
        </div>
    );
};

