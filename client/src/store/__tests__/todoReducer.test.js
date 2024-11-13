// Redux reducer 测试
import todoReducer from '../todoReducer';

describe('Todo Reducer', () => {
  test('添加任务', () => {
    const initialState = [];
    const action = {
      type: 'ADD_TODO',
      payload: '新任务'
    };

    expect(todoReducer(initialState, action))
      .toEqual([{ id: 1, text: '新任务' }]);
  });
}); 