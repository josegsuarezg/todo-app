import { Todo } from '../classes';
import { todoList } from '../index';

//Referencias al HTML
const divTodoList = document.querySelector('.todo-list');
const txtImput = document.querySelector('.new-todo');
const botBorrar = document.querySelector('.clear-completed');

export const crearTodoHtml = (todo) => {
  const htmlTodo = ` 
    <li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${
              todo.completado ? 'checked' : ''
            }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

  const div = document.createElement('div');
  div.innerHTML = htmlTodo;
  divTodoList.append(div.firstElementChild);
  return div.firstElementChild;
};

//Eventos

txtImput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13 && txtImput.value.length > 0) {
    const nuevoTodo = new Todo(txtImput.value);
    todoList.nuevoTodo(nuevoTodo);
    crearTodoHtml(nuevoTodo);
    txtImput.value = '';
  }
});

divTodoList.addEventListener('click', (event) => {
  const nombreElemento = event.target.localName; // Imput, Lavel o Button
  const todoElemento = event.target.parentElement.parentElement;
  const todoId = todoElemento.getAttribute('data-id');

  if (nombreElemento.includes('input')) {
    // que hizo Click en el imput tipo checkbox)
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle('completed');
  } else if (nombreElemento.includes('button')) {
    todoList.eliminarTodo(todoId);
    divTodoList.removeChild(todoElemento);
  }
});

botBorrar.addEventListener('click', () => {
  todoList.eliminarCompletados();

  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];

    if (elemento.classList.contains('completed')) {
      divTodoList.removeChild(elemento);
    }
  }
});
