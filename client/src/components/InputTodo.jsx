import React, { Fragment, useState } from "react";
import { api } from '../config/api'

/**
 * 待办事项输入组件
 * 允许用户添加新的待办事项
 */
const InputTodo = () => {
  // 状态管理
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /**
   * 表单提交处理函数
   * @param {Event} e - 表单提交事件
   */
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { title, description };
      const response = await fetch(api.todos.create(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      // 重新加载页面以显示新添加的项目
      window.location = "/";
    } catch (err) {
      console.error("Error adding todo:", err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Todo List</h1>
      <form className="d-flex flex-column mt-5" onSubmit={onSubmitForm}>
        {/* 标题输入框 */}
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <div className="d-flex">
          {/* 描述输入框 */}
          <input
            type="text"
            className="form-control"
            placeholder="Enter description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          {/* 提交按钮 */}
          <button className="btn btn-success ms-2">Add</button>
        </div>
      </form>
    </Fragment>
  );
};

export default InputTodo;
