import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "../App";


export type PropsTasksType = {
    id: string,
    title: string,
    isDone: boolean
}


type PropsType = {
    title: string
    tasks: PropsTasksType []
    removeTasks: (id: string) => void
    changeFilterTasks: (value: FilterValuesType) => void
    addTasks: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
}


export const Todolist = (props: PropsType) => {

    const [newTasksTitle, setNewTasksTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTasksTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.charCode === 13 && onclickHandler()
    }

    const onclickHandler = () => {
        if (newTasksTitle.trim() === '') {return}
        props.addTasks(newTasksTitle)
        setNewTasksTitle('')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTasksTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={onclickHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map((el) => {

                    const onClickHandler = () => {
                        props.removeTasks(el.id)
                    }

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(el.id, e.currentTarget.checked)
                    }

                    return (
                        <li key={el.id}>
                            <button onClick={onClickHandler}>X</button>
                            <input type={'checkbox'}
                                   checked={el.isDone}
                                   onChange={onChangeHandler}
                            />
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => props.changeFilterTasks('All')}>All</button>
                <button onClick={() => props.changeFilterTasks('Active')}>Active</button>
                <button onClick={() => props.changeFilterTasks('Completed')}>Completed</button>
            </div>
        </div>
    );
};

