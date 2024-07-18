import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";



function App() {

  const tasks = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: false},
    {id: 3, title: 'React', isDone: true},
  ]



  return (
    <div className="App">
      <Todolist title={'What to Learn'} tasks={tasks}/>
    </div>
  );
}

export default App;
