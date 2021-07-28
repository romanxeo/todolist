import React, {ChangeEvent, useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleTaskAC, removeTaskAC, tasksReducer} from './store/tasks-reducer';

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

function AppWithReducers() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: 'What to learn', filter: "all"},
        {id: todoListID_2, title: 'What to buy', filter: "all"},
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todoListID_1]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API1", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}],
        [todoListID_2]: [{id: v1(), title: "books", isDone: false},
            {id: v1(), title: "notebook", isDone: false},
            {id: v1(), title: "scooter", isDone: false}],
    })

    function addTodoList(title: string) {
        //создаем экшн и диспатчим его через юзредюсер в редюсер тудулиста
        const action = AddTodoListAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    function removeTodoList(todoListID: string) {
        //создаем экшн и диспатчим его через юзредюсер в редюсер тудулиста
        const action = RemoveTodoListAC(todoListID);
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    function changeTitleTodoList(title: string, todoListID: string) {
        //создаем экшн и диспатчим его через юзредюсер в редюсер тудулиста
        const action = ChangeTodoListTitleAC(todoListID, title)
        dispatchTodolists(action)
    }

    function changeTodoListFilter(value: FilterValuesType, todoListID: string) {
        //создаем экшн и диспатчим его через юзредюсер в редюсер тудулиста
        const action = ChangeTodoListFilterAC(value, todoListID)
        dispatchTodolists(action)
    }



    function addTask(newTitle: string, todoListID: string) {
        //создаем экшн и диспатчим его через юзредюсер в редюсер таски
        const action = addTaskAC(newTitle, todoListID)
        dispatchTasks(action)
    }

    function removeTask(taskID: string, todoListID: string) {
        //создаем экшн и диспатчим его через юзредюсер в редюсер таски
        const action = removeTaskAC(taskID, todoListID)
        dispatchTasks(action)
    }

    function isDoneTask(taskID: string, isDoneStatus: boolean, todoListID: string) {
        //создаем экшн и диспатчим его через юзредюсер в редюсер таски
        const action = changeTaskStatusAC(taskID, isDoneStatus, todoListID)
        dispatchTasks(action)
    }

    function changeTitleTask(taskID: string, title: string, todoListID: string) {
        //создаем экшн и диспатчим его через юзредюсер в редюсер таски
        const action = changeTitleTaskAC(todoListID, taskID, title)
        dispatchTasks(action)
    }


    const todoListsComponents = todoLists.map(tl => {
        let tasksForTodolist = tasks[tl.id];

        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
        }

        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}} elevation={4}>
                    <Todolist title={tl.title}
                              tasks={tasksForTodolist}
                              todoListID={tl.id}
                              todoListFilter={tl.filter}
                              removeTask={removeTask}
                              changeTodoListFilter={changeTodoListFilter}
                              addTask={addTask}
                              isDoneTask={isDoneTask}
                              removeTodoList={removeTodoList}
                              changeTitleTask={changeTitleTask}
                              changeTitleTodoList={changeTitleTodoList}
                              addTodoList = {addTodoList}
                    />
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
                        Todolists AppWithReducer
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
}

export default AppWithReducers;
