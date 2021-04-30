import {FilterValuesType, TasksStateType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

type addTaskAT = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

type changeTaskStatusAT = {
    type: 'CHANGE-TODOLIST-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

type changeTaskTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    taskId: string
    title: string
    todolistId: string
}

type ActionType = RemoveTaskAT
    | addTaskAT
    | changeTaskStatusAT
    | changeTaskTitleAT
    | AddTodolistAT
    | RemoveTodolistAT

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(t => t.id !== action.taskId)
            return stateCopy
            // return {...state, [action.todolistId]: [...state[action.todolistId].filter(t => t.id !== action.taskId)]}
        }

        case "ADD-TASK": {
            let newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case "CHANGE-TODOLIST-STATUS": {
            let stateCopy = {...state}
            let updateTasks = stateCopy[action.todolistId].map(t => t.id === action.taskId ? {
                ...t,
                isDone: action.isDone
            } : t)
            return {...stateCopy, [action.todolistId]: updateTasks}
        }
        case "CHANGE-TODOLIST-TITLE": {
            let stateCopy = {...state}
            let updateTasks = stateCopy[action.todolistId].map(t => t.id === action.taskId ? {
                ...t,
                title: action.title
            } : t)
            return {...stateCopy, [action.todolistId]: updateTasks}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.id]: []}
        }
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
    return {
        type: "REMOVE-TASK" as const,
        taskId,
        todolistId
    }
}
export const addTaskAC = (title: string, todolistId: string): addTaskAT => {
    return {
        type: "ADD-TASK" as const,
        title,
        todolistId
    }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusAT => {
    return {
        type: "CHANGE-TODOLIST-STATUS" as const,
        taskId,
        isDone,
        todolistId
    }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE" as const,
        taskId,
        title,
        todolistId
    }
}