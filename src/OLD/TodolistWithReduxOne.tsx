import React, {ChangeEvent} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {addTaskAC, changeTaskStatusAC, changeTitleTaskAC, removeTaskAC} from "../store/tasks-reducer";
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "../store/todolists-reducer";

import {FilterValuesType, TaskType} from './App';

import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

import {TodoListType} from "../AppWithReduxOne";

import {AddItemForm} from '../components/AddItemForm';
import {Buttons} from '../components/Buttons';
import EditableSpan from "../components/EditableSpan";


type PropsType = {
    todoListID: string
}

export function TodolistWithReduxOne(props: PropsType) {

    let todolist = useSelector<AppRootStateType, TodoListType>(state => state.todolists
        .filter(todolist => todolist.id === props.todoListID)[0])
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListID])
    const dispatch = useDispatch()

    console.log(todolist)
    console.log(tasks)

    function addTask(newTitle: string) {
        //создаем экшн и диспатчим его через юзредюсер в редюсер таски
        const action = addTaskAC(props.todoListID, newTitle)
        dispatch(action)
    }

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

            function removeTask() {
                //создаем экшн и диспатчим его через юзредюсер в редюсер таски
                const action = removeTaskAC(t.id, props.todoListID)
                dispatch(action)
            }

            function changeTitleTask(title: string) {
                //создаем экшн и диспатчим его через юзредюсер в редюсер таски
                const action = changeTitleTaskAC(props.todoListID, t.id, title)
                dispatch(action)
            }

            function isDoneTask(event: ChangeEvent<HTMLInputElement>) {
                //создаем экшн и диспатчим его через юзредюсер в редюсер таски
                const action = changeTaskStatusAC(t.id, !t.isDone, props.todoListID)
                dispatch(action)
            }

            return (
                <div key={t.id} className={t.isDone === true?'is-done':''}>

                    <Checkbox onChange={isDoneTask}
                              checked={t.isDone}
                              color={'primary'}></Checkbox>

                    <EditableSpan title={t.title} changeTitleTask={changeTitleTask}/>

                    <IconButton onClick={ removeTask }
                                color={'primary'}
                                size={'small'}
                                style={{color: '#444444', marginLeft: '4px'}}>
                        <Delete/>
                    </IconButton>

                </div>
            )
        })}

        <div>

            <Buttons value = {'all'} filter = {todolist.filter} todoListID={props.todoListID} changeTodoListFilter = {changeTodoListFilter}/>
            <Buttons value = {'active'} filter = {todolist.filter} todoListID={props.todoListID} changeTodoListFilter = {changeTodoListFilter}/>
            <Buttons value = {'completed'} filter = {todolist.filter} todoListID={props.todoListID} changeTodoListFilter = {changeTodoListFilter}/>
        </div>
    </div>
}