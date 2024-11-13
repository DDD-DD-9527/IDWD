// Todo 组件测试
import { render, fireEvent, waitFor } from '@testing-library/react';
import InputTodo from '../InputTodo';

describe('InputTodo Component', () => {
  // 渲染测试
  test('should render input form', () => {
    const { getByText, getByRole } = render(<InputTodo />);
    
    expect(getByText('Pern Todo List')).toBeInTheDocument();
    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByText('Add')).toBeInTheDocument();
  });

  // 输入测试
  test('should update input value', () => {
    const { getByRole } = render(<InputTodo />);
    const input = getByRole('textbox');
    
    fireEvent.change(input, { target: { value: '新任务' } });
    expect(input.value).toBe('新任务');
  });

  // 提交测试
  test('should submit new todo', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ todo_id: 1, description: '新任务' }),
      })
    );

    const { getByRole, getByText } = render(<InputTodo />);
    const input = getByRole('textbox');
    const submitButton = getByText('Add');

    fireEvent.change(input, { target: { value: '新任务' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: '新任务' }),
      });
    });
  });
});