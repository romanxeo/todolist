import React, {ChangeEvent, useCallback} from 'react';
import {
  updateTaskStatusTC,
  removeTaskTC, updateTaskTitleTC,
} from "./store/tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./components/EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import './App.css';
import {TaskType, TaskStatuses} from "./api/todolist-api";

export type TaskWithReduxType = {
  todolistId: string
  taskId: string
}

export const Task = React.memo(function (props: TaskWithReduxType) {

  let task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todolistId]
    .filter(tasks => tasks.id === props.taskId)[0])
  const dispatch = useDispatch()


  const removeTask = useCallback(() => {
    const thunk = removeTaskTC(props.todolistId, task.id)
    dispatch(thunk)
  }, [])

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      const thunk = updateTaskStatusTC (props.todolistId, task.id, TaskStatuses.Completed)
      dispatch(thunk)
    }
    else {
      const thunk = updateTaskStatusTC (props.todolistId, task.id, TaskStatuses.New)
      dispatch(thunk)
    }
  }, [])

  const changeTaskTitle = useCallback((title: string) => {
    const thunk = updateTaskTitleTC(props.todolistId, task.id, title)
    dispatch(thunk)
  }, [])


  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>

      <Checkbox onChange={onChangeHandler}
        checked={task.status === TaskStatuses.Completed}
        color={'primary'}></Checkbox>
      <EditableSpan title={task.title} changeTitleTask={changeTaskTitle}/>
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

})