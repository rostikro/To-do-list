import React, {useState} from 'react'

export const EditTodo = ({editTodo, task}) => {
    const [value, setValue] = useState(task.task);

    const handleSubmit = (e) => {
      // prevent default action
        e.preventDefault();
        // edit todo
        editTodo(task.id, value);
      };
  return (
    <form onSubmit={handleSubmit} className="EditTodo">
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='Update task' />
    <button type="submit" className='todo-btn'>Update</button>
  </form>
  )
}