const { test, expect } = require('@playwright/test');

test.describe('Todo App E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 访问应用
    await page.goto('/');
  });

  // 创建任务测试
  test('should create new todo', async ({ page }) => {
    // 定位输入框和添加按钮
    const input = page.locator('input[type="text"]');
    const addButton = page.locator('button:text("Add")');

    // 输入新任务
    await input.fill('E2E测试任务');
    await addButton.click();

    // 验证任务是否创建成功
    await expect(page.locator('text=E2E测试任务')).toBeVisible();
  });

  // 编辑任务测试
  test('should edit todo', async ({ page }) => {
    // 创建一个任务
    const input = page.locator('input[type="text"]');
    const addButton = page.locator('button:text("Add")');
    await input.fill('待编辑任务');
    await addButton.click();

    // 点击编辑按钮
    const editButton = page.locator('button:text("Edit")').first();
    await editButton.click();

    // 在模态框中编辑任务
    const modalInput = page.locator('.modal input[type="text"]');
    await modalInput.fill('已编辑的任务');
    
    // 保存编辑
    const saveButton = page.locator('.modal button:text("Edit")');
    await saveButton.click();

    // 验证编辑结果
    await expect(page.locator('text=已编辑的任务')).toBeVisible();
  });

  // 删除任务测试
  test('should delete todo', async ({ page }) => {
    // 创建一个任务
    const input = page.locator('input[type="text"]');
    const addButton = page.locator('button:text("Add")');
    await input.fill('待删除任务');
    await addButton.click();

    // 删除任务
    const deleteButton = page.locator('button:text("Delete")').first();
    await deleteButton.click();

    // 验证任务已被删除
    await expect(page.locator('text=待删除任务')).not.toBeVisible();
  });

  // 列表功能测试
  test('should display multiple todos', async ({ page }) => {
    // 创建多个任务
    const input = page.locator('input[type="text"]');
    const addButton = page.locator('button:text("Add")');

    const todos = ['任务1', '任务2', '任务3'];
    for (const todo of todos) {
      await input.fill(todo);
      await addButton.click();
    }

    // 验证所有任务都显示在列表中
    for (const todo of todos) {
      await expect(page.locator(`text=${todo}`)).toBeVisible();
    }
  });

  // 错误处理测试
  test('should handle empty input', async ({ page }) => {
    const addButton = page.locator('button:text("Add")');
    await addButton.click();

    // 验证空输入是否被正确处理
    await expect(page.locator('text=Please enter a todo')).toBeVisible();
  });
}); 