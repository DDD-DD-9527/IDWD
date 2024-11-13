const pool = require('../../db');

describe('Todo Database Queries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 创建任务测试
  test('should create new todo', async () => {
    const mockTodo = {
      todo_id: 1,
      description: '测试任务'
    };
    
    pool.query.mockResolvedValueOnce({
      rows: [mockTodo],
      rowCount: 1
    });

    const result = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      ['测试任务']
    );

    expect(result.rows[0]).toEqual(mockTodo);
    expect(pool.query).toHaveBeenCalledWith(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      ['测试任务']
    );
  });

  // 查询所有任务测试
  test('should get all todos', async () => {
    const mockTodos = [
      { todo_id: 1, description: '任务1' },
      { todo_id: 2, description: '任务2' }
    ];

    pool.query.mockResolvedValueOnce({
      rows: mockTodos,
      rowCount: 2
    });

    const result = await pool.query('SELECT * FROM todo');
    
    expect(result.rows).toEqual(mockTodos);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM todo');
  });

  // 更新任务测试
  test('should update todo', async () => {
    pool.query.mockResolvedValueOnce({
      rowCount: 1
    });

    const result = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      ['更新的任务', 1]
    );

    expect(result.rowCount).toBe(1);
    expect(pool.query).toHaveBeenCalledWith(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      ['更新的任务', 1]
    );
  });

  // 删除任务测试
  test('should delete todo', async () => {
    pool.query.mockResolvedValueOnce({
      rowCount: 1
    });

    const result = await pool.query(
      'DELETE FROM todo WHERE todo_id = $1',
      [1]
    );

    expect(result.rowCount).toBe(1);
    expect(pool.query).toHaveBeenCalledWith(
      'DELETE FROM todo WHERE todo_id = $1',
      [1]
    );
  });
}); 