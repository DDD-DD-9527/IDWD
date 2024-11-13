// 测试环境设置
import '@testing-library/jest-dom';
import 'jest-fetch-mock';

// 模拟 window.location
delete window.location;
window.location = {
  reload: jest.fn(),
  href: '/',
};

// 清理所有模拟
afterEach(() => {
  jest.clearAllMocks();
}); 