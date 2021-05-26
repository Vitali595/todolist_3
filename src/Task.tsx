import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = (props: TaskPropsType) => {
    const onClickHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }
    const changeTitleHandler = (newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
    }

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            onChange={changeStatusHandler}
            checked={props.task.isDone}
            color={"primary"}
        />
        <EditableSpan title={props.task.title} onChange={changeTitleHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
}