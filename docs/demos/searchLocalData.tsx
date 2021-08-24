/**
 * title: 搜索
 * desc: 通过设置showSearch为true，可以开启组件的搜索功能。
 *
 */
import React, { useState } from 'react';
import CascaderPlus from 'cascader-plus';
import 'antd/dist/antd.css';

const DefaultDemo = () => {
  const [data] = useState([
    {
      value: 'Node1',
      title: "Node1",
      children: [
        {
          value: 'Node1-1',
          title: 'Node1-1',
        },
        {
          value: 'Node1-2',
          title: 'Node1-2',
        },
      ],
    },
    {
      value: 'Node2',
      title: 'Node2',
    },
    {
      value: 'Node3',
      title: 'Node3',
      children: [
        {
          value: 'Node3-1',
          title: 'Node3-1',
        },
        {
          value: 'Node3-2',
          title: 'Node3-2',
          children: [
            {
              value: 'Node3-2-1',
              title: 'Node3-2-1',
            },
            {
              value: 'Node3-2-2',
              title: 'Node3-2-2',
            },
            {
              value: 'Node3-2-3',
              title: 'Node3-2-3',
            },
            {
              value: 'Node3-2-4',
              title: 'Node3-2-4',
            },
            {
              value: 'Node3-2-5',
              title: 'Node3-2-5',
            },
          ]
        },
      ],
    },
  ]);



  return (
    <>
      <CascaderPlus
        data={data}
        showSearch
      />
    </>
  );
};

export default DefaultDemo;
