import React from 'react';
import {FilterValuesType} from "../App";

type PropsType = {
    value: FilterValuesType
    filter: FilterValuesType
    todoListID: string
    changeTodoListFilter: (value: FilterValuesType, todoListID: string) => void
}

export function Button(props: PropsType) {

    const onFilterClickHandler = (filterValue: FilterValuesType) => {
        props.changeTodoListFilter(filterValue, props.todoListID);
    }

    return (
        <>
            <button className = {props.filter === props.value?'active-filter':''} onClick={ () => onFilterClickHandler(props.value) }>{props.value}</button>
        </>
    )
}