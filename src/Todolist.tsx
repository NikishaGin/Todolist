import React, {ChangeEvent, useState, KeyboardEvent, MouseEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import {FilterValuesType} from "./App";

export type PropsTasksType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    tasks: PropsTasksType []
    removeTasks: (id: string) => void
    filteredTasks: (value: FilterValuesType) => void
    addTasks: (title: string) => void
    checkedTasks: (id: string, isDone: boolean) => void
}

export const Todolist = (props: PropsType) => {

    const [title, setTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => event.charCode === 13 && addTasksHandler()

    const addTasksHandler = () => {
        props.addTasks(title)
        setTitle('')
    }

    return (
        <div>
            <h1>What to learn</h1>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTasksHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map((task) => {

                    const onRemoveHandler = () => props.removeTasks(task.id)

                    const onCheckedHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.checkedTasks(task.id, event.currentTarget.checked)
                    }

                    return <li key={task.id}>
                        <button onClick={onRemoveHandler}>X</button>
                        <input type={'checkbox'}
                               onChange={onCheckedHandler}
                               checked={task.isDone}
                        />
                        {task.title}
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

