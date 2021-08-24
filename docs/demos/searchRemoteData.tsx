/**
 * title: 异步搜索
 * desc: 通过设置showSearch为true，并且添加filter方法异步获取推荐数据。
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


  const filterData = (key: string) => {
    return new Promise((resolve, reject) => {
       setTimeout(() => {
        const res = [];
        for(let i =0;i< 5;i++){
          const item = {
            value: `Node-${key}-${i}`,
            title: `Node-${key}-${i}`,
          }
          res.push(item);
        }
        resolve(res)
      }, 1000)
    })
  }



  return (
    <>
      <CascaderPlus
        data={data}
        showSearch
        filter={filterData}
      />
    </>
  );
};

export default DefaultDemo;
