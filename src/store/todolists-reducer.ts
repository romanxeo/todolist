import {FilterValuesType, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todoListID: string
}

export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    todoListID: string
    title: string
}

export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    todoListID: string
}

export type actionsType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

const initialState: Array<TodoListType> = [

]

type initialStateType = typeof initialState

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: actionsType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {
                id: action.todoListID,
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}

export const AddTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        title: title,
        todoListID: v1()
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListID: todoListID
    }
}

export const ChangeTodoListTitleAC = (todoListID: string, title: string): ChangeTodoListTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        todoListID: todoListID,
        title: title
    }
}

export const ChangeTodoListFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodoListFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        filter: filter,
        todoListID: todoListID
    }
}