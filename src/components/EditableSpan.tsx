import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitleTask: (title: string) => void
}

export const EditableSpan = React.memo(function(props: EditableSpanPropsType) {

    console.log('editablespan')

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => {
        setTitle(props.title)
        setEditMode(true)
    }

    const offEditMode = () => {
        if (title) {
            props.changeTitleTask(title)
        }
        setEditMode(false)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event:KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            offEditMode();
        }
    }

    return (
        editMode
            ? <TextField autoFocus={true}
                       onBlur={offEditMode}
                       value={title}
                       size={'small'}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
            />

            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )

})


export default EditableSpan