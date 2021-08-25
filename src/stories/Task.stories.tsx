import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions"
import { Task } from './Task';
import {ReduxStoreProviderDecorator} from "../store/ReduxStoreProviderDecorator";

const changeTaskStatus = action('change task status');
const changeTaskTitle = action('change task title');
const removeTask = action('remove task');

export default {
  title: 'TODOLIST/Task',
  component: Task,
  args: {
    changeTaskStatus: changeTaskStatus,
    changeTaskTitle: changeTaskTitle,
    removeTask: removeTask
  },
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskStoriesPrimary = Template.bind({});
TaskStoriesPrimary.args = {
  todoListID: 'todolistId1',
  taskID: '1'
};
