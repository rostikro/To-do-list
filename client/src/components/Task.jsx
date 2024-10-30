import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Task = ({task, deleteTodo, updateTodo}) => {
  return (
    <div className="Task">
        <p className={`${task.completed ? "completed" : "incompleted"}`} data-no-dnd="true" onClick={() => updateTodo(task.id, task.title, !task.completed)}>{task.title}</p>
        <div>
        <FontAwesomeIcon className="delete-icon" icon={faTrash} data-no-dnd="true" onClick={() => deleteTodo(task.id)} />
        </div>
    </div>
  )
}