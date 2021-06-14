import React from 'react';
import {FilterValuesType} from "../App";

type PropsType = {
    value: FilterValuesType
    filter: FilterValuesType
    changeFilter: (value: FilterValuesType) => void
}

export function Button(props: PropsType) {

    const onFilterClickHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue);
    }

    return (
        <>
            <button className = {props.filter === props.value?'active-filter':''} onClick={ () => onFilterClickHandler(props.value) }>{props.value}</button>
        </>
    )
}