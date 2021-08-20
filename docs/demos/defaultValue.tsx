import React, { useState } from 'react';
import CascaderPlus from 'cascader-plus';
import { UnorderedListOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const DefaultDemo = () => {
  const [data] = useState([
    {
      value: 'Node1',
      title: (
        <>
          <UnorderedListOutlined /> Node1
        </>
      ),
      children: [
        {
          value: 'Node1-1',
          title: (
            <>
              <UnorderedListOutlined /> Node1-1
            </>
          ),
        },
        {
          value: 'Node1-2',
          title: (
            <>
              <UnorderedListOutlined /> Node1-2
            </>
          ),
        },
      ],
    },
    {
      value: 'Node2',
      title: 'Node2',
    },
    {
      value: 'Node3',
      title: (
        <>
          <UnorderedListOutlined /> Node3
        </>
      ),
      children: [
        {
          value: 'Node3-1',
          title: (
            <>
              <UnorderedListOutlined /> Node3-1
            </>
          ),
        },
        {
          value: 'Node3-2',
          title: (
            <>
              <UnorderedListOutlined /> Node3-2
            </>
          ),
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

  const [value, setValue] = useState<string[]>(['Node1-1']);

  const onValueChange = (values: string[]) => {
    console.log(values)

  }

  return (
    <>
      <CascaderPlus
        data={data}
        defaultValue={value}
        onChange= {onValueChange}
      />
    </>
  );
};

export default DefaultDemo;
