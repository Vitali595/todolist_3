import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
}

type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}

type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return [...state.filter(tl => tl.id !== action.id)]
        }

        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {
                id: action.id,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return {
        type: "REMOVE-TODOLIST" as const,
        id: todolistId
    }
}
export const addTodolistAC = (title: string): AddTodolistAT => {
    return {
        type: "ADD-TODOLIST" as const,
        title,
        id: v1()
    }
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE" as const,
        id: todolistId,
        title
    }
}
export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER" as const,
        filter,
        id: todolistId
    }
}