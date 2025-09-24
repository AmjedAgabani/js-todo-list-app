import { addTask, deleteTask, toggleTaskCompletion, editTask, clearCompletedTasks } from './tasks.js';
import { renderTasks, taskList } from './render.js';

const newTaskInput = document.getElementById('new-task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const clearCompletedBtn = document.getElementById('clear-completed-btn');

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
    } else if (target.classList.contains('task-text')) {
      // Ignore normal clicks on text span
      return;
    } else {
      toggleTaskCompletion(index);
      renderTasks();
    }
  });

  // Enable editing text on double click of span
  taskList.addEventListener('dblclick', (e) => {
    const target = e.target;
    if (target.classList.contains('task-text')) {
      target.contentEditable = true;
      target.focus();
    }
  });

  // When text loses focus, save edited text
  taskList.addEventListener('blur', (e) => {
    const target = e.target;
    if (target.classList.contains('task-text') && target.isContentEditable) {
      const li = target.closest('li');
      const index = Number(li.getAttribute('data-index'));
      const newText = target.textContent.trim();
      if (newText) {
        editTask(index, newText);
      } else {
        // If empty after editing, remove task
        deleteTask(index);
      }
      renderTasks();
    }
  }, true); // useCapture true to detect blur reliably

  // Clear completed tasks button
  if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener('click', () => {
      clearCompletedTasks();
      renderTasks();
    });
  }
}
