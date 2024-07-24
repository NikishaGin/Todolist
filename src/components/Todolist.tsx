import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type PropsTasksType = {
    id: string,
    title: string,
    isDone: boolean
}


type PropsType = {
    title: string
    tasks: PropsTasksType []
    removeTasks: (id: string, todoID: string) => void
    changeFilterTasks: (value: FilterValuesType, todoID: string) => void
    addTasks: (title: string, todoID: string) => void
    changeStatus: (id: string, isDone: boolean, todoID: string) => void
    filter: FilterValuesType
    todoID: string
    changeTasksTitle: (title: string, id: string, todoID: string) => void
    changeTodolistTitle: (title: string, todoID: string) => void
    removeTodolist: (todoID: string) => void
}


export const Todolist = (props: PropsType) => {


    const addTasksHandler = (title: string) => {
        props.addTasks(title, props.todoID)
    }

    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(title, props.todoID)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todoID)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callback={changeTodolistTitleHandler}/>
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <AddItemForm callback={addTasksHandler}/>
            <ul>
                {props.tasks.map((el) => {

                    const onClickHandler = () => {
                        props.removeTasks(el.id, props.todoID)
                    }

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(el.id, e.currentTarget.checked, props.todoID)
                    }

                    const changeTasksTitleHandler = (title: string) => {
                        props.changeTasksTitle(title, el.id, props.todoID)
                    }

                    return (
                        <li key={el.id}>
                            <button onClick={onClickHandler}>X</button>
                            <input type={'checkbox'}
                                   checked={el.isDone}
                                   onChange={onChangeHandler}
                            />
                            <EditableSpan title={el.title} callback={changeTasksTitleHandler}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => props.changeFilterTasks('All', props.todoID)}>All</button>
                <button onClick={() => props.changeFilterTasks('Active', props.todoID)}>Active</button>
                <button onClick={() => props.changeFilterTasks('Completed', props.todoID)}>Completed</button>
            </div>
        </div>
    );
};

