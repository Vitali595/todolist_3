import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolists-reducer";
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistAPI,
    UpdateDomainTaskModelType,
    UpdateTaskType
} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

type AddTaskAT = {
    type: 'ADD-TASK'
    task: TaskType
}

type UpdateTaskAT = {
    type: "UPDATE-TASK"
    taskId: string
    model: UpdateDomainTaskModelType
    todolistId: string
}

type SetTasksAT = {
    type: "SET-TASKS",
    tasks: Array<TaskType>,
    todolistId: string
}

type ActionType = RemoveTaskAT
    | AddTaskAT
    | UpdateTaskAT
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodolistsAT
    | SetTasksAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(t => t.id !== action.taskId)
            return stateCopy
            // return {...state, [action.todolistId]: [...state[action.todolistId].filter(t => t.id !== action.taskId)]}
        }

        case "ADD-TASK": {
            let newTask = action.task
            return {...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]]}
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    ...action.model
                } : t)
            }
        }
        case "ADD-TODOLIST": {
            let stateCopy = {
                ...state,
            }
            stateCopy[action.todolist.id] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
    return {
        type: "REMOVE-TASK" as const,
        taskId,
        todolistId
    }
}

export const addTaskAC = (task: TaskType): AddTaskAT => {
    return {type: "ADD-TASK", task}
}

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskAT => {
    return {type: "UPDATE-TASK", taskId, model, todolistId}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksAT => {
    return {type: "SET-TASKS", tasks, todolistId}
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}

export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(todolistId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState()

        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn("task not found in the state")
            return
        }

        const apiModel: UpdateTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            title: task.title,
            ...domainModel
        }
        todolistAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
            })
    }
}