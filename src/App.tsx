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
  Button, CircularProgress,
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
import {TodolistsList} from "./TodolistList";


export type TasksStateType = {
  [key: string]: Array<TaskType>
}

const App = React.memo(() => {

  let status = useSelector<AppRootStateType, number>(state => state.app.status)
  let isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
  /*let todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)*/
  /*const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)*/
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }



  /*useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])*/
  /*const addTodolist = useCallback((title: string) => {
    const thunk = addTodolistTC(title)
    dispatch(thunk)
  }, [])*/
  /*const todoListsComponents = todoLists.map(tl => {
    return (
      <Grid item key={tl.id}>
        <Paper style={{padding: '10px'}} elevation={4}>
          <Todolist todolistId={tl.id}/>
        </Paper>
      </Grid>
    )
  })*/
  /*if (!isLoggedIn) {
    return <Redirect to={ '/login' } />
  }*/

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position='static'>
        <Toolbar style={{justifyContent: 'space-between'}}>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <Menu/>
          </IconButton>
          <Typography variant='h6'>
            Todolists with Thunk and Server API
          </Typography>
          <Button
            variant='outlined'
            color='inherit'
          >Login</Button>
        </Toolbar>
      </AppBar>
      <div className='loadingStyle'>
        {status !== 0 && <LinearProgress color={"secondary"}/>}
      </div>

      <Container fixed>

        <Switch>
          <Route exact path={'/'} render={() => <TodolistsList/>} />
          <Route path={'/login'} render={() => <Login />} />
          <Route path={ '/404' } render={ () => <h1 style={{textAlign: 'center', fontSize: '48px'}}>404: PAGE NOT FOUND</h1> }/>
          <Redirect from={'*'} to={ '/404' } />
        </Switch>

      </Container>
    </div>
  );
})

export default App;