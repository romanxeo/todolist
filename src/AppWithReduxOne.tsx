import React, {useCallback} from 'react';

import './App.css';

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {AddTodoListAC} from "./store/todolists-reducer";

import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

import {AddItemForm} from "./components/AddItemForm";
import {TodolistWithReduxTwo} from "./TodolistWithReduxTwo";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const AppWithReduxOne  = React.memo(   () => {

    console.log('app')

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const dispatch = useDispatch()


    const addTodoList = useCallback((title: string) => {
        //создаем экшн и диспатчим его через юзредюсер в редюсер тудулиста
        const action = AddTodoListAC(title)
        dispatch(action)
    }, [])

    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}} elevation={4}>
                    <TodolistWithReduxTwo todoListID={tl.id}/>
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        Todolists AppWithReduxOne TodolistTwo1
                    </Typography>
                    <Button variant='outlined'
                            color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={2}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
})

export default AppWithReduxOne;