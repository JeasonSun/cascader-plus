import React from 'react';
import { CascaderPlusProps } from "./CascaderPlus";
import CascaderPlusContainer from '../container';
import { prefix } from '../constants';
import Column from './Column';
import { TreeNode } from '../types';

const Menu = (props: CascaderPlusProps) => {
  const { columnWidth } = props;
  const { menuData } = CascaderPlusContainer.useContainer();

  return (
    <div className={`${prefix}-menu`}>
      {
        menuData.map((item: TreeNode[], index: number) => {
          return (
            <Column
              item={item}
              columnWidth={columnWidth}
              depth={index}
              key={item[0]?.value || index}
            />
          )
        })
      }
    </div>
  )
}

export default Menu;
