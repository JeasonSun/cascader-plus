/**
 * title: 只允许选择叶子节点
 * desc: 通过selectLeafOnly设置只允许选择叶子节点。注意：由于simplify默认为true，如果不想合并选择，需要手动设置simplify:false。
 *
 */
import React, { useState } from 'react';
import CascaderPlus from 'cascader-plus';
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
        selectLeafOnly
        simplify={false}
      />
    </>
  );
};

export default DefaultDemo;
