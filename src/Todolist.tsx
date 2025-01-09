import React from 'react';

type PropsTasksType = {
    id: number,
    title: string,
    isDone: boolean
}

type PropsType = {
    tasks: PropsTasksType []
}

export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h1>What to learn</h1>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((task)=> {
                    return <li key={task.id}>
                        <input type={'checkbox'} checked={task.isDone}/>{task.title}
                    </li>
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

