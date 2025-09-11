import { addTask, deleteTask, toggleTaskCompletion } from './tasks.js';
import { renderTasks, taskList } from './render.js';

const newTaskInput = document.getElementById('new-task-input');
const addTaskBtn = document.getElementById('add-task-btn');

export function setupEventListeners() {
  addTaskBtn.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
      addTask(taskText);
      renderTasks();
      newTaskInput.value = '';
      newTaskInput.focus();
    }
  });

  newTaskInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      addTaskBtn.click();
    }
  });

  taskList.addEventListener('click', (e) => {
    const target = e.target;
    const li = target.closest('li');
    if (!li) return;
    const index = Number(li.getAttribute('data-index'));

    if (target.classList.contains('delete-btn')) {
      deleteTask(index);
      renderTasks();
    } else {
      toggleTaskCompletion(index);
      renderTasks();
    }
  });
}
