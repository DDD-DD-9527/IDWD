// Todo 组件测试
import { render, screen } from '@testing-library/react';
import InputTodo from '../InputTodo';

describe('InputTodo 组件', () => {
  test('应该正确渲染', () => {
    render(<InputTodo />);
    expect(screen.getByPlaceholderText('添加任务...')).toBeInTheDocument();
  });
});