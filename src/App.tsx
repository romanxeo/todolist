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
import { RequestStatusType } from './store/app-reducer';

//vo tka nado importirovat'!!!!!!!!!!!!
import LinearProgress from '@material-ui/core/LinearProgress'
import { ErrorSnackbar } from './components/ErrorSnackbar';


export type TasksStateType = {
  [key: string]: Array<TaskType>
}

const App = React.memo(() => {

  let status = useSelector<AppRootStateType, number>(state => state.app.status)
  let todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
  const dispatch = useDispatch()


  useEffect(() => {
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
        <Grid container style={{padding: '20px 0'}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={2}>
          {todoListsComponents}
        </Grid>
      </Container>
    </div>
  );
})

export default App;