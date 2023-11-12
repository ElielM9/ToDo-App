// Variables
const form = document.querySelector(`#form`);
const tasksList = document.querySelector(`#tasksList`);
let tasks = [];

// Eventos
document.addEventListener(`DOMContentLoaded`, startApp);

function startApp() {
  eventListeners();
  loadLocalStorage();
  actualDate();
}

function eventListeners() {
  // Cuando el usuario agrega una tarea
  form.addEventListener(`submit`, addTask);
}

// Funciones

function loadLocalStorage() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  createHTML();
}

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
    completed: false,
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
      <button class="task__btn task__btn--check" id="btnCheck">
      <svg
        class="task__btn-icon task__btn-icon--check"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
        <path
          d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"
        ></path>
      </svg>
      </button>
      <p class="task__text">
        ${task.task}
      </p>
      <button class="task__btn task__btn--trash" id="btnTrash">
        <svg
          class="task__btn-icon task__btn-icon--trash"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path
          d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
        <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
      </svg>
    </button>
     `;

      const taskHTML = document.createElement(`li`);
      taskHTML.classList.add(`task`);
      taskHTML.innerHTML = taskContent;
      taskHTML.dataset.taskId = task.id;

      setupTaskEvents(taskHTML);
      if (task.completed) {
        // Agregar clase para tareas completada
        taskHTML.classList.add(`task--completed`);
      }

      // Agregar al HTML
      tasksList.appendChild(taskHTML);
    });
  }

  syncStorage();
}

// Agregar las tareas a LocalStorage
function syncStorage() {
  localStorage.setItem(`tasks`, JSON.stringify(tasks));
}

function setupTaskEvents(taskHTML) {
  const btnCheck = taskHTML.querySelector(`.task__btn--check`);
  const btnTrash = taskHTML.querySelector(`.task__btn--trash`);
  const taskId = parseInt(taskHTML.dataset.taskId);

  // Marcar como completada
  btnCheck.addEventListener(`click`, () => {
    completeTask(taskId);
  });

  // Eliminar tarea
  btnTrash.addEventListener(`click`, () => {
    deleteTask(taskId);
  });
}

// Marcar una tarea como completada
function completeTask(id) {
  tasks = tasks.filter((task) => {
    if (task.id === id) {
      task.completed = !task.completed;
    }

    return task;
  });

  createHTML();
}

// Eliminar una tarea
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  createHTML();
}

// Limpiar el html
function cleanHTML() {

  // Mientras exista un primer hijo en 'tasksList', elimina el primer hijo de taskList
  while (tasksList.firstChild) {
    tasksList.removeChild(tasksList.firstChild);
  }
}

function actualDate() {
  // Selecciona el elemento HTML con el id 'date'
  const tasksDate = document.querySelector(`#date`);
  // Crea un nuevo objeto Date que representa la fecha y hora actuales
  const actualDate = new Date();
  // Extrae el día, mes y año del objeto actualDate.
  const date = `${actualDate.getDate()}/${
    actualDate.getMonth() + 1
  }/${actualDate.getFullYear()}`;

  // Coloca el contenido del elemento seleccionado en la cadena de fecha formateada
  tasksDate.textContent = date;
}
