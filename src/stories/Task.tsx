import React, {ChangeEvent, useCallback} from 'react';
/*1
import {
  changeTaskStatusAC,
  changeTitleTaskAC,
  removeTaskAC
} from "../store/tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "../components/EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {TaskType} from "../store/tasks-reducer";
import '../App.css';

export type TaskWithReduxType = {
  todoListID: string
  taskID: string
}

export const Task = React.memo(function (props: TaskWithReduxType) {

  console.log('task')

  let task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todoListID]
    .filter(tasks => tasks.id === props.taskID)[0])
  const dispatch = useDispatch()

  const removeTask = useCallback(() => {
    //создаем экшн и диспатчим его через юзредюсер в редюсер таски
    const action = removeTaskAC(task.id, props.todoListID)
    dispatch(action)
  }, [dispatch])

  const changeTitleTask = useCallback((title: string) => {
    //создаем экшн и диспатчим его через юзредюсер в редюсер таски
    const action = changeTitleTaskAC(props.todoListID, task.id, title)
    dispatch(action)
  }, [dispatch])

  const isDoneTask = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    //создаем экшн и диспатчим его через юзредюсер в редюсер таски
    const action = changeTaskStatusAC(task.id, !task.isDone, props.todoListID)
    dispatch(action)
  }, [dispatch])

  return (
    <div key={task.id} className={task.isDone === true ? 'is-done' : ''}>

      <Checkbox onChange={isDoneTask}
        checked={task.isDone}
        color={'primary'}></Checkbox>
      <EditableSpan title={task.title} changeTitleTask={changeTitleTask}/>
      <IconButton
        onClick={removeTask}
        color={'primary'}
        size={'small'}
        style={{color: '#444444', marginLeft: '4px'}}
      >
          <Delete/>
      </IconButton>

    </div>
  )

})*/
