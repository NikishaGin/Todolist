import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {


    let tasks = [
        {id: 1, title: "React", isDone: false },
        {id: 1, title: "JS", isDone: true },
        {id: 1, title: "HTMl/CSS", isDone: true },
    ]

    return (
        <div className="App">
            <Todolist tasks={tasks}/>
        </div>
    );
}

export default App;
