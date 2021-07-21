import {FilterValuesType, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";

export type removeTaskAT = {
    type: "REMOVE-TASK"
    taskID: string
    todoListID: string
}

export type addTaskAT = {
    type: "ADD-TASK"
    todoListID: string
    title: string
}

export type changeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskID: string
    isDoneStatus: boolean
    todoListID: string
}

export type changeTitleTaskAT = {
    type: "CHANGE-TITLE-TASK",
    todoListID: string,
    taskID: string,
    title: string
}

export type actionsType = removeTaskAT | addTaskAT | changeTaskStatusAT | changeTitleTaskAT | AddTodoListAT | RemoveTodoListAT

export const tasksReducer = (state: TasksStateType, action: actionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let copyState = {...state}
            copyState[action.todoListID] = copyState[action.todoListID].filter(t => t.id !== action.taskID);
            return copyState
        }
        case "ADD-TASK": {
            let copyState = {...state}
            const newTask = {id: v1(), title: action.title, isDone: false};
            copyState[action.todoListID] = [newTask, ...copyState[action.todoListID]]
            return copyState
        }
        case "CHANGE-TASK-STATUS": {
            let copyState = {...state}
            const findTask = copyState[action.todoListID].find(t => t.id === action.taskID);
            if (findTask) {
                findTask.isDone = action.isDoneStatus
            }
            return copyState
        }
        case "CHANGE-TITLE-TASK": {
            let copyState = {...state}
            const findTask = copyState[action.todoListID].find(t => t.id === action.taskID);
            if (findTask) {
                findTask.title = action.title
            }
            return copyState
        }
        case "ADD-TODOLIST": {
            let copyState = {...state, [action.todoListID]: []}
            return copyState
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todoListID: string): removeTaskAT => {
    return {
        type: 'REMOVE-TASK',
        taskID: taskID,
        todoListID: todoListID
    }
}

export const addTaskAC = (title: string, todoListID: string): addTaskAT => {
    return {
        type: "ADD-TASK",
        todoListID: todoListID,
        title: title
    }
}

export const changeTaskStatusAC = (taskID: string, isDoneStatus: boolean, todoListID: string): changeTaskStatusAT => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskID: taskID,
        isDoneStatus: isDoneStatus,
        todoListID: todoListID
    }
}

export const changeTitleTaskAC = (todoListID: string, taskID: string, title: string): changeTitleTaskAT => {
    return {
        type: "CHANGE-TITLE-TASK",
        todoListID: todoListID,
        taskID: taskID,
        title: title
    }
}






