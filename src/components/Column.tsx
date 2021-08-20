import React, { useRef, useState, useEffect } from 'react';
import { CascaderPlusProps } from "./CascaderPlus";
import CascaderPlusContainer from '../container';
import { prefix } from '../constants';
import { TreeNode } from '../index.d';
import MenuItem from './MenuItem';

interface ColumnProps {
  item: TreeNode[];
  columnWidth?: number;
  depth: number;
}

const Column = (props: ColumnProps) => {
  const { item, columnWidth, depth } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(columnWidth);

  useEffect(() => {
    const { width: refWidth } = ref.current!.getBoundingClientRect();
    setWidth(refWidth);
  }, [])

  return (
    <div
      className={`${prefix}-column`}
      style={{ width: `${columnWidth || width}px` }}
      ref={ref}
    >
      <ul>
        {
          item.map((node: TreeNode) => {
            return (
              <MenuItem key={node.value.toString()} depth={depth} node={node} />
            )
          })
        }
      </ul>
    </div>
  )
}

export default Column;
