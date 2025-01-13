import React from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {addTasksAC, changeStatusAC, changeTitleTaskAC, removeTasksAC} from "./tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";

export type PropsTasksType = { id: string, title: string, isDone: boolean }
export type TasksType = {
    [key: string]: PropsTasksType []
}

type PropsType = {
    todoID: string
    filter: FilterValuesType
    todoTitle: string
    filteredTasks: (todoID: string, value: FilterValuesType) => void
    removeTodolist: (todoID: string) => void
    changeTodoTitle: (todoID: string, title: string) => void
}

export const Todolist = (props: PropsType) => {

    const dispatch = useDispatch()

    const tasks = useSelector<AppRootState, PropsTasksType []>(state => state.tasks[props.todoID])

    const removeTasks = (todoID: string, taskID: string) => dispatch(removeTasksAC(todoID, taskID))
    const addTasks = (todoID: string, title: string) => dispatch(addTasksAC(todoID, title))
    const changeStatus = (todoID: string, taskID: string, isDone: boolean) => dispatch(changeStatusAC(todoID, taskID, isDone))
    const changeTitleTask = (todoID: string, taskID: string, title: string) => dispatch(changeTitleTaskAC(todoID, taskID, title))

    // Фильтрация Тасок
    const tasksForTodolist = (() => {
        switch (props.filter) {
            case "active":
                return tasks.filter(task => !task.isDone);
            case "completed":
                return tasks.filter(task => task.isDone);
            default:
                return tasks;
        }
    })();

    // Кнопки фильтрации
    const variantAll = props.filter === 'all' ? 'contained' : "text"
    const onAllClickHandler = () => props.filteredTasks(props.todoID, 'all')

    const variantActive = props.filter === 'active' ? 'contained' : "text"
    const onActiveClickHandler = () => props.filteredTasks(props.todoID, 'active')

    const variantCompleted = props.filter === 'completed' ? 'contained' : "text"
    const onCompletedClickHandler = () => props.filteredTasks(props.todoID, 'completed')


    return (
        <div>
            <h3>
                <EditTableSpan title={props.todoTitle}
                               callback={(title: string) => props.changeTodoTitle(props.todoID, title)}
                />
                <IconButton onClick={() => props.removeTodolist(props.todoID)}>
                    <Delete/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm callback={(title) => addTasks(props.todoID, title)}/>
            </div>
            <ul>
                {tasksForTodolist.map((task) => {
                    return <Task key={task.id}
                                 taskID={task.id}
                                 todoID={props.todoID}
                                 title={task.title}
                                 isDone={task.isDone}
                                 removeTasks={removeTasks}
                                 changeStatus={changeStatus}
                                 changeTitleTask={changeTitleTask}
                    />
                })}
            </ul>
            <div>
                <Button onClick={onAllClickHandler} color="success" variant={variantAll}>All</Button>
                <Button onClick={onActiveClickHandler} color="primary" variant={variantActive}>Active</Button>
                <Button onClick={onCompletedClickHandler} color="secondary" variant={variantCompleted}>Completed</Button>
            </div>
        </div>
    );
};

