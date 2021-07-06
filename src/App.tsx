import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: "all"},
        {id: todoListID_2, title: 'What to buy', filter: "all"},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API1", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}],
        [todoListID_2]: [{id: v1(), title: "books", isDone: false},
            {id: v1(), title: "notebook", isDone: false},
            {id: v1(), title: "scooter", isDone: false}],
    })


    function isDoneTask(taskID: string, todoListID: string) {

        const findTask = tasks[todoListID].find(t => t.id === taskID);
        if (findTask) {
            findTask.isDone = !findTask.isDone
            setTasks({...tasks})
        }
    }

    function changeTitleTask(taskID: string, title: string, todoListID: string) {

        const findTask = tasks[todoListID].find(t => t.id === taskID);
        if (findTask) {
            findTask.title = title
            setTasks({...tasks})
        }
    }

    function changeTitleTodoList(title: string, todoListID: string) {
        const updatedTodoLists = todoLists.map(tl => {
            if (tl.id === todoListID ) {
                return {...tl, title: title}
            }
            return tl
        } )
        setTodoLists(updatedTodoLists)
    }

    function addTask(newTitle: string, todoListID: string) {
        const newTask = {id: v1(), title: newTitle, isDone: false};
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks});
    }

    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID);
        setTasks({...tasks});
    }

    function changeTodoListFilter(value: FilterValuesType, todoListID: string) {

        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl));
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    const todoListsComponents = todoLists.map(tl => {

        let tasksForTodolist = tasks[tl.id];

        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
        }

        return (
            <Todolist title={tl.title}
                      tasks={tasksForTodolist}
                      todoListID={tl.id}
                      todoListFilter={tl.filter}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}
                      addTask={addTask}
                      isDoneTask={isDoneTask}
                      removeTodoList={removeTodoList}
                      changeTitleTask={changeTitleTask}
                      changeTitleTodoList={changeTitleTodoList}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoListsComponents}
        </div>
    );
}

export default App;
