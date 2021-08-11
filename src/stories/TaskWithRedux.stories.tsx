import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions"
import { TaskWithRedux } from './TaskWithRedux';
import {ReduxStoreProviderDecorator} from "../store/ReduxStoreProviderDecorator";

const changeTaskStatus = action('change task status');
const changeTaskTitle = action('change task title');
const removeTask = action('remove task');

export default {
  title: 'TODOLIST/TaskWithRedux',
  component: TaskWithRedux,
  args: {
    changeTaskStatus: changeTaskStatus,
    changeTaskTitle: changeTaskTitle,
    removeTask: removeTask
  },
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof TaskWithRedux>;

const Template: ComponentStory<typeof TaskWithRedux> = (args) => <TaskWithRedux {...args} />;

export const TaskStoriesPrimary = Template.bind({});
TaskStoriesPrimary.args = {
  todoListID: 'todolistId1',
  taskID: '1'
};
