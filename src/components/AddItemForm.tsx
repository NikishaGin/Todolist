import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type PropsType = {
    callback: (title: string) => void
}


export const AddItemForm = (props: PropsType) => {

    const [newTasksTitle, setNewTasksTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTasksTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.charCode === 13 && onclickHandler()
    }

    const onclickHandler = () => {
        if (newTasksTitle.trim() === '') {
            return
        }
        props.callback(newTasksTitle)
        setNewTasksTitle('')
    }

    return (
        <div>
            <input value={newTasksTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={onclickHandler}>+</button>
        </div>
    );
};

