import uuidv4 from 'uuid/v4';
import { renderTodoList } from './views';

let todos = [];


// document.querySelector('#filter-text').addEventListener('change', (event) => {
//     console.log('text', event.target.value)
// })


document.querySelector('#todo-form').addEventListener('submit' , (event) => {
    event.preventDefault();
    const text = event.target.elements.newText.value;
    
    if(text.length > 0) {
        //Do something here
        createTodo(text);
        renderTodoList();
        event.target.elements.newText.value = '';
    }
    console.log('todos', todos)
})

const saveTodo = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const createTodo = (text) => {
    const newText = {
        id: uuidv4(),
        text: text,
        completed: false
    }
    todos.push(newText);
    saveTodo();
}


const deleteTodo = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id)

    if(todoIndex > -1) {
        todos.splice(todoIndex, 1);
        saveTodo();
    }
}

const toggleTodo = (id) => {
    const todo = todos.find(todo => todo.id === id);

    if(todo) {
        todo.completed = !todo.completed
        saveTodo()
    }
}

export { deleteTodo, todos, toggleTodo }