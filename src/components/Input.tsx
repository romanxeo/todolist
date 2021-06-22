import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type inputType = {
    addTask: (newTitle: string, todoListID: string) => void
    todoListID: string
}

export const Input = (props: inputType) => {

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<null|string>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event:KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickHandler();
        }
    }

    const onClickHandler = () => {
        if (title.trim()) {
            props.addTask(title.trim(), props.todoListID)
        } else {
            setError('title is required')
        }
        setTitle("")
    }

    return (
        <div>
            <input value={title}
                   className={error ? 'error':''}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}
