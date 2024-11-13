// PostgreSQL 连接池模拟
const mockPool = {
  query: jest.fn(),
  connect: jest.fn(),
  end: jest.fn(),
};

class Pool {
  constructor() {
    return mockPool;
  }
}

module.exports = { Pool }; 