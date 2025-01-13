import {FilterValuesType, TodolistType} from "./App";
import {v1} from "uuid";

export type combineActionTypeTodolist = removeTodolistActionType
    | changeFilterACType
    | changeTodoTitleACType
    | addTodolistACType

export const todolistID1 = v1()
export const todolistID2 = v1()

const initialState: TodolistType [] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'}
];

export const todolistReducer = (state: TodolistType [] = initialState, action: combineActionTypeTodolist): TodolistType [] => {
    switch (action.type) {
        case 'REMOVE-TODO':
            return state.filter(todo => todo.id !== action.todoID)
        case 'CHANGE-FILTER':
            return state.map(todo => todo.id === action.todoID ? {...todo, filter: action.value} : todo)
        case "CHANGE-TODO-TITLE":
            return state.map(todo => todo.id === action.todoID ? {...todo, title: action.title} : todo)
        case "ADD-TODO":
            const newTodo: TodolistType = {id: action.todoID, title: action.title, filter: 'all'}
            return [newTodo, ...state]
        default:
            return state
    }
}

export type removeTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type changeFilterACType = ReturnType<typeof changeFilterAC>
export type changeTodoTitleACType = ReturnType<typeof changeTodoTitleAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>

export const removeTodolistAC = (todoID: string) => {
    return {type: 'REMOVE-TODO', todoID: todoID} as const
}

export const changeFilterAC = (todoID: string, value: FilterValuesType) => {
    return {type: 'CHANGE-FILTER', todoID: todoID, value: value} as const
}

export const changeTodoTitleAC = (todoID: string, title: string) => {
    return {type: 'CHANGE-TODO-TITLE', todoID: todoID, title: title} as const
}

export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODO', todoID: v1(), title: title} as const
}


