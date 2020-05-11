import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';


export type FilterValuesType= 'all'|'active'|'completed'

function App() {

    let [tasks,setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Rest API", isDone: false},
        {id: 5, title: "GraphQL", isDone: false}
    ])
    // const tasks2 = [
    //     { id: 1, title: "Hello world", isDone: true },
    //     { id: 2, title: "I am Happy", isDone: false },
    //     { id: 3, title: "Yo", isDone: false }
    // ]


    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id != id)
        setTasks(filteredTasks)
    }


    let [filter,setFilter]=useState<FilterValuesType>('all')

    let tasksForTodolist=tasks

    if(filter=='active'){
        tasksForTodolist=tasks.filter(t=>t.isDone===false)
    }
    if(filter=='completed') {
        tasksForTodolist=tasks.filter(t=>t.isDone===true)
    }
    function changeFilter(value:FilterValuesType) { setFilter(value)

    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
            {/*<Todolist title="Songs" tasks={tasks2} />*/}
        </div>
    );
}

export default App;
