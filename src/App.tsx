import React, {useState} from 'react';
import './App.css';
import {PropsTasksType, Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";


export type FilterValuesType = 'All' | 'Active' | 'Completed';

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: PropsTasksType []
}


function App() {

    let todolist1 = v1()
    let todolist2 = v1()


    const [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolist1, title: 'What to learn', filter: 'All'},
        {id: todolist2, title: 'What to buy', filter: 'All'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolist1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
        ],
        [todolist2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Beer', isDone: false},
        ]
    })


    const changeFilterTasks = (value: FilterValuesType, todoID: string) => {
        setTodolist(todolist.map((el) => el.id === todoID ? {...el, filter: value} : el))
    }

    const changeStatus = (id: string, isDone: boolean, todoID: string) => {
        setTasks({...tasks, [todoID]: tasks[todoID].map(el => el.id === id ? {...el, isDone: isDone} : el)})
    }

    const removeTasks = (id: string, todoID: string) => {
        setTasks({...tasks, [todoID]: tasks[todoID].filter(el => el.id !== id)})
    }

    const addTasks = (title: string, todoID: string) => {
        const newTasks: PropsTasksType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoID]: [...tasks[todoID], newTasks]})
    }

    const addTodolist = (title: string) => {
        const todoID = v1()
        const newTodo: TodolistType = {id: todoID, title: title, filter: 'All'}
        setTodolist([newTodo, ...todolist])
        setTasks({...tasks, [todoID]: []})
    }

    const changeTasksTitle = (title: string, id: string, todoID: string) => {
        setTasks({...tasks, [todoID]: tasks[todoID].filter(el => el.id === id ? {...el, title: title} : el)})
    }

    const changeTodolistTitle = (title: string, todoID: string) => {
        setTodolist(todolist.map(el => el.id === todoID ? {...el, title: title} : el))
    }

    const removeTodolist = (todoID: string) => {
        setTodolist(todolist.filter(el => el.id !== todoID))
        delete tasks[todoID]
    }

    return (
        <div className="App">
            <AddItemForm callback={addTodolist}/>

            {todolist.map((todo) => {

                let tasksForFilter = tasks[todo.id]

                if (todo.filter === 'Active') {
                    tasksForFilter = tasks[todo.id].filter((el) => el.isDone === false)
                }
                if (todo.filter === 'Completed') {
                    tasksForFilter = tasks[todo.id].filter((el) => el.isDone === true)
                }

                return <Todolist
                    key={todo.id}
                    todoID={todo.id}
                    title={todo.title}
                    tasks={tasksForFilter}
                    removeTasks={removeTasks}
                    changeFilterTasks={changeFilterTasks}
                    addTasks={addTasks}
                    changeStatus={changeStatus}
                    filter={todo.filter}
                    changeTasksTitle={changeTasksTitle}
                    changeTodolistTitle={changeTodolistTitle}
                    removeTodolist={removeTodolist}
                />
            })}
        </div>
    );
}

export default App;
