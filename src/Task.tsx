import React, {ChangeEvent} from 'react';
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditTableSpan} from "./EditTableSpan";

type PropsType = {
    taskID: string
    title: string
    isDone: boolean
    todoID: string
    removeTasks: (todoID: string, taskID: string) => void
    changeStatus: (todoID: string, taskID: string, isDone: boolean) => void
    changeTitleTask: (todoID: string, taskID: string, title: string) => void

}


export const Task = (props: PropsType) => {

    // Удаление Таски
    const onRemoveTaskClick = () => props.removeTasks(props.todoID, props.taskID)

    // Изменения статуса Таски
    const onCheckedHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.todoID, props.taskID, event.currentTarget.checked)
    }
    // Функция изменения навания Таски
    const onChangeTaskTitle = (title: string) => props.changeTitleTask(props.todoID, props.taskID, title)


    return (
        <li>
            <IconButton onClick={onRemoveTaskClick}>
                <Delete/>
            </IconButton>

            <input type={'checkbox'}
                   onChange={onCheckedHandler}
                   checked={props.isDone}
            />

            <EditTableSpan title={props.title} callback={onChangeTaskTitle}/>
        </li>
    );
};

