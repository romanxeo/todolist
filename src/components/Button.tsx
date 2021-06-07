import React from 'react';

type propsType = {
    callback: ()=>void

}

export const Button = (props: propsType) => {
    return (
        <button onClick={() => props.callback()}>All</button>
    )

}