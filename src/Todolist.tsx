import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from './components/Button';
import {Input} from './components/Input';

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
    addTask: (newTitle: string) => void
    isDoneTask: (id: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    /*const changeFilterHandlerAll = () => {
        props.changeFilter("all")
    }
    const changeFilterHandlerActive = () => {
        props.changeFilter("active")
    }
    const changeFilterHandlerCompleted = () => {
        props.changeFilter("completed")
    }

    const onFilterClickHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue);
    }*/

    return <div>
        <h3>{props.title}</h3>
        <Input callback={(newTitle: string) => props.addTask(newTitle)}/>
        <ul>
            {props.tasks.map((t) => {
                const removeTaskHandler = () => props.removeTask(t.id)

                const isDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    props.isDoneTask(t.id)
                }

                return (
                    <li key={t.id}>
                        <input onChange={isDoneHandler}
                               type="checkbox"
                               checked={t.isDone}/>
                        <span className={t.isDone === true?'is-done':''}>{t.title}</span>
                        <button onClick={ removeTaskHandler }>x</button>

                        {/*<Button callback={removeTaskHandler} value={'X'}/>*/}

                    </li>
                )
            })}
        </ul>
        <div>


            {/*<Button callback={changeFilterHandlerAll} value={'All'}/>
            <Button callback={changeFilterHandlerActive} value={'Active'}/>
            <Button callback={changeFilterHandlerCompleted} value={'Completed'}/>*/}


            <Button value = {'all'} filter = {props.filter} changeFilter = {props.changeFilter}/>
            <Button value = {'active'} filter = {props.filter} changeFilter = {props.changeFilter}/>
            <Button value = {'completed'} filter = {props.filter} changeFilter = {props.changeFilter}/>
        </div>
    </div>
}
