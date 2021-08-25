import React, {FC, ReactElement, useCallback} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskAC} from "./store/tasks-reducer";
import {
  ChangeTodoListFilterAC,
  ChangeTodoListTitleAC,
  RemoveTodoListAC
} from "./store/todolists-reducer";

import {FilterValuesType, TaskType} from './store/tasks-reducer';

import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

import {AddItemForm} from './components/AddItemForm';
import {Buttons} from './components/Buttons';
import EditableSpan from "./components/EditableSpan";
import {Task} from "./Task";

type PropsType = {
  todoListID: string;
};

export const Todolist: FC<PropsType> = React.memo(({
  todoListID,
}): ReactElement | null => {
  const dispatch = useDispatch()

  const getTodoLists = (state: any) => state.todolists
    .filter((todolist: any) => todolist.id === todoListID)[0];
  const todolist = useSelector((state: any) => getTodoLists(state));
  const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoListID])

  console.log('todolist')

  const addTask = useCallback((newTitle: string) => {
    //создаем экшн и диспатчим его через юзредюсер в редюсер таски
    const action = addTaskAC(todoListID, newTitle)
    dispatch(action)
  }, [dispatch])
  const changeTodoListTitle = useCallback((title: string) => {
    //создаем экшн и диспатчим его через юзредюсер в редюсер тудулиста
    const action = ChangeTodoListTitleAC(todoListID, title)
    dispatch(action)
  }, [todoListID])
  const changeTodoListFilter = useCallback((value: FilterValuesType) => {
    //создаем экшн и диспатчим его через юзредюсер в редюсер тудулиста
    const action = ChangeTodoListFilterAC(todoListID, value)
    dispatch(action)
  }, [dispatch])
  const removeTodoList = useCallback(() => {
    //создаем экшн и диспатчим его через юзредюсер в редюсер тудулиста
    const action = RemoveTodoListAC(todoListID);
    dispatch(action)
  }, [dispatch])

  const renderTasks = () => tasksForTodolist.map((t) => {
    return (
      <div key={t.id}>
        <Task
          todoListID={todoListID}
          taskID={t.id}
        />
      </div>
    )
  })

  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter(t => !t.isDone);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone);
  }

  return (
    <div>
      <h3>
        <EditableSpan
          title={todolist.title}
          changeTitleTask={changeTodoListTitle}
        />
        <IconButton
          onClick={removeTodoList}
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
          todoListID={todoListID}
          changeTodoListFilter={changeTodoListFilter}
        />
        <Buttons
          value={'active'} filter={todolist.filter}
          todoListID={todoListID}
          changeTodoListFilter={changeTodoListFilter}
        />
        <Buttons
          value={'completed'} filter={todolist.filter}
          todoListID={todoListID}
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
