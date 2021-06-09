import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValuesType} from "./state/todolists-reducer";
import {fetchTasksTC} from "./state/tasks-reducer";
import {useDispatch} from "react-redux";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeTodolistFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    filter: FilterValuesType
}

export const Todolist = React.memo((props: PropsType) => {
    console.log("Todolist called")

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    const onAllClickHandler = useCallback(() => props.changeTodolistFilter("all", props.id), [props.changeTodolistFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeTodolistFilter("active", props.id), [props.changeTodolistFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeTodolistFilter("completed", props.id), [props.changeTodolistFilter, props.id])

    const removeTodolist = useCallback(() => props.removeTodolist(props.id), [props.removeTodolist, props.id])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    let tasksForTodolist = props.tasks;

    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {tasksForTodolist.map(t => <Task removeTask={props.removeTask}
                                             changeTaskStatus={props.changeTaskStatus}
                                             changeTaskTitle={props.changeTaskTitle}
                                             task={t}
                                             todolistId={props.id}
                                             key={t.id}
                />
            )}
        </div>
        <div>
            <Button color={"default"} variant={props.filter === "all" ? "contained" : "text"}
                    onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})

