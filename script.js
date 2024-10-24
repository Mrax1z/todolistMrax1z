// Get elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load saved todos from localStorage
document.addEventListener('DOMContentLoaded', loadTodos);

// Event listener for adding task
addBtn.addEventListener('click', addTodo);

// Function to add a new task
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === '') {
        alert('Please enter a task!');
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${todoText}</span>
        <div>
            <i class="fas fa-check" onclick="toggleComplete(this)"></i>
            <i class="fas fa-trash" onclick="removeTodo(this)"></i>
        </div>
    `;
    
    // Add task to UI
    todoList.appendChild(li);
    
    // Save task to localStorage
    saveTodoToLocalStorage(todoText, false);
    
    // Clear input field
    todoInput.value = '';
}

// Function to remove a task
function removeTodo(icon) {
    const li = icon.parentElement.parentElement;
    const todoText = li.firstChild.textContent.trim();
    
    // Remove task from UI
    todoList.removeChild(li);
    
    // Remove task from localStorage
    removeTodoFromLocalStorage(todoText);
}

// Function to toggle task completion
function toggleComplete(icon) {
    const li = icon.parentElement.parentElement;
    const todoText = li.firstChild.textContent.trim();
    li.classList.toggle('completed');

    // Update task status in localStorage
    updateTodoStatusInLocalStorage(todoText, li.classList.contains('completed'));
}

// Function to save a task to localStorage
function saveTodoToLocalStorage(todo, completed) {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.push({ text: todo, completed: completed });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to remove a task from localStorage
function removeTodoFromLocalStorage(todo) {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos = todos.filter(t => t.text !== todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to update task status in localStorage
function updateTodoStatusInLocalStorage(todo, completed) {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.forEach(t => {
        if (t.text === todo) {
            t.completed = completed;
        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to load saved tasks from localStorage
function loadTodos() {
    const todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo.text}</span>
            <div>
                <i class="fas fa-check" onclick="toggleComplete(this)" ${todo.completed ? 'checked' : ''}></i>
                <i class="fas fa-trash" onclick="removeTodo(this)"></i>
            </div>
        `;
        if (todo.completed) {
            li.classList.add('completed');
        }
        todoList.appendChild(li);
    });
}
