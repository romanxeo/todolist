import React from 'react';
import {FilterValuesType} from './App';
import { Button } from './components/Button';

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
}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={ () => { props.removeTask(t.id) } }>x</button>
                </li>)
            }
        </ul>
        <div>
            <Button callback = { () => props.changeFilter("all")} value = {'All'} />
            <Button callback = { () => props.changeFilter("active")} value = {'Active'} />
            <Button callback = { () => props.changeFilter("completed")} value = {'Completed'} />
        </div>
    </div>
}
