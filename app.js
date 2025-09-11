// Select DOM elements
const newTaskInput = document.getElementById('new-task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage or start empty
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks to the DOM
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add('completed');
    }

    // Toggle completion on click
    li.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent toggling completion
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Add new task from input
addTaskBtn.addEventListener('click', () => {
  const taskText = newTaskInput.value.trim();
  if (taskText.length > 0) {
    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    newTaskInput.value = '';
    newTaskInput.focus();
  }
});

// Support pressing Enter key to add task
newTaskInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    addTaskBtn.click();
  }
});

// Initial render
renderTasks();
