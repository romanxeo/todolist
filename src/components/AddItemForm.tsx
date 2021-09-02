import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";
import {RequestStatusType} from "../store/app-reducer";

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
    entityStatus?: RequestStatusType
}

export const AddItemForm = React.memo(function(props: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>('')
    let [error, setError] = useState<null|string>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (error !== null ){
            setError(null)
        }
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
                       onKeyPress={onKeyPressHandler}
                       disabled={props.entityStatus === 'loading'}
                        />

            <IconButton
              onClick={onClickHandler}
              color={'primary'}
              size={'small'}
              style={{margin:'5px'}}
              disabled={props.entityStatus === 'loading'}
            >
                <ControlPoint />
            </IconButton>

        </div>
    )
})