// Variables
const form = document.querySelector(`#form`);
const tasksList = document.querySelector(`#tasksList`);
let tasks = [];

// Eventos
document.addEventListener(`DOMContentLoaded`, eventListeners);

function eventListeners() {
  form.addEventListener(`submit`, addTask);
}

// Funciones
function addTask(e) {
  e.preventDefault();

  //   Input en el que el usuario escribe
  const formInput = document.querySelector(`#formInput`).value;

  if (formInput === ``) {
    showError(`No escribiste una tarea`);

    return;
  }
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
