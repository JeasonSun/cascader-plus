---
order: 3
---

## API

| 参数           | 说明                             | 类型                                                        | 默认值 | 版本 |
| -------------- | -------------------------------- | ----------------------------------------------------------- | ------ | ---- |
| defaultValue   | 默认选中值                       | ValueType[]                                                 | []     |      |
| data           | 可选项数据源                     | TreeNode[]                                                  | []     |      |
| className      | 自定义类名                       | string                                                      | -      |      |
| disabled       | 禁用                             | boolean                                                     | false  |      |
| showSearch     | 允许搜索                         | boolean                                                     | false  |      |
| simplify       | 合并选中值展示                   | boolean                                                     | true   |      |
| selectLeafOnly | 只选中叶子节点                   | boolean                                                     | false  |      |
| onChange       | 选择完成后的回调                 | (values: ValueType[], selectedItems?: TreeNode[]) => void;  | -      |      |
| loadData       | 用于动态加载选项                 | (node:TreeNode) => Promise<[TreeNode[], TreeNode]>          | -      |      |
| filter         | 筛选符合条件的数据               | (value: String) => Promise<TreeNode[]>                      | -      |      |
| renderTitle    | 自定义选中值的渲染               | (value: string, item: TreeNode) => ReactNode                | -      |      |
| renderMenuItem | 自定义 dropMenu 部分的 Item 渲染 | (item: TreeNode) => ReactNode;(item: TreeNode) => ReactNode | -      |

## Interface

### ValueType

```typescript

type ValueType = string

```

### TreeNode

```typescript

type TreeNode = {
  parent?: TreeNode | null;
  children?: TreeNode[];
  value: ValueType;
  title: string;
  isLeaf?: boolean;
  _titles?: (string|undefined)[];
}
```
