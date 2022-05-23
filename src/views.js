import { deleteTodo, todos, toggleTodo } from './index';

const renderTodoList = () => {
    const todoEl = document.querySelector('#todos');

    todoEl.innerHTML = '';

    todos.forEach((todo) => {
        todoEl.appendChild(createTodoUI(todo));
    })
}


const createTodoUI = (todo) => {
    const todoLab = document.createElement('label');
    const containerEl = document.createElement('div');
    const checkbox = document.createElement('input');
    const todoText = document.createElement('span');
    const closeButton = document.createElement('button');

    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = todo.completed;
    containerEl.appendChild(checkbox);

    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id);
        renderTodoList();
    });

    todoText.textContent = todo.text;
    containerEl.appendChild(todoText);    

    todoLab.classList.add('list-item');
    containerEl.classList.add('list-item__container')
    todoLab.appendChild(containerEl);

    closeButton.textContent = 'delete';
    closeButton.classList.add('button', 'button--text');
    todoLab.appendChild(closeButton);
    closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        // do something here
        deleteTodo(todo.id);
        renderTodoList();
    })

    return todoLab;
}

export { renderTodoList, createTodoUI };