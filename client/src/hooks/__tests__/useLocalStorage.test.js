import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from '../useLocalStorage';

describe('useLocalStorage Hook', () => {
  test('存储和读取数据', () => {
    const { result } = renderHook(() => 
      useLocalStorage('todos', [])
    );

    act(() => {
      result.current[1](['新任务']);
    });

    expect(result.current[0]).toEqual(['新任务']);
  });
}); 