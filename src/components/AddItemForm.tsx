import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}

export const AddItemForm = React.memo(function(props: AddItemFormPropsType) {

    console.log('additemform')

    const [title, setTitle] = useState<string>('')
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
            props.addItem(title.trim())
        } else {
            setError('title is required')
        }
        setTitle("")
    }

    return (
        <div>
            <TextField value={title}
                       variant={"outlined"}
                       size={'small'}
                       label={'Title value'}
                       error={!!error}
                       helperText={error}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>

            <IconButton onClick={onClickHandler}
                        color={'primary'}
                        size={'small'}
                        style={{margin:'5px'}}><ControlPoint />
            </IconButton>

        </div>
    )
})