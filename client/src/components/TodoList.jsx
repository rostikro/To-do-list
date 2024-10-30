import React, { useState } from "react";
import { Task } from "./Task";
import { AddTodo } from "./AddTodo";
import { v4 as uuidv4 } from "uuid";
import { EditTodo } from "./EditTodo";
import { SortableItem } from "./SortableItem";
import { closestCenter, DndContext, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy, sortableKeyboardCoordinates, } from '@dnd-kit/sortable'
import { PointerSensor } from "./DndOverride";

export const TodoList = ({todos, setTodos, addTodo, updateTodoState, deleteTodo, todoMove}) => {
    const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="TodoList">
      <h1>Best todo eeeeveeer!</h1>
      <AddTodo addTodo={addTodo} />
      {/* display todos */}
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
        items={todos}
        strategy={verticalListSortingStrategy}
        >
      {todos.map((todo) =>
      <SortableItem key={todo.id} id={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodoState={updateTodoState}></SortableItem>
      )}
        </SortableContext>
      </DndContext>

    </div>
  );

  function handleDragEnd(event) {
    const {active, over} = event;
    console.log("Drag event");
    if (active.id !== over.id) {
      todoMove(active.id, over.id);
      console.log(todos);
      setTodos((items) => {
        const oldIndex = todos.findIndex(todo => todo.id === active.id);
        const newIndex = todos.findIndex(todo => todo.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
      console.log(todos);
    }
  }
};