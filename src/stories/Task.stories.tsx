import React from 'react';
import {Meta, Story} from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../Task";

export default {
    title: 'Todolist/Task',
    component: Task,
} as Meta;

const changeTaskStatusCallback = action("Status changed inside Task")
const changeTaskTitleCallback = action("Title changed inside Task")
const removeTaskCallback = action("Remove Button inside Task clicked")

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: "1", isDone: true, title: "JS"},
    todolistId: "todolistId1"
};

export const TaskIsNoteDoneExample = Template.bind({});
TaskIsNoteDoneExample.args = {
    ...baseArgs,
    task: {id: "1", isDone: false, title: "JS"},
    todolistId: "todolistId1"
};
