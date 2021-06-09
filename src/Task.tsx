import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "./api/todolist-api";

export type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = (props: TaskPropsType) => {
    const onClickHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newTaskStatus = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newTaskStatus ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }
    const changeTitleHandler = (newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
    }

    return <div key={props.task.id} className={props.task.status ? "is-done" : ""}>
        <Checkbox
            onChange={changeStatusHandler}
            checked={props.task.status === TaskStatuses.Completed}
            color={"primary"}
        />
        <EditableSpan title={props.task.title} onChange={changeTitleHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
}