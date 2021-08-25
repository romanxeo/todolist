import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
  title: 'API'
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {

    todolistAPI.GetTodolists()
      .then((res) => {
        setState(res.data);
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {

    const title = "NEW TITLE"

    todolistAPI.CreateTodolist(title)
      .then((res) => {
        setState(res.data);
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {

    const todolistId = '039e11e1-22b6-4749-895a-48cf33e19aa0';

    todolistAPI.DeleteTodolist(todolistId)
      .then((res) => {
        setState(res.data);
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {

    const todolistId = '4cabe92d-5cbd-48a8-afd6-bdd7830fc9ca'
    const title = "NEWWWWWWWWWWWWWWW"

    todolistAPI.UpdateTodolistTitle(todolistId, title)
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
