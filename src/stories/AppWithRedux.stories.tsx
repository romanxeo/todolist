import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions"
import  AppWithRedux  from './AppWithReduxOne';
import {ReduxStoreProviderDecorator} from "../store/ReduxStoreProviderDecorator";


export default {
  title: 'TODOLIST/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = () => <AppWithRedux />;

export const AppWithReduxPrimary = Template.bind({});
AppWithReduxPrimary.args = {};


