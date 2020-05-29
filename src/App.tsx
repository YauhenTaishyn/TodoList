import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";


export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType ={
    [key:string]:Array<TaskType>
}

function App() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
            {id: todoListId1, title: 'what to learn', filter: 'active'},
            {id: todoListId2, title: 'what to by', filter: 'completed'},

        ]
    )

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "book", isDone: false},
            {id: v1(), title: "milk", isDone: true},
        ]
    })

    let removeTodolist = (todoListId: string) => {

        let filteredTodolist = todolists.filter(tl => tl.id !== todoListId)
        setTodolists(filteredTodolist)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }


    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }


    function removeTask(id: string, todoListId: string) {

        let tasks = tasksObj[todoListId]
        let filteredTasks = tasks.filter(t => t.id != id)
        tasksObj[todoListId] = filteredTasks
        setTasks({...tasksObj})
    }


    function changeFilter(value: FilterValuesType, todoListId: string) {

        let todoList = todolists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodolists([...todolists])
        }

    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todoListId]

        let newTasks = [task, ...tasks]
        tasksObj[todoListId] = newTasks
        setTasks({...tasksObj})
    }

function addTodolist(title:string) {
        let todoList:TodolistType={
            id:v1(),
            filter:'all',
            title:title

        }
        setTodolists([todoList,...todolists])
    setTasks({
        ...tasksObj,
        [todoList.id]:[]
    })
}
    return (
        <div className="App">
           <AddItemForm addItem={addTodolist} />
            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasksObj[tl.id]

                    if (tl.filter == 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                    }
                    if (tl.filter == 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                    }

                    return <Todolist
                        key={tl.id}
                        title={tl.title}
                        id={tl.id}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }

        </div>
    );
}

export default App;
