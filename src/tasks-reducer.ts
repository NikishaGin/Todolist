import {} from "./App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistActionType, todolistID1, todolistID2} from "./todolist-reducer";
import {PropsTasksType, TasksType} from "./Todolist";


export type combineActionTypeTasks = removeTasksACType
    | addTasksACType
    | changeStatusACType
    | changeTitleTaskACType
    | addTodolistACType
    | removeTodolistActionType

const initialState: TasksType = {
    [todolistID1]: [
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "HTMl/CSS", isDone: true},
    ],
    [todolistID2]: [
        {id: v1(), title: "Milk", isDone: false},
        {id: v1(), title: "Beer", isDone: true},
    ],
}

export const tasksReducer = (state: TasksType = initialState, action: combineActionTypeTasks): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASKS':
            return {...state, [action.todoID]: state[action.todoID].filter(task => task.id !== action.tasksID)}
        case "ADD-TASKS":
            const newTasks: PropsTasksType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todoID]: [...state[action.todoID], newTasks]}
        case "CHANGE-STATUS":
            return {
                ...state, [action.todoID]:
                    state[action.todoID].map(task => task.id === action.tasksID
                        ? {...task, isDone: action.isDone} : task)
            }
        case "CHANGE-TITLE-TASK":
            return {
                ...state, [action.todoID]:
                    state[action.todoID].map(task => task.id === action.tasksID
                        ? {...task, title: action.title} : task)
            }
        case "ADD-TODO":
            return {...state, [action.todoID]: []}
        case "REMOVE-TODO":
            let stateCopy = {...state}
            delete stateCopy[action.todoID]
            return stateCopy
        default:
            return state
    }
}


export type removeTasksACType = ReturnType<typeof removeTasksAC>
export type addTasksACType = ReturnType<typeof addTasksAC>
export type changeStatusACType = ReturnType<typeof changeStatusAC>
export type changeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>

export const removeTasksAC = (todoID: string, tasksID: string) => {
    return {type: 'REMOVE-TASKS', todoID: todoID, tasksID: tasksID} as const
}

export const addTasksAC = (todoID: string, title: string) => {
    return {type: 'ADD-TASKS', todoID: todoID, title: title} as const
}

export const changeStatusAC = (todoID: string, tasksID: string, isDone: boolean) => {
    return {type: 'CHANGE-STATUS', todoID: todoID, tasksID: tasksID, isDone: isDone} as const
}

export const changeTitleTaskAC = (todoID: string, tasksID: string, title: string) => {
    return {type: 'CHANGE-TITLE-TASK', todoID: todoID, tasksID: tasksID, title: title} as const
}