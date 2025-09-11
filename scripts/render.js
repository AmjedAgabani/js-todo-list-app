import { tasks } from './tasks.js';

export const taskList = document.getElementById('task-list');

export function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) li.classList.add('completed');

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    // Append delete button to list item
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Return the li and deleteBtn for event binding
    li.setAttribute('data-index', index);
  });
}
