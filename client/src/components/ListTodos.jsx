import React, { Fragment, useEffect, useState } from "react";
import { api } from '../config/api'
import EditTodo from "./EditTodo";

/**
 * 待办事项列表组件
 * 显示所有待办事项并提供编辑和删除功能
 */
const ListTodos = () => {
  // 状态管理
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * 删除待办事项
   * @param {number} id - 待删除项目的ID
   */
  const deleteTodo = async id => {
    try {
      const response = await fetch(api.todos.delete(id), {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      // 更新状态，移除已删除的项目
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err.message);
      setError(err.message);
    }
  };

  /**
   * 获取所有待办事项
   */
  const getTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(api.todos.getAll());
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error("Error fetching todos:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时获取数据
  useEffect(() => {
    getTodos();
  }, []);

  // 加载状态
  if (loading) {
    return <div>Loading...</div>;
  }

  // 错误状态
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} onUpdate={getTodos} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
