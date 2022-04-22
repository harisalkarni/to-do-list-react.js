import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import TodoList from "./TodoList"

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {

  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  },[])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo (e){
    const name = todoNameRef.current.value
    if( name === "") return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4() , name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }
  function handleClearTodos(){
     const newTodos = todos.filter(todo => !todo.complete)
     setTodos(newTodos)

  return (
    <div>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type='text' ref={todoNameRef} />
      <button onClick={handleAddTodo} >Add to do</button>
      <button  onClick={handleClearTodos}>Clear complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </div>
  );
}}

export default App;
