import uuidv4 from 'uuid/v4';
import { renderTodoList } from './views';
import { setFilters } from './filter';

let todos = [];


document.querySelector('#filter-text').addEventListener('input', (event) => {
    console.log('filter text', event.target.value)
    setFilters({searchText: event.target.value})
    renderTodoList()
})


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

const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        todos = todosJSON ? JSON.parse(todosJSON) : []
    } catch(e) {
        todos = []
    }
}

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

loadTodos();

renderTodoList();

export { deleteTodo, todos, toggleTodo }