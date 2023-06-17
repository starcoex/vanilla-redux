// import React from "react";
// import ReactDOM from "react-dom/client";

import { legacy_createStore } from "@reduxjs/toolkit";
import { type } from "os";
import React, { ButtonHTMLAttributes, ChangeEvent } from "react";

// import App from "./App";

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
type ActionUnio = {
  type: "ADD" | "MINUS";
};

interface IActionPros {
  type: string;
  text?: string;
  id: number;
}

const addTodo = (text) => {
  return {
    type: ADD_TODO,
    text: text,
    id: Date.now(),
  };
};
const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id: id,
  };
};

const form = document.getElementById("todo_form");
const input = document.getElementById("todo_input") as HTMLInputElement | null;
const button = document.getElementById("todo_button");
const ul = document.getElementById("todo_text");
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const reducer = (state: any = [], action: IActionPros) => {
  console.log(state, action);
  switch (action.type) {
    case ADD_TODO:
      const newTodoObj = { text: action.text, id: action.id };
      return [newTodoObj, ...state];
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};
const store = legacy_createStore(reducer);
console.log(store.getState());

const dispatchDlelteTodo = (e: any) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteTodo(id));
};
const dispatchAddTodo = (text) => {
  store.dispatch(addTodo(text));
};

const paintTodos = () => {
  const todos = store.getState();
  ul.innerText = "";
  todos.map((todo) => {
    const li = document.createElement("li");
    li.innerText = todo;
    const button = document.createElement("button");
    button.innerText = "del";
    button.addEventListener("click", dispatchDlelteTodo);
    li.id = todo.id;
    li.innerText = todo.text;
    ul.appendChild(li);
    li.appendChild(button);
  });
};
store.subscribe(paintTodos);
// const createTodo = (todo: string) => {
//   const li = document.createElement("li");
//   li.innerText = todo;
//   ul.appendChild(li);
//   deleteTodo(li);
// };
// const deleteTodo = (li) => {
//   const button = document.createElement("button");
//   button.innerText = "del";
//   li.appendChild(button);
// };
const hadleChangeValue = (e: any) => {
  const value = e.currentTarget.value;
  dispatchAddTodo(value);
  // store.dispatch({ type: ADD_TODO, text: value, id: Date.now() });
  input.value = "";
};
const handleSubmit = (e: SubmitEvent) => {
  e.preventDefault();
};

form.addEventListener("submit", handleSubmit);
input.addEventListener("change", hadleChangeValue);
