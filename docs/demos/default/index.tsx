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
  ]);

  return (
    <>
      <CascaderPlus
        data={data}
      />
    </>
  );
};

export default DefaultDemo;
