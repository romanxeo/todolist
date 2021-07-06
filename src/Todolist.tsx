import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import {Buttons} from './components/Buttons';
import {AddItemForm} from './components/AddItemForm';
import EditableSpan from "./components/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";



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
    changeTitleTask: (taskID: string, title: string, todoListID: string) => void
    changeTitleTodoList: (title: string, todoListID: string) => void
}

export function Todolist(props: PropsType) {

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListID)
    }

    const addTask = (newTitle: string) => {
        props.addTask(newTitle, props.todoListID)
    }

    const changeTitleTodoList = (title: string) => {
        props.changeTitleTodoList(title, props.todoListID)
    }

    return <div>

        <h3>{/*{props.title}*/}
            <EditableSpan title={props.title} changeTitleTask={changeTitleTodoList} />

            <IconButton onClick={ removeTodoListHandler }
                        color={'primary'}
                        size={'small'}
                        style={{color: '#444444'}}
            >
                <Delete/>
            </IconButton>


        </h3>

        <AddItemForm addItem={addTask}/>


            {props.tasks.map((t) => {

                const removeTaskHandler = () => props.removeTask(t.id, props.todoListID)

                const isDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    props.isDoneTask(t.id, props.todoListID)
                }

                const changeTitleTask = (title: string) => {
                    props.changeTitleTask(t.id, title, props.todoListID)
                }

                return (
                    <div key={t.id} className={t.isDone === true?'is-done':''}>

                        {/*<input onChange={isDoneHandler}
                               type="checkbox"
                               checked={t.isDone}/>*/}

                        <Checkbox onChange={isDoneHandler}
                                  checked={t.isDone}
                                  color={'primary'}></Checkbox>

                        {/*<span >{t.title}</span>*/}
                        <EditableSpan title={t.title} changeTitleTask={changeTitleTask}/>
                        {/*<button onClick={ removeTaskHandler }>x</button>*/}
                        <IconButton onClick={ removeTaskHandler }
                                    color={'primary'}
                                    size={'small'}
                                    style={{color: '#444444', marginLeft: '4px'}}>
                            <Delete/>
                        </IconButton>

                        {/*<Button callback={removeTaskHandler} value={'X'}/>*/}

                    </div>
                )
            })}

        <div>


            {/*<Button callback={changeFilterHandlerAll} value={'All'}/>
            <Button callback={changeFilterHandlerActive} value={'Active'}/>
            <Button callback={changeFilterHandlerCompleted} value={'Completed'}/>*/}


            <Buttons value = {'all'} filter = {props.todoListFilter} todoListID={props.todoListID} changeTodoListFilter = {props.changeTodoListFilter}/>
            <Buttons value = {'active'} filter = {props.todoListFilter} todoListID={props.todoListID} changeTodoListFilter = {props.changeTodoListFilter}/>
            <Buttons value = {'completed'} filter = {props.todoListFilter} todoListID={props.todoListID} changeTodoListFilter = {props.changeTodoListFilter}/>
        </div>
    </div>
}
