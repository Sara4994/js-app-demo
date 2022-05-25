import { getFilters } from './filter';
import { deleteTodo, todos, toggleTodo } from './index';

const renderTodoList = () => {
    const todoEl = document.querySelector('#todos');

    const filters = getFilters();

    const filteredTodos = todos.filter((todo) => {
        const alteredText = todo.text.toLowerCase();
        const alteredSearchText = filters.searchText.toLowerCase()
        const searchTextMatch = alteredText.includes(alteredSearchText)
        return searchTextMatch
    })
    todoEl.innerHTML = '';

    if(filteredTodos.length > 0) {
        console.log('i am in if condition')
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(createTodoUI(todo))
        })
    } else {
        console.log('i am in else condition')
        const messageEle = document.createElement('p');
        messageEle.classList.add('empty-message');
        messageEle.textContent = 'No list to show';
        todoEl.appendChild(messageEle);
    }
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