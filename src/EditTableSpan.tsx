import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    callback: (title: string) => void
}

export const EditTableSpan = (props: PropsType) => {

    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setNewTitle(event.currentTarget.value)

    const onEditClick = () => {
        setEdit(!edit)
        setNewTitle(props.title)
    }

    const onBlurHandler = () => {
        newTitle.trim() !== '' && props.callback(newTitle)
        setEdit(!edit)
    }

    return (
        <>
            {edit
                ? <input value={newTitle} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus={true}/>
                : <span onClick={onEditClick}>{props.title}</span>
            }
        </>
    );
};

