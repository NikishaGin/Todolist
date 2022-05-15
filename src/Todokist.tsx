import React from "react";
// Граница
type inArrayType = { // Фура с перечислением
    id: number,
    title: string,
    isDone: boolean
}

type TodokistPropsType = { // Контейнер
    title: string // Товар
    name1?: number
    name2?: string
    tasks: Array<inArrayType> // отдаем папку

}

export const Todokist = (props:TodokistPropsType) => { //Передаем в государство
    return (
        <div>
            <h3>{props.title}</h3>
            <div>{props.name1}</div>
            <div>{props.name2}</div>
            <div>
                <input/>
                <button><strong>+</strong></button>
            </div>
            <ul>
                {props.tasks.map((el)=>{
                    return(
                        <li><input type="checkbox" checked={el.isDone}/><span>{el.title}</span></li>
                    )
                })}
                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button><strong>All</strong></button>
                <button><strong>Active</strong></button>
                <button><strong>Completed</strong></button>
            </div>
        </div>

    )
}