import React from 'react';


type PropsTasksType = {
    id: number,
    title: string,
    isDone: boolean
}


type PropsType = {
    title: string
    tasks: PropsTasksType []
}


export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((el) => (
                    <li key={el.id}>
                        <input type={'checkbox'} checked={el.isDone}/> <span>{el.title}</span>
                    </li>
                ))}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
