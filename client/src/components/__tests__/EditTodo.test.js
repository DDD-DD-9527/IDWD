import { render, fireEvent, waitFor } from '@testing-library/react';
import EditTodo from '../EditTodo';

describe('EditTodo Component', () => {
  const mockTodo = {
    todo_id: 1,
    description: '测试任务',
  };

  // 渲染测试
  test('should render edit button and modal', () => {
    const { getByText, getByRole } = render(<EditTodo todo={mockTodo} />);
    
    expect(getByText('Edit')).toBeInTheDocument();
    expect(getByRole('dialog')).toBeInTheDocument();
  });

  // 打开模态框测试
  test('should open modal with current todo', () => {
    const { getByText, getByRole } = render(<EditTodo todo={mockTodo} />);
    const editButton = getByText('Edit');
    
    fireEvent.click(editButton);
    const input = getByRole('textbox');
    expect(input.value).toBe('测试任务');
  });

  // 编辑内容测试
  test('should update description in modal', () => {
    const { getByRole } = render(<EditTodo todo={mockTodo} />);
    const input = getByRole('textbox');
    
    fireEvent.change(input, { target: { value: '修改后的任务' } });
    expect(input.value).toBe('修改后的任务');
  });

  // 提交更新测试
  test('should submit updated todo', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ todo_id: 1, description: '修改后的任务' }),
      })
    );

    const { getByText, getByRole } = render(<EditTodo todo={mockTodo} />);
    const editButton = getByText('Edit');
    
    fireEvent.click(editButton);
    const input = getByRole('textbox');
    const submitButton = getByText('Edit').closest('button');

    fireEvent.change(input, { target: { value: '修改后的任务' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:5000/todos/1',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ description: '修改后的任务' }),
        }
      );
    });
  });

  // 关闭模态框测试
  test('should reset description when closing modal', () => {
    const { getByText, getByRole } = render(<EditTodo todo={mockTodo} />);
    const input = getByRole('textbox');
    const closeButton = getByText('Close');
    
    fireEvent.change(input, { target: { value: '修改后的任务' } });
    fireEvent.click(closeButton);
    
    expect(input.value).toBe('测试任务');
  });
}); 