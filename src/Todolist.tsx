import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import {Button} from './components/Button';
import {Input} from './components/Input';



type PropsType = {
    title: string
    tasks: Array<TaskType>
    todoListID: string
    todoListFilter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (newTitle: string, todoListID: string) => void
    isDoneTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
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

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListID)
    }

    return <div>
        <h3>{props.title} <button onClick={removeTodoListHandler}>X</button></h3>

        <Input addTask={props.addTask} todoListID={props.todoListID}/>

        <ul>
            {props.tasks.map((t) => {

                const removeTaskHandler = () => props.removeTask(t.id, props.todoListID)

                const isDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    props.isDoneTask(t.id, props.todoListID)
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


            <Button value = {'all'} filter = {props.todoListFilter} todoListID={props.todoListID} changeTodoListFilter = {props.changeTodoListFilter}/>
            <Button value = {'active'} filter = {props.todoListFilter} todoListID={props.todoListID} changeTodoListFilter = {props.changeTodoListFilter}/>
            <Button value = {'completed'} filter = {props.todoListFilter} todoListID={props.todoListID} changeTodoListFilter = {props.changeTodoListFilter}/>
        </div>
    </div>
}
