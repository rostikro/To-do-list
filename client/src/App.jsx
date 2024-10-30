import './App.css';
import { TodoList } from './components/TodoList';
import useTodo from './hooks/useTodo';

const App = () => {
  const {
    todos,
    setTodos,
    addTodo,
    updateTodoState,
    deleteTodo,
    todoMove,
  } = useTodo();

  return (
    <div className="App">
      <TodoList 
      todos={todos}
      setTodos={setTodos}
      addTodo={addTodo}
      updateTodoState={updateTodoState}
      deleteTodo={deleteTodo}
      todoMove={todoMove}/>
    </div>
  );
};

export default App;