import React, {useCallback, useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {
  addTodolistTC,
  fetchTodolistsTC,
  TodolistDomainType
} from "./store/todolists-reducer";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddItemForm} from "./components/AddItemForm";
import {Todolist} from "./Todolist";
import {TaskType} from "./api/todolist-api";
import {initializeAppTC, RequestStatusType} from './store/app-reducer';

//vo tka nado importirovat'!!!!!!!!!!!!
import LinearProgress from '@material-ui/core/LinearProgress'
import { ErrorSnackbar } from './components/ErrorSnackbar';
import { Login } from './login/login';
import {Redirect, Route, Switch } from 'react-router-dom';

export const TodolistsList = () => {

  let todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(fetchTodolistsTC())
  }, [])

  const addTodolist = useCallback((title: string) => {
    const thunk = addTodolistTC(title)
    dispatch(thunk)
  }, [])

  const todoListsComponents = todoLists.map(tl => {
    return (
      <Grid item key={tl.id}>
        <Paper style={{padding: '10px'}} elevation={4}>
          <Todolist todolistId={tl.id}/>
        </Paper>
      </Grid>
    )
  })

  if (!isLoggedIn) {
    return <Redirect to={ '/login' } />
  }

  return <>
    <Grid container style={{padding: '20px 0'}}>
      <AddItemForm addItem={addTodolist}/>
    </Grid>
    <Grid container spacing={2}>
      {todoListsComponents}
    </Grid>
  </>
}