const pool = require('./db');

async function testDatabase() {
    try {
        // 尝试连接
        const client = await pool.connect();
        console.log('Successfully connected to database');

        // 测试查询
        const result = await client.query('SELECT NOW()');
        console.log('Database time:', result.rows[0]);

        // 测试 todos 表
        const todos = await client.query('SELECT * FROM todos');
        console.log('Todos count:', todos.rowCount);
        console.log('Todos data:', todos.rows);

        client.release();
    } catch (err) {
        console.error('Database connection error:', err.message);
        console.error('Connection details:', {
            host: process.env.DB_HOST || "localhost",
            port: process.env.DB_PORT || 5434,
            database: process.env.DB_NAME || "idwd_db",
            user: process.env.DB_USER || "postgres"
        });
    } finally {
        console.log('Test completed');
        process.exit();
    }
}

// 立即执行测试
console.log('Script started');
testDatabase().catch(err => {
    console.error('Top level error:', err);
    process.exit(1);
});