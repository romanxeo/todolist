import React, { useCallback } from 'react';

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskAC} from "./store/tasks-reducer";
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "./store/todolists-reducer";

import {FilterValuesType, TaskType} from './OLD/App';

import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

import {TodoListType} from "./AppWithReduxOne";

import {AddItemForm} from './components/AddItemForm';
import {Buttons} from './components/Buttons';
import EditableSpan from "./components/EditableSpan";
import {TaskWithRedux} from "./TaskWithRedux";


type PropsType = {
    todoListID: string
}

export const TodolistWithReduxTwo = React.memo(function(props: PropsType) {

    let todolist = useSelector<AppRootStateType, TodoListType>(state => state.todolists
        .filter(todolist => todolist.id === props.todoListID)[0])
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListID])
    const dispatch = useDispatch()

    console.log('todolist')

    const addTask = useCallback((newTitle: string) => {
        //создаем экшн и диспатчим его через юзредюсер в редюсер таски
        const action = addTaskAC(props.todoListID, newTitle)
        dispatch(action)
    }, [])

    function changeTodoListTitle(title: string) {
        //создаем экшн и диспатчим его через юзредюсер в редюсер тудулиста
        const action = ChangeTodoListTitleAC(props.todoListID, title)
        dispatch(action)
    }

    function changeTodoListFilter(value: FilterValuesType) {
        //создаем экшн и диспатчим его через юзредюсер в редюсер тудулиста
        const action = ChangeTodoListFilterAC(props.todoListID, value)
        dispatch(action)
    }

    function removeTodoList() {
        //создаем экшн и диспатчим его через юзредюсер в редюсер тудулиста
        const action = RemoveTodoListAC(props.todoListID);
        dispatch(action)
    }

    let tasksForTodolist = tasks;

    if (todolist.filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    return <div>

        <h3>
            <EditableSpan title={todolist.title} changeTitleTask={changeTodoListTitle} />
            <IconButton onClick={ removeTodoList }
                        color={'primary'}
                        size={'small'}
                        style={{color: '#444444'}}
            >
                <Delete/>
            </IconButton>
        </h3>

        <AddItemForm addItem={addTask}/>

        {tasksForTodolist.map((t) => {
            return  <div key={t.id}>
                        <TaskWithRedux todoListID={props.todoListID} taskID={t.id}/>
                    </div>
        })}

        <div>
            <Buttons value = {'all'} filter = {todolist.filter} todoListID={props.todoListID} changeTodoListFilter = {changeTodoListFilter}/>
            <Buttons value = {'active'} filter = {todolist.filter} todoListID={props.todoListID} changeTodoListFilter = {changeTodoListFilter}/>
            <Buttons value = {'completed'} filter = {todolist.filter} todoListID={props.todoListID} changeTodoListFilter = {changeTodoListFilter}/>
        </div>
    </div>
})