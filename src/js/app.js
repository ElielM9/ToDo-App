// Variables
const form = document.querySelector(`#form`);
const tasksList = document.querySelector(`#tasksList`);
let tasks = [];

// Eventos
document.addEventListener(`DOMContentLoaded`, startApp);

function startApp() {
  eventListeners();
  actualDate();
}

function eventListeners() {
  form.addEventListener(`submit`, addTask);
}

// Funciones
function addTask(e) {
  e.preventDefault();

  //   Input en el que el usuario escribe
  const formInput = document.querySelector(`#formInput`);
  const task = formInput.value;

  if (task === ``) {
    showError(`No escribiste una tarea`);

    return;
  }

  const taskObj = {
    id: Date.now(),
    task,
  };

  // Añadir al array de tareas
  tasks = [...tasks, taskObj];

  // Una vez agregado, crear html
  createHTML();

  // Reiniciar el formulario
  form.reset();
}

function showError(error) {
  const main = document.querySelector(`.main`);
  const errorMessage = document.createElement(`p`);

  errorMessage.textContent = error;
  errorMessage.classList.add(`error`);

  main.appendChild(errorMessage);

  //  Borra la alerta pasados 3 segundos
  setTimeout(() => {
    errorMessage.remove();
  }, 3000);
}

// Muestra las tareas
function createHTML() {
  cleanHTML();

  if (tasks.length > 0) {
    tasks.forEach((task) => {
      // Crear el HTML
      const taskContent = `   
      <svg
        class="task__check"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
      <path
        d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
      </svg>

      <p class="task__text">
      ${task.task}
      </p>

      <svg
        class="task__trash"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
      <path
        d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
      <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
      </svg>`;

      const taskLI = document.createElement(`li`);
      taskLI.classList.add(`task`);
      taskLI.innerHTML = taskContent;

      // Agregar al HTML
      tasksList.appendChild(taskLI);
    });
  }
}

// Limpiar el html
function cleanHTML() {
  while (tasksList.firstChild) {
    tasksList.removeChild(tasksList.firstChild);
  }
}

function actualDate() {
  const tasksDate = document.querySelector(`#date`);
  const actualDate = new Date();
  const date = `${actualDate.getDay()}/${actualDate.getMonth()}/${actualDate.getFullYear()}`;

  tasksDate.textContent = date;
}
