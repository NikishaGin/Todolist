import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = { id: string, title: string, filter: FilterValuesType }
export type PropsTasksType = { id: string, title: string, isDone: boolean }
export type TasksType = {
    [key: string]: PropsTasksType []
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolist, setTodolist] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "HTMl/CSS", isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Beer", isDone: true},
        ],
    })

    const removeTodolist = (todoID: string) => {
        setTodolist(todolist.filter((todo) => todo.id !== todoID))
        delete tasks[todoID]
        setTasks({...tasks})
    }

    const changeFilter = (todoID: string, value: FilterValuesType) => {
        setTodolist(todolist.map((todo) => todo.id === todoID ? {...todo, filter: value} : todo))
    }

    const addTodolist = (title: string) => {
        const newTodoID = v1()
        const newTodo: TodolistType = {id: newTodoID, title: title, filter: 'all'}
        setTodolist([newTodo, ...todolist])
        setTasks({...tasks, [newTodoID]: []})
    }

    const changeTodoTitle = (todoID: string, title: string) => {
        setTodolist(todolist.map(todo => todo.id === todoID ? {...todo, title: title} : todo))
    }

    const removeTasks = (todoID: string, taskID: string) => {
        setTasks({...tasks, [todoID]: tasks[todoID].filter((el) => el.id !== taskID)})
    }

    const addTasks = (todoID: string, title: string) => {
        const newTasks: PropsTasksType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoID]: [...tasks[todoID], newTasks]})
    }

    const changeStatus = (todoID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todoID]: tasks[todoID].map(task => task.id === taskID ? {...task, isDone: isDone} : task)})
    }

    const changeTitleTask = (todoID: string, taskID: string, title: string) => {
        setTasks({...tasks, [todoID]: tasks[todoID].map(task => task.id === taskID ? {...task, title: title} : task)})
    }

    return (
        <div className="App">
            <div>
                <AddItemForm callback={addTodolist}/>
            </div>
            {todolist.map((todo) => {

                let tasksForTodolist = tasks[todo.id]

                if (todo.filter === 'active') {
                    tasksForTodolist = tasks[todo.id].filter(task => !task.isDone)
                }
                if (todo.filter === 'completed') {
                    tasksForTodolist = tasks[todo.id].filter(task => task.isDone)
                }

                return <Todolist key={todo.id}
                                 tasks={tasksForTodolist}
                                 removeTasks={removeTasks}
                                 filteredTasks={changeFilter}
                                 addTasks={addTasks}
                                 changeStatus={changeStatus}
                                 todoTitle={todo.title}
                                 todoID={todo.id}
                                 removeTodolist={removeTodolist}
                                 changeTitleTask={changeTitleTask}
                                 changeTodoTitle={changeTodoTitle}
                />
            })}
        </div>
    );
}

export default App;
