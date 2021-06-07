import React from 'react';
import {FilterValuesType} from './App';
import { Button } from './components/Button';
import { Input } from './components/Input';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: () => void
}

export function Todolist(props: PropsType) {

    const changeFilterHandlerAll = () => {props.changeFilter("all")}
    const changeFilterHandlerActive = () => {props.changeFilter("active")}
    const changeFilterHandlerCompleted = () => {props.changeFilter("completed")}



    return <div>
        <h3>{props.title}</h3>
        <Input callback={() => props.addTask()}/>
        <ul>
            {props.tasks.map((t) => {
                const removeTaskHandler = () => props.removeTask(t.id)

                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button callback = {removeTaskHandler} value = {'X'} />
                    </li>
                )
            })}
        </ul>
        <div>
            <Button callback = {changeFilterHandlerAll} value = {'All'} />
            <Button callback = {changeFilterHandlerActive} value = {'Active'} />
            <Button callback = {changeFilterHandlerCompleted} value = {'Completed'} />
        </div>
    </div>
}
