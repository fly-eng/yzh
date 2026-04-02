def bubble_sort(arr):
    """
    冒泡排序算法
    
    参数:
        arr: 待排序的列表
    返回:
        排序后的新列表（不修改原列表）
    """
    # 创建副本，不修改原列表
    result = arr.copy()
    n = len(result)
    
    for i in range(n):
        # 标记本轮是否发生交换
        swapped = False
        
        # 每轮将最大的元素冒泡到末尾
        for j in range(0, n - i - 1):
            if result[j] > result[j + 1]:
                # 交换相邻元素
                result[j], result[j + 1] = result[j + 1], result[j]
                swapped = True
        
        # 如果没有发生交换，说明已经有序，提前退出
        if not swapped:
            break
    
    return result


def bubble_sort_inplace(arr):
    """
    原地冒泡排序（修改原列表）
    
    参数:
        arr: 待排序的列表
    """
    n = len(arr)
    
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        if not swapped:
            break


# 示例用法
if __name__ == "__main__":
    # 测试数据
    test_list = [64, 34, 25, 12, 22, 11, 90]
    print(f"原始列表: {test_list}")
    
    # 方法1: 返回新列表
    sorted_list = bubble_sort(test_list)
    print(f"排序后(新列表): {sorted_list}")
    print(f"原列表不变: {test_list}")
    
    # 方法2: 原地排序
    bubble_sort_inplace(test_list)
    print(f"原地排序后: {test_list}")
