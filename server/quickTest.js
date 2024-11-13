const { Pool } = require('pg');

console.log('Creating pool with configuration...');
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5434,
    database: "idwd_db",
    // 添加超时设置
    connectionTimeoutMillis: 5000,
    query_timeout: 10000,
    statement_timeout: 10000,
    idle_in_transaction_session_timeout: 10000
});

// 添加池事件监听
pool.on('connect', () => {
    console.log('Pool connecting to database...');
});

pool.on('acquire', () => {
    console.log('Client being acquired from pool...');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

(async () => {
    console.log('Test starting...');
    let client;
    
    try {
        console.log('Attempting to connect...');
        client = await pool.connect();
        console.log('Connected successfully!');

        console.log('Executing query...');
        const result = await client.query({
            text: 'SELECT NOW()',
            timeout: 5000
        });
        console.log('Query result:', result.rows[0]);

    } catch (err) {
        console.error('Error details:', {
            message: err.message,
            code: err.code,
            stack: err.stack
        });
    } finally {
        if (client) {
            console.log('Releasing client...');
            client.release();
        }
        console.log('Ending pool...');
        await pool.end();
        console.log('Test completed');
        process.exit(0);
    }
})().catch(err => {
    console.error('Top level error:', err);
    process.exit(1);
});

// 设置全局超时
setTimeout(() => {
    console.error('Global timeout reached - forcing exit');
    process.exit(1);
}, 15000);