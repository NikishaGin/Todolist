import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    callback: (title: string) => void
}

// Универсальная компонента для добавления Тасок и тудулистов
export const AddItemForm = (props: PropsType) => {

    const [title, setTitle] = useState('')

    // Сохраняем введенное значение в локальнный useSate
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    // Проверяем что поле ввода не пустое перед добавлением Таски или Тудулиста
    const addHandler = () => {
        title.trim() !== '' && props.callback(title)
        setTitle('')
    }

    // Добавление Таски или Тудулиста по клавише Enter
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => event.charCode === 13 && addHandler()

    return (
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addHandler}>+</button>
        </div>
    );
};

