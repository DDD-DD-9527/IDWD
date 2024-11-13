module.exports = {
  // 使用 jsdom 环境模拟浏览器
  testEnvironment: 'jsdom',
  
  // 测试设置文件
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
  // CSS 模块映射
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  
  // 覆盖率收集配置
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js'
  ],
  
  // 测试报告输出目录
  coverageDirectory: 'coverage',
  
  // 测试报告格式
  coverageReporters: ['text', 'html'],
  
  // 测试覆盖率阈值
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}; 