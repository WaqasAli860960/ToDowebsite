document.addEventListener('DOMContentLoaded', loadTodos);

const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', addTodo);

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === '') return;

    const todoItem = createTodoElement(todoText);
    todoList.appendChild(todoItem);
    saveTodoToLocal(todoText);
    todoInput.value = '';
}

function createTodoElement(todoText) {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.textContent = todoText;
    li.appendChild(span);

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editTodoItem(span));
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTodoItem(li, todoText));
    li.appendChild(deleteBtn);

    return li;
}

function editTodoItem(span) {
    const newTodoText = prompt('Edit your task:', span.textContent);
    if (newTodoText !== null && newTodoText.trim() !== '') {
        const oldTodoText = span.textContent;
        span.textContent = newTodoText.trim();
        updateTodoInLocal(oldTodoText, newTodoText.trim());
    }
}

function deleteTodoItem(li, todoText) {
    todoList.removeChild(li);
    deleteTodoFromLocal(todoText);
}

function saveTodoToLocal(todoText) {
    let todos = getTodosFromLocal();
    todos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodosFromLocal() {
    return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
}

function loadTodos() {
    let todos = getTodosFromLocal();
    todos.forEach(todoText => {
        const todoItem = createTodoElement(todoText);
        todoList.appendChild(todoItem);
    });
}

function updateTodoInLocal(oldTodoText, newTodoText) {
    let todos = getTodosFromLocal();
    const index = todos.indexOf(oldTodoText);
    if (index !== -1) {
        todos[index] = newTodoText;
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

function deleteTodoFromLocal(todoText) {
    let todos = getTodosFromLocal();
    todos = todos.filter(todo => todo !== todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}
