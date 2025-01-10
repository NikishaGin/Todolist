import React, {ChangeEvent, useState, KeyboardEvent, MouseEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import {FilterValuesType, PropsTasksType} from "./App";


type PropsType = {
    tasks: PropsTasksType []
    removeTasks: (todoID: string, taskID: string) => void
    filteredTasks: (todoID: string, value: FilterValuesType) => void
    addTasks: (todoID: string, title: string) => void
    changeStatus: (todoID: string, taskID: string, isDone: boolean) => void
    todoTitle: string
    todoID: string
    removeTodolist: (todoID: string) => void
}

export const Todolist = (props: PropsType) => {

    const [title, setTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    // Добавление таски по клавише Enter
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => event.charCode === 13 && addTasksHandler()

    // Проверяем что поле ввода не пустое перед добавлением таски
    const addTasksHandler = () => {
        title.trim() !== '' && props.addTasks(props.todoID, title)
        setTitle('')
    }

    // Кнопки фильтрации
    const onAllClickHandler = () => props.filteredTasks(props.todoID, 'all')
    const onActiveClickHandler = () => props.filteredTasks(props.todoID, 'active')
    const onCompletedClickHandler = () => props.filteredTasks(props.todoID, 'completed')

    return (
        <div>
            <h3>
                {props.todoTitle}
                <button onClick={() => props.removeTodolist(props.todoID)}>X</button>
            </h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTasksHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map((task) => {

                    const onRemoveHandler = () => props.removeTasks(props.todoID, task.id)

                    const onCheckedHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(props.todoID, task.id, event.currentTarget.checked)
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
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};

