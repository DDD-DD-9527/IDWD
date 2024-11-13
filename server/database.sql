
-- 删除已存在的表（如果存在）
DROP TABLE IF EXISTS todos;

-- 创建 todos 表
CREATE TABLE todos (
    -- 主键，自增
    id SERIAL PRIMARY KEY,
    
    -- 标题：不能为空，最大长度255
    title VARCHAR(255) NOT NULL,
    
    -- 描述：可选，文本类型
    description TEXT,
    
    -- 完成状态：布尔值，默认false
    completed BOOLEAN DEFAULT FALSE,
    
    -- 创建时间：带时区的时间戳，默认当前时间
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- 更新时间：带时区的时间戳，默认当前时间
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 创建触发器：在更新记录时自动更新 updated_at
CREATE TRIGGER update_todos_updated_at
    BEFORE UPDATE ON todos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 添加一些测试数据
INSERT INTO todos (title, description) VALUES 
    ('完成项目文档', '编写详细的项目说明文档'),
    ('代码审查', '审查团队成员的代码提交'),
    ('单元测试', '为新功能编写单元测试');

-- 添加注释
COMMENT ON TABLE todos IS '待办事项表';
COMMENT ON COLUMN todos.id IS '主键ID';
COMMENT ON COLUMN todos.title IS '待办事项标题';
COMMENT ON COLUMN todos.description IS '待办事项描述';