import React, { useCallback } from 'react';
import {FilterValuesType} from "../store/tasks-reducer";
import {Button} from "@material-ui/core";

type PropsType = {
    value: FilterValuesType
    filter: FilterValuesType
    todoListID: string
    changeTodoListFilter: (value: FilterValuesType, todoListID: string) => void
}

export const Buttons = React.memo(function(props: PropsType) {

    console.log('button')

    const onFilterClickHandler = useCallback((filterValue: FilterValuesType) => {
        props.changeTodoListFilter(filterValue, props.todoListID);
    }, [])

    return (
        <>
            {/*<button className={props.filter === props.value ? 'active-filter' : ''}
                    onClick={() => onFilterClickHandler(props.value)}>{props.value}</button>*/}

            <Button size={'small'}
                    variant={'contained'}
                    color={props.filter === props.value ? 'secondary' : 'primary'}
                    onClick={() => onFilterClickHandler(props.value)}
                    style={{margin:'10px 2px 0px 2px'}}>
                {props.value}
            </Button>


        </>
    )
})