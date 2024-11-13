// 表单验证工具测试
import { validateTodoInput } from '../validation';

describe('验证工具', () => {
  test('空输入验证', () => {
    expect(validateTodoInput('')).toBe(false);
  });

  test('有效输入验证', () => {
    expect(validateTodoInput('有效任务')).toBe(true);
  });
}); 