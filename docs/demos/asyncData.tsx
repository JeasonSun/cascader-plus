/**
 * title: 动态加载数据
 * desc: 通过接口获取下一级数据
 *
 */
import React, { useState } from 'react';
import CascaderPlus, { TreeNode } from 'cascader-plus';
import 'antd/dist/antd.css';

const DefaultDemo = () => {
  const [data] = useState([
    {
      value: 'Node1',
      title: 'Node1-title',
      isLeaf: false,
    },
    {
      value: 'Node2',
      title: 'Node2-title',
    },
  ]);

  const loadData = React.useCallback((node: TreeNode) => new Promise((resolve, reject) => {
    console.log('动态加载数据')
    setTimeout(() => {
      // parent?: TreeNode | null
      // children?: TreeNode[]
      // value: ValueType
      // title: React.ReactNode
      // isLeaf?: boolean
      const { value, title } = node;
      const children:TreeNode[] = []
      for (let i = 0; i < 10; i++) {
        const child: TreeNode = {
          value: `Dynamic-${value}-${i}`,
          title: `Dynamic-${title}-${i}`,
          isLeaf: i ===1? false: true
        }
        children.push(child);
      }
      resolve([children, node]);
    }, 2000)
  }), [])



  return (
    <>
      <CascaderPlus
        data={data}
        loadData={loadData}
      />
    </>
  );
};

export default DefaultDemo;
