import React from "react";
import "./App.css";

import { ErrorBoundary } from "./components/ErrorBoundary";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {
  return (
    <ErrorBoundary>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </ErrorBoundary>
  );
}

export default App;