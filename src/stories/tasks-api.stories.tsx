import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/task-api";

export default {
  title: 'API'
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {

    const todolistId = '0ea65155-8763-4808-88bb-ebf22b840b90'

    taskAPI.GetTasks(todolistId)
      .then((res) => {
        setState(res.data);
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}


export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {

    const todolistId = '0ea65155-8763-4808-88bb-ebf22b840b90'
    const title = "NEW TASKSSS"

    taskAPI.CreateTask(todolistId, title)
      .then((res) => {
        setState(res.data);
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {

    const todolistId = '0ea65155-8763-4808-88bb-ebf22b840b90'
    const taskId = '234d9028-a85f-4169-86fc-81c85c46e015';

    taskAPI.DeleteTask(todolistId, taskId)
      .then((res) => {
        setState(res.data);
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {

    const todolistId = '0ea65155-8763-4808-88bb-ebf22b840b90'
    const taskId = '234d9028-a85f-4169-86fc-81c85c46e015'
    const title = "NEWWWWWWWWWWWWWWW"

    taskAPI.UpdateTaskTitle(todolistId, taskId, title)
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
