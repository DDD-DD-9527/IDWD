import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      if (!title.trim()) {
        alert("Title is required!");
        return;
      }

      const body = { 
        title: title.trim(), 
        description: description.trim() 
      };

      console.log("Sending data:", body);

      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      setTitle("");
      setDescription("");

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Todo List</h1>
      <form onSubmit={onSubmitForm} style={{ margin: '20px 0' }}>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter title (required)"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter description (optional)"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-success">Add</button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default InputTodo;
