const request = require('supertest');
const express = require('express');
const app = require('../../index');
const pool = require('../../db');

describe('Todo API Routes', () => {
  beforeEach(async () => {
    // 清理测试数据
    await pool.query('DELETE FROM todo');
  });

  // 创建任务接口测试
  test('POST /todos - create todo', async () => {
    const res = await request(app)
      .post('/todos')
      .send({
        description: '测试任务'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('todo_id');
    expect(res.body.description).toBe('测试任务');
  });

  // 获取所有任务接口测试
  test('GET /todos - get all todos', async () => {
    // 先创建测试数据
    await pool.query(
      'INSERT INTO todo (description) VALUES ($1)',
      ['测试任务1']
    );
    await pool.query(
      'INSERT INTO todo (description) VALUES ($1)',
      ['测试任务2']
    );

    const res = await request(app).get('/todos');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toHaveLength(2);
  });

  // 获取单个任务接口测试
  test('GET /todos/:id - get single todo', async () => {
    const todo = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      ['测试任务']
    );

    const res = await request(app)
      .get(`/todos/${todo.rows[0].todo_id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.description).toBe('测试任务');
  });

  // 更新任务接口测试
  test('PUT /todos/:id - update todo', async () => {
    const todo = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      ['原始任务']
    );

    const res = await request(app)
      .put(`/todos/${todo.rows[0].todo_id}`)
      .send({
        description: '更新后的任务'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toBe('Todo was updated!');

    // 验证更新结果
    const updatedTodo = await pool.query(
      'SELECT * FROM todo WHERE todo_id = $1',
      [todo.rows[0].todo_id]
    );
    expect(updatedTodo.rows[0].description).toBe('更新后的任务');
  });

  // 删除任务接口测试
  test('DELETE /todos/:id - delete todo', async () => {
    const todo = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      ['待删除任务']
    );

    const res = await request(app)
      .delete(`/todos/${todo.rows[0].todo_id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBe('Todo was deleted!');

    // 验证删除结果
    const deletedTodo = await pool.query(
      'SELECT * FROM todo WHERE todo_id = $1',
      [todo.rows[0].todo_id]
    );
    expect(deletedTodo.rows).toHaveLength(0);
  });

  // 错误处理测试
  test('Error handling', async () => {
    // 测试无效的 ID
    const res = await request(app)
      .get('/todos/999');

    expect(res.statusCode).toBe(404);
  });
}); 