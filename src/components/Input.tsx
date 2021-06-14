import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type inputType = {
    callback: (newTitle: string) => void
}

export const Input = (props: inputType) => {

    let [title, setTitle] = useState('')
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
            props.callback(title.trim())
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
