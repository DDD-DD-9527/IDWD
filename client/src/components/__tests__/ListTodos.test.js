import { render, fireEvent, waitFor } from '@testing-library/react';
import ListTodos from '../ListTodos';

describe('ListTodos Component', () => {
  const mockTodos = [
    { todo_id: 1, description: '任务1' },
    { todo_id: 2, description: '任务2' },
  ];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTodos),
      })
    );
  });

  // 渲染测试
  test('should render todo list', async () => {
    const { getByText, getAllByText } = render(<ListTodos />);
    
    await waitFor(() => {
      expect(getByText('任务1')).toBeInTheDocument();
      expect(getByText('任务2')).toBeInTheDocument();
      expect(getAllByText('Edit')).toHaveLength(2);
      expect(getAllByText('Delete')).toHaveLength(2);
    });
  });

  // 删除功能测试
  test('should delete todo', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      })
    );

    const { getAllByText } = render(<ListTodos />);
    
    await waitFor(() => {
      const deleteButtons = getAllByText('Delete');
      fireEvent.click(deleteButtons[0]);
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:5000/todos/1',
        { method: 'DELETE' }
      );
    });
  });

  // 加载失败测试
  test('should handle fetch error', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    global.fetch = jest.fn(() => Promise.reject('API Error'));

    render(<ListTodos />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
}); 