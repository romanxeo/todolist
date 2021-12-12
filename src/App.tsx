import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {
  AppBar,
  Button, CircularProgress,
  Container,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskType} from "./api/todolist-api";
import {initializeAppTC} from './store/app-reducer';
import {NavLink} from "react-router-dom";

//vo tka nado importirovat'!!!!!!!!!!!!
import LinearProgress from '@material-ui/core/LinearProgress'
import {ErrorSnackbar} from './components/ErrorSnackbar';
import {Login} from './login/login';
import {Redirect, Route, Switch} from 'react-router-dom';
import {TodolistsList} from "./TodolistList";
import {logoutTC} from "./store/auth-reducer";


export type TasksStateType = {
  [key: string]: Array<TaskType>
}

const App = React.memo(() => {

  let status = useSelector<AppRootStateType, number>(state => state.app.status)
  let isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
  let isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  const onClickLogout = () => {
    dispatch(logoutTC())
  }


  if (!isInitialized) {
    return <div
      style={{
        position: 'fixed',
        top: '30%',
        textAlign: 'center',
        width: '100%'
      }}>
      <CircularProgress/>
    </div>
  }


  return (
    <div className="App">
      <ErrorSnackbar/>
      <AppBar position='static'>
        <Toolbar style={{justifyContent: 'space-between'}}>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <Menu/>
          </IconButton>
          <Typography variant='h6'>
            Todolists with Thunk and Server API
          </Typography>
          {isLoggedIn ?
            <Button
              variant='outlined'
              color='inherit'
              onClick={onClickLogout}
            >
              Logout
            </Button>
            :
            <Button
              variant='outlined'
              color='inherit'
            >
              <NavLink to={"/login"}>
                <span style={{color: 'white'}}>Login</span>
              </NavLink>
            </Button>

          }
        </Toolbar>
      </AppBar>
      <div className='loadingStyle'>
        {status !== 0 && <LinearProgress color={"secondary"}/>}
      </div>

      <Container fixed>

        <Switch>
          <Route exact path={'/'} render={() => <TodolistsList/>}/>
          <Route path={'/login'} render={() => <Login/>}/>
          <Route path={'/404'} render={() => <h1
            style={{textAlign: 'center', fontSize: '48px'}}>404: PAGE NOT
            FOUND...</h1>}/>
          <Redirect from={'*'} to={'/404'}/>
        </Switch>

      </Container>
    </div>
  );
})

export default App;