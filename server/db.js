/**
 * 数据库连接配置文件
 * 使用 pg 模块创建 PostgreSQL 连接池
 */

const Pool = require("pg").Pool;
require('dotenv').config();  // 加载环境变量

/**
 * 创建数据库连接池
 * 优先使用环境变量中的配置，如果没有则使用默认值
 */
const pool = new Pool({
  // 数据库用户名
  user: process.env.DB_USER || "postgres",
  
  // 数据库密码
  password: process.env.DB_PASSWORD || "postgres",
  
  // 数据库主机地址
  host: process.env.DB_HOST || "localhost",
  
  // 数据库端口
  port: process.env.DB_PORT || 5434,
  
  // 数据库名称
  database: process.env.DB_NAME || "idwd_db",
  
  // 连接超时时间（毫秒）
  connectionTimeoutMillis: 5000,
  
  // 空闲连接超时时间（毫秒）
  idleTimeoutMillis: 30000,
  
  // 连接池最大连接数
  max: 20
});

/**
 * 错误处理
 * 监听连接池的错误事件
 */
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// 导出连接池实例
module.exports = pool;

/**
 * 使用示例:
 * 
 * const pool = require('./db');
 * 
 * async function example() {
 *   try {
 *     const result = await pool.query('SELECT * FROM todos');
 *     console.log(result.rows);
 *   } catch (err) {
 *     console.error('Error executing query', err);
 *   }
 * }
 */
