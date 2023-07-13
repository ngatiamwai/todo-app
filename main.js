document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('new-todo');
    const todoList = document.querySelector('.lowerinfo');
    const filterButtons = document.querySelectorAll('.filter');
    const clearCompletedButton = document.getElementById('clear-completed');
    const reorderButton = document.getElementById('reorder-button');

    let todos = [];

    todoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            const isCompleted = document.getElementById('checkBox').checked;
            addTodoItem(todoText, isCompleted);
            todoInput.value = '';
        }
    });

    todoList.addEventListener('click', function (event) {
        const clickedElement = event.target;
        if (clickedElement.classList.contains('checkbox')) {
            const todoId = clickedElement.closest('.todo-item').dataset.id;
            toggleTodoCompletion(todoId);
        }
    });

    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const filter = button.dataset.filter;
            filterTodos(filter);
        });
    });


    clearCompletedButton.addEventListener('click', function () {
        clearCompletedTodos();
    });


    reorderButton.addEventListener('click', function () {

    });        //code to handle drag and drop reordering

    function addTodoItem(text, isCompleted) {
        const todoItem = {
            id: Date.now().toString(),
            text: text,
            completed: isCompleted
        };
        todos.push(todoItem);
        renderTodoItem(todoItem);
    }

    function renderTodoItem(todoItem) {
        const todoElement = document.createElement('div');
        todoElement.classList.add('todo-item');
        if (todoItem.completed) {
            todoElement.classList.add('completed');
        }
        todoElement.dataset.id = todoItem.id;
        todoElement.innerHTML = `
        <div>
          <input type="checkbox" class="checkbox" ${todoItem.completed ? 'checked' : ''}>
          <span>${todoItem.text}</span>
        </div>
      `;
        todoList.appendChild(todoElement);
    }

    function toggleTodoCompletion(todoId) {
        todos = todos.map(function (todoItem) {
            if (todoItem.id === todoId) {
                todoItem.completed = !todoItem.completed;
            }
            return todoItem;
        });
        updateTodoItems();
    }

    function filterTodos(filter) {
        const filteredTodos = filter === 'all'
            ? todos
            : todos.filter(function (todoItem) {
                return filter === 'active' ? !todoItem.completed : todoItem.completed;
            });
        updateTodoItems(filteredTodos);
    }

    function clearCompletedTodos() {
        todos = todos.filter(function (todoItem) {
            return !todoItem.completed;
        });
        updateTodoItems();
    }

    function updateTodoItems(filteredTodos = todos) {
        todoList.innerHTML = '';
        filteredTodos.forEach(function (todoItem) {
            renderTodoItem(todoItem);
        });
    }
});
