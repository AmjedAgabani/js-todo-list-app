import { tasks } from './tasks.js';

export const taskList = document.getElementById('task-list');
export const taskCount = document.getElementById('task-count');

export function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.setAttribute('data-index', index);
    li.classList.toggle('completed', task.completed);

    // Task text (editable span)
    const textSpan = document.createElement('span');
    textSpan.textContent = task.text;
    textSpan.classList.add('task-text');
    textSpan.contentEditable = false; // Editable toggle on double click below
    li.appendChild(textSpan);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  renderTaskCount();
}

export function renderTaskCount() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  taskCount.textContent = `Tasks: ${total} | Completed: ${completed}`;
}
