import { TreeNode, ValueType } from '../index.d';
import { All } from '../index';

// 平铺树结构， 方便根据value（字符串）获取到所有的NodeItem 节点
// 添加parent链接到父节点

export function flattenTree(root: TreeNode[]): TreeNode[] {
  const res: TreeNode[] = [];

  function dfs(nodes: TreeNode[], parent: TreeNode | null = null) {
    if (!nodes) {
      return;
    }

    const newChildren: TreeNode[] = [];

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const { children } = node;
      const newNode = {
        ...node,
        parent
      }
      res.push(newNode);
      newChildren.push(newNode);
      if (children) {
        dfs(children, newNode)
      }
    }

    if (parent) {
      parent.children = newChildren;
    }
  }

  dfs(root);

  return res;
}

// 是否有子节点（包括自己）被选中
export function hasChildChecked(
  item: TreeNode,
  curValue: ValueType[]
): boolean{
  function dfs(node:TreeNode): boolean {
    if(!node){
      return false;
    }
    const {value, children } = node;
    if(curValue.includes(value)){
      return true;
    }
    if(!children){
      return false;
    }
    return children.some((child: TreeNode) => dfs(child));
  }

  return dfs(item);
}

// 判断是否有父节点（包括自己）有被选中
export function hasParentChecked(item: TreeNode, value: ValueType[]): boolean {
  let tmp: TreeNode | null | undefined = item;
  while (tmp) {
    if (value.includes(tmp.value)) {
      return true;
    }
    tmp = tmp.parent
  }
  return false;
}

// 删除所有的子孙节点的value, 不包含自己。
export function removeAllDescendanceValue(
  root: TreeNode,
  value: ValueType[]
): ValueType[] {
  const allChildrenValue: ValueType[] = [];
  function dfs(node: TreeNode): void {
    if (node.children) {
      node.children.forEach((item) => {
        allChildrenValue.push(item.value);
        dfs(item)
      })
    }
  }
  dfs(root);
  return value.filter((val) => !allChildrenValue.includes(val));
}

// 状态提升
export function liftTreeState(
  item: TreeNode,
  curVal: ValueType[]
): ValueType[] {
  const { value } = item;

  // 加入当前节点value
  const nextValue = curVal.concat(value);
  let last = item;

  while (true) {
    // 如果父节点的所有子节点都已经checked，添加该节点value,继续尝试提升。
    if (last?.parent?.children!.every((child: TreeNode) => nextValue.includes(child.value))) {
      nextValue.push(last.parent.value);
      last = last.parent;
    } else {
      break;
    }
  }
  // 移除最后一个满足 checked的父节点的所有子孙节点value
  return removeAllDescendanceValue(last, nextValue);
}

// 状态下沉: TODO:
export function sinkTreeState(
  root: TreeNode,
  value: ValueType[]
): ValueType[] {
  const parentValues: ValueType[] = []
  const subTreeValues: ValueType[] = []

  function getCheckedParent(
    node: TreeNode | null | undefined
  ): TreeNode | null {
    if (!node) {
      return null
    }
    parentValues.push(node.value)
    if (value.includes(node.value)) {
      return node
    }

    return getCheckedParent(node.parent)
  }

  const checkedParent = getCheckedParent(root)
  if (!checkedParent) {
    return value
  }

  function dfs(node: TreeNode) {
    if (!node.children || node.value === root.value) {
      return
    }
    node.children.forEach((item: TreeNode) => {
      if (item.value !== root.value) {
        if (parentValues.includes(item.value)) {
          dfs(item)
        } else {
          subTreeValues.push(item.value)
        }
      }
    })
  }
  dfs(checkedParent)
  // 替换 checkedParent 下子树的值
  const nextValue = removeAllDescendanceValue(checkedParent, value).filter(
    (item) => item !== checkedParent.value
  )
  return Array.from(new Set(nextValue.concat(subTreeValues)))
}

export function reconcile(
  item: TreeNode,
  checked: boolean,
  value: ValueType[]
): ValueType[] {
  if (checked) {
    // 如果父节点已经被checked，那么它的子节点一定都是checked，可以直接忽略。
    // 主要是用来避免初始化时候传入的value结构不合理的情况。
    if (hasParentChecked(item, value)) {
      return value;
    }
    return liftTreeState(item, value);
  }
  return sinkTreeState(item, value);
}


// 按树的 dfs 前序排
export function sortByTree(value: ValueType[], flattenData: TreeNode[]) {
  // 按照树结构前顺排序
  const map = flattenData.reduce(
    (cur: Record<string, number>, node: TreeNode, index: number) => {
      cur[node.value] = index
      return cur
    },
    {}
  )
  return value.sort((a, b) => map[a] - map[b] || 0)
}

//
export function transformValue(value: ValueType[], flattenData: TreeNode[]): ValueType[] {
  let nextValue: ValueType[] = [];
  if (value.some((v) => v === All)) {
    return [All];
  }
  for (let i = 0; i < value.length; i++) {
    const node = flattenData.find((item) => item.value === value[i])
    if (node) {
      // TODO: 选中后需要整合数据
      nextValue = reconcile(node, true, nextValue)
    } else {
      nextValue.push(value[i])
    }
  }
  return sortByTree(nextValue, flattenData)
}
