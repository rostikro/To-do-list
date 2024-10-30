import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Task } from './Task';
import { motion } from 'framer-motion';

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition,
  };

  const editTodo = () => {};
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <motion.div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      layout={!isDragging}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="sortable-item"
    >
        <Task
          key={props.todo.id}
            task={props.todo}
            deleteTodo={props.deleteTodo}
            editTodo={editTodo}
            updateTodo={props.updateTodoState}
          /></motion.div>
    </div>
  );
}