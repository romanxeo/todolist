import React from 'react';

type propsType = {
    callback: ()=>void
    value: string
}

export const Button = (props: propsType) => {
    const onClickHandler = () => {
        props.callback()
    }
    return (
        <button onClick={onClickHandler}>{props.value}</button>
    )
}