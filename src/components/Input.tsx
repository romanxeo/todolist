import React from 'react';

type inputType={
    callback:() => void
}

export const Input = (props: inputType) => {
    return (
        <div>
            <input/>
            <button onClick = {() => props.callback()}>+</button>
        </div>
    )
}
