import React, {ChangeEvent, useReducer, useState} from 'react';
/*import '../App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "../components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
} from "../store/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTitleTaskAC,
    removeTaskAC
} from '../store/tasks-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";*/

/*
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

function AppWithRedux() {

    /!*    let todoListID_1 = v1()
        let todoListID_2 = v1()
        let [todoLists, dispatchTodolists] = useReducer(todolistsReducer, [
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
        *!/

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()


    function addTodoList(title: string) {
        //?????????????? ???????? ?? ?????????????????? ?????? ?????????? ?????????????????? ?? ?????????????? ??????????????????
        const action = AddTodoListAC(title)
        dispatch(action)
    }

    function removeTodoList(todoListID: string) {
        //?????????????? ???????? ?? ?????????????????? ?????? ?????????? ?????????????????? ?? ?????????????? ??????????????????
        const action = RemoveTodoListAC(todoListID);
        dispatch(action)
    }

    function changeTitleTodoList(title: string, todoListID: string) {
        //?????????????? ???????? ?? ?????????????????? ?????? ?????????? ?????????????????? ?? ?????????????? ??????????????????
        const action = ChangeTodoListTitleAC(todoListID, title)
        dispatch(action)
    }

    function changeTodoListFilter(value: FilterValuesType, todoListID: string) {
        //?????????????? ???????? ?? ?????????????????? ?????? ?????????? ?????????????????? ?? ?????????????? ??????????????????
        const action = ChangeTodoListFilterAC(todoListID, value)
        dispatch(action)
    }



    function addTask(newTitle: string, todoListID: string) {
        //?????????????? ???????? ?? ?????????????????? ?????? ?????????? ?????????????????? ?? ?????????????? ??????????
        const action = addTaskAC(newTitle, todoListID)
        dispatch(action)
    }

    function removeTask(taskID: string, todoListID: string) {
        //?????????????? ???????? ?? ?????????????????? ?????? ?????????? ?????????????????? ?? ?????????????? ??????????
        const action = removeTaskAC(taskID, todoListID)
        dispatch(action)
    }

    function isDoneTask(taskID: string, isDoneStatus: boolean, todoListID: string) {
        //?????????????? ???????? ?? ?????????????????? ?????? ?????????? ?????????????????? ?? ?????????????? ??????????
        const action = changeTaskStatusAC(taskID, isDoneStatus, todoListID)
        dispatch(action)
    }

    function changeTitleTask(taskID: string, title: string, todoListID: string) {
        //?????????????? ???????? ?? ?????????????????? ?????? ?????????? ?????????????????? ?? ?????????????? ??????????
        const action = changeTitleTaskAC(todoListID, taskID, title)
        dispatch(action)
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
                        Todolists AppWithRedux
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

export default AppWithRedux;*/
