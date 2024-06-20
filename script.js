const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Carregar tarefas salvas do localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todo => {
        const todoItem = createTodoItem(todo.text, todo.completed);
        todoList.appendChild(todoItem);
    });
});

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        const todoItem = createTodoItem(todoText, false);
        todoList.appendChild(todoItem);
        saveTodoToLocalStorage(todoText);
        todoInput.value = '';
    }
});

function createTodoItem(todoText, completed) {
    const li = document.createElement('li');
    li.textContent = todoText;

    if (completed) {
        li.classList.add('completed');
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function() {
        li.remove();
        removeFromLocalStorage(todoText);
    });

    li.appendChild(deleteBtn);
    return li;
}

function saveTodoToLocalStorage(todoText) {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const newTodo = { text: todoText, completed: false };
    savedTodos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(savedTodos));
}

function removeFromLocalStorage(todoText) {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const updatedTodos = savedTodos.filter(todo => todo.text !== todoText);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}

