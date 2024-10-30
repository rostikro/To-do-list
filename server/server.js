const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

// TODO: move to env
const PORT = 8080;

const todos = [
  {id: 'aaa', title: "Buy car", completed: false},
  {id: 'bbb', title: "Make Web lab", completed: false},
  {id: 'ccc', title: "Loot 60", completed: false},
];

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
          arr.push(undefined);
      }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
};

const wss = new WebSocket.Server({ port: PORT });

console.log(`WebSocket server is running on ws://localhost:${PORT}`);

function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

wss.on('connection', ws => {
  console.log('New client connected');
  
  ws.send(JSON.stringify({ type: 'getTodos', data: todos }));

  ws.on('message', message => {
    const parsedMessage = JSON.parse(message);
    const { type, data } = parsedMessage;

    switch (type) {
      case 'addTodo':
        const newTodo = { id: uuidv4(), title: data.title, completed: false };
        todos.push(newTodo);
        broadcast({ type: 'todoAdded', data: newTodo });
        break;

      case 'updateTodo':
        const todoToUpdate = todos.find(todo => todo.id === data.id);
        if (todoToUpdate) {
          todoToUpdate.completed = data.completed;
          todoToUpdate.title = data.title;
          broadcast({ type: 'todoUpdated', data: {id: todoToUpdate.id, title: todoToUpdate.title, completed: todoToUpdate.completed} });
        }
        break;

      case 'deleteTodo':
        const index = todos.findIndex(todo => todo.id === data.id);
        if (index !== -1) {
          const [deletedTodo] = todos.splice(index, 1);
          broadcast({ type: 'todoDeleted', data: deletedTodo.id });
        }
        break;

      case 'moveTodo':
        console.log(data.id);
        console.log(data.overId);
        const todoIndex = todos.findIndex(todo => todo.id === data.id);
        const newIndex = todos.findIndex(todo => todo.id === data.overId);
        array_move(todos, todoIndex, newIndex);

        broadcast({ type: 'getTodos', data: todos }, false);
        break;

      default:
        console.log('Unknown message type:', type);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});