import React from 'react';
import './App.css';
import {Todokist} from "./Todokist";

// Грузим товар
function App() {
    const tasks1 =[
        { id: 1, title: "HTML&CSS", isDone: true},// фура
        { id: 2, title: "JS", isDone: true},
        { id: 3, title: "ReactJS", isDone: false}
    ]

    const tasks2 =[
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: true }
    ]
  return (
      <div className="App">
        <Todokist title={"What to learn"} name1={111111} tasks={tasks1}/>
        <Todokist title={"What to learn"} name2={"222222"} tasks={tasks2}/>

      </div>
// Никнейм и сущность
      //ftyhj
  );
}

export default App;
