import React, {useEffect, useState} from 'react'
/*
import {taskAPI} from "../api/task-api";

export default {
  title: 'API TASKS'
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {

    const todolistId = '1d3bb046-f530-44d3-b945-815aaee6f783'

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

    const todolistId = '1d3bb046-f530-44d3-b945-815aaee6f783'
    const title = "NEW TASKS 2"

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

    const todolistId = '1d3bb046-f530-44d3-b945-815aaee6f783'
    const taskId = 'e5f957d1-9efa-420d-a176-ed3c7ceadb9b';

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

    const todolistId = '1d3bb046-f530-44d3-b945-815aaee6f783'
    const taskId = '9233bea7-b975-4c5b-92f8-31040ac2bd82'
    const model = {
      title: 'title',
      description: 'description',
      status: 33,
      priority: 33,
      startDate: '',
      deadline: '',
    }

    taskAPI.UpdateTaskTitle(todolistId, taskId, model)
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
*/
