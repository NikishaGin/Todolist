import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan = (props: PropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const changeEditMode = () => {
        setEditMode(!editMode)
        if (editMode) {
            props.callback(title)
        }
    }

    return (
        <>
            {editMode
                ? <input autoFocus value={title} onChange={onChangeHandler} onBlur={changeEditMode}/>
                : <span onDoubleClick={changeEditMode}>{title}</span>
            }
        </>
    );
};

