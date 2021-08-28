import React, {FC, ReactElement, useCallback, useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {
  addTaskTC,
  fetchTasksTC,
} from "./store/tasks-reducer";
import {
  changeTodolistFilterAC,
  updateTodolistTitleTC,
  FilterValuesType,
  removeTodolistTC
} from "./store/todolists-reducer";

import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

import {AddItemForm} from './components/AddItemForm';
import {Buttons} from './components/Buttons';
import EditableSpan from "./components/EditableSpan";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolist-api";

type PropsType = {
  todolistId: string;
};

export const Todolist: FC<PropsType> = React.memo(({
  todolistId,
}): ReactElement | null => {


  const getTodoLists = (state: any) => state.todolists
    .filter((todolist: any) => todolist.id === todolistId)[0];
  const todolist = useSelector((state: any) => getTodoLists(state));
  const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolistId])
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(fetchTasksTC(todolistId))
  },[])


  const addTask = useCallback((title: string) => {
    const thunk = addTaskTC(todolistId, title)
    dispatch(thunk)
  }, [])

  const removeTodolist = useCallback(() => {
    const thunk = removeTodolistTC(todolistId)
    dispatch(thunk)
  }, [])

  const changeTodolistTitle = useCallback((title: string) => {
    const thunk = updateTodolistTitleTC(todolistId, title)
    dispatch(thunk)
  }, [])





  const changeTodoListFilter = useCallback((value: FilterValuesType) => {
    //создаем экшн и диспатчим его через юзредюсер в редюсер тудулиста
    const action = changeTodolistFilterAC(todolistId, value)
    dispatch(action)
  }, [dispatch])

  const renderTasks = () => tasksForTodolist.map((t) => {
    return (
      <div key={t.id}>
        <Task
          todolistId={todolistId}
          taskId={t.id}
        />
      </div>
    )
  })

  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      <h3>
        <EditableSpan
          title={todolist.title}
          changeTitleTask={changeTodolistTitle}
        />
        <IconButton
          onClick={removeTodolist}
          color={'primary'}
          size={'small'}
          style={{color: '#444444'}}
        >
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask}/>

      {renderTasks()}

      <div>
        <Buttons
          value={'all'} filter={todolist.filter}
          todoListID={todolistId}
          changeTodoListFilter={changeTodoListFilter}
        />
        <Buttons
          value={'active'} filter={todolist.filter}
          todoListID={todolistId}
          changeTodoListFilter={changeTodoListFilter}
        />
        <Buttons
          value={'completed'} filter={todolist.filter}
          todoListID={todolistId}
          changeTodoListFilter={changeTodoListFilter}
        />
      </div>
    </div>
  )
})

{/*{tasksForTodolist.map((t) => {*/}
{/*  return <div key={t.id}>*/}
{/*    <Task todoListID={props.todoListID} taskID={t.id}/>*/}
{/*  </div>*/}
{/*})}*/}
