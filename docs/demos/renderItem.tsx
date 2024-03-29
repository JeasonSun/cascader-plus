/**
 * title: 自定义Item渲染
 * desc: 通过renderMenuItem自定义MenuItem的label显示部分
 *
 */
import React, { useState } from 'react';
import CascaderPlus, {TreeNode} from 'cascader-plus';

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

  const renderMenuItem = (node: TreeNode) => {

    return (
      <span >
        {node.title}（id: {node.value}）
      </span>
      )
  }

  return (
    <>
      <CascaderPlus
        data={data}
        renderMenuItem={ renderMenuItem}
      />
    </>
  );
};

export default DefaultDemo;
