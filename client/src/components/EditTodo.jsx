import React, { Fragment, useState } from "react";
import { api } from '../config/api'

/**
 * 编辑待办事项组件
 * @param {Object} props - 组件属性
 * @param {Object} props.todo - 待办事项对象
 * @param {Function} props.onUpdate - 更新后的回调函数
 */
const EditTodo = ({ todo, onUpdate }) => {
  // 状态管理
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  /**
   * 更新待办事项
   * @param {Event} e - 表单提交事件
   */
  const updateTodo = async e => {
    e.preventDefault();
    try {
      const body = { title, description };
      const response = await fetch(api.todos.update(todo.id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      // 如果提供了回调函数，则调用它
      if (onUpdate) {
        await onUpdate();
      } else {
        window.location = "/";
      }
    } catch (err) {
      console.error("Error updating todo:", err.message);
    }
  };

  return (
    <Fragment>
      {/* 编辑按钮 - 触发模态框 */}
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#id${todo.id}`}
      >
        Edit
      </button>

      {/* 模态框 */}
      <div className="modal" id={`id${todo.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            {/* 模态框头部 */}
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-2"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={e => updateTodo(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
