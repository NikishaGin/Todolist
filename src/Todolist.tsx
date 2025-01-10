import React, {ChangeEvent} from 'react';
import {FilterValuesType, PropsTasksType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";


type PropsType = {
    tasks: PropsTasksType []
    removeTasks: (todoID: string, taskID: string) => void
    filteredTasks: (todoID: string, value: FilterValuesType) => void
    addTasks: (todoID: string, title: string) => void
    changeStatus: (todoID: string, taskID: string, isDone: boolean) => void
    todoTitle: string
    todoID: string
    removeTodolist: (todoID: string) => void
    changeTitleTask: (todoID: string, taskID: string, title: string) => void
    changeTodoTitle: (todoID: string, title: string) => void
}

export const Todolist = (props: PropsType) => {

    // Функция изменения навания Тудулиста
    const onChangeTodoTitle = (title: string) => props.changeTodoTitle(props.todoID, title)

    // Функция удаления Тудулиста
    const onRemoveTodoClick = () => props.removeTodolist(props.todoID)

    // Функция добавления Таски
    const onAddTasksClick = (title: string) => props.addTasks(props.todoID, title)

    // Кнопки фильтрации
    const onAllClickHandler = () => props.filteredTasks(props.todoID, 'all')
    const onActiveClickHandler = () => props.filteredTasks(props.todoID, 'active')
    const onCompletedClickHandler = () => props.filteredTasks(props.todoID, 'completed')


    return (
        <div>
            <h3>
                <EditTableSpan title={props.todoTitle} callback={onChangeTodoTitle}/>
                <button onClick={onRemoveTodoClick}>X</button>
            </h3>
            <div>
                <AddItemForm callback={onAddTasksClick}/>
            </div>
            <ul>
                {props.tasks.map((task) => {

                    // Удаление Таски
                    const onRemoveHandler = () => props.removeTasks(props.todoID, task.id)

                    // Изменения статуса Таски
                    const onCheckedHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(props.todoID, task.id, event.currentTarget.checked)
                    }

                    // Функция изменения навания Таски
                    const onChangeTaskTitle = (title: string) => props.changeTitleTask(props.todoID, task.id, title)

                    return <li key={task.id}>
                        <button onClick={onRemoveHandler}>X</button>
                        <input type={'checkbox'}
                               onChange={onCheckedHandler}
                               checked={task.isDone}
                        />
                        <EditTableSpan title={task.title} callback={onChangeTaskTitle}/>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};

