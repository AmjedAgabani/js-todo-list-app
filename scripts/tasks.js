export let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

export function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function addTask(text) {
  tasks.push({ text, completed: false });
  saveTasks();
}

export function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}

export function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
}

export function editTask(index, newText) {
  tasks[index].text = newText;
  saveTasks();
}

export function clearCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
}
