import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type inputType = {
    callback: (newTitle: string) => void
}

export const Input = (props: inputType) => {
    let [title, setTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event:KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickHandler();
        }
    }

    const onClickHandler = () => {
        if (title !== "") {
            props.callback(title)
            setTitle("")
        }
    }


    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickHandler}>+</button>
        </div>
    )
}
