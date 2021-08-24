/**
 * title: 合并展示选项
 * desc: simplify默认为true，举例来说，开启后当四川省下所有的市都被选中时，输入框中仅展示四川省，不会展开各个具体的市。可以通过设置simplify为false，不合并展示选项。
 *
 */

import React, { useState } from 'react';
import CascaderPlus, { TreeNode } from 'cascader-plus';
import 'antd/dist/antd.css';

const DefaultDemo = () => {
  const [data] = useState(
    [
      {
        value: '330000',
        title: '浙江省',
        children: [
          {
            value: '330100',
            title: '杭州市',
            children: [
              {
                value: '330106',
                title: '西湖区',
              },
              {
                value: '330107',
                title: '余杭区',
              },
            ],
          },
          {
            value: '330200',
            title: '温州市',
            children: [
              {
                value: '330206',
                title: '龙湾区',
              },
            ],
          },
        ],
      },
      {
        value: '120000',
        title: '新疆维吾尔自治区',
        children: [
          {
            value: '120100',
            title: '博尔塔拉蒙古自治州',
          },
        ],
      },
    ]
  );


  return (
    <>
      <CascaderPlus
        data={data}
        simplify={false}
      />
    </>
  );
};

export default DefaultDemo;
