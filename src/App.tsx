import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";
import {addTodolistAC, changeFilterAC, changeTodoTitleAC, removeTodolistAC} from "./todolist-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = { id: string, title: string, filter: FilterValuesType }

function App() {

    const dispatch = useDispatch()

    const todolist = useSelector<AppRootState, TodolistType[]>(state => state.todolist)

    const removeTodolist = (todoID: string) => dispatch(removeTodolistAC(todoID))
    const changeFilter = (todoID: string, value: FilterValuesType) => dispatch(changeFilterAC(todoID, value))
    const addTodolist = (title: string) => dispatch(addTodolistAC(title))
    const changeTodoTitle = (todoID: string, title: string) => dispatch(changeTodoTitleAC(todoID, title))

    return (
        <div className="App">
            <div>
                <AddItemForm callback={addTodolist}/>
            </div>
            {todolist.map((todo) => {
                return <Todolist key={todo.id}
                                 todoID={todo.id}
                                 filter={todo.filter}
                                 todoTitle={todo.title}
                                 filteredTasks={changeFilter}
                                 removeTodolist={removeTodolist}
                                 changeTodoTitle={changeTodoTitle}
                />
            })}
        </div>
    );
}

export default App;
