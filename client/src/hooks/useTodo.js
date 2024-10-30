import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";


const ws = new WebSocket("ws://localhost:8080");

export default function useTodo() {
    const [todos, setTodos] = useState([]);

    // Server -> Client
    useEffect(() => {
        ws.onmessage = (msg) => {
            const {type, data} = JSON.parse(msg.data);
            console.log(msg);
            console.log(data);
            switch (type) {
                case 'getTodos':
                    console.log(data)
                    setTodos(data);
                    break;

                case 'todoAdded':
                    setTodos((prev) => [...prev, data]);
                    break;

                case 'todoUpdated':
                    console.log(data);
                    setTodos((prev) => prev.map((todo) => todo.id === data.id ? data : todo));
                    break;

                case 'todoDeleted':
                    setTodos((prev) => prev.filter((todo) => todo.id !== data));
                    break;
            }
        }
    }, []);

    function addTodo(title) {
        ws.send(JSON.stringify({type: 'addTodo', data: { title }}));
    }

    function updateTodoState(id, title, completed) {
        ws.send(JSON.stringify({type: 'updateTodo', data: { id, title, completed}}));
    }

    function deleteTodo(id) {
        console.log(id);
        ws.send(JSON.stringify({type: 'deleteTodo', data: { id }}));
    }

    function todoMove(id, newId) {
        ws.send(JSON.stringify({type: 'moveTodo', data: {id, overId: newId}}));
    }

    return {
        todos,
        setTodos,
        addTodo,
        updateTodoState,
        deleteTodo,
        todoMove,
    };
}