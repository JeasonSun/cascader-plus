
import { CloseOutlined } from '@ant-design/icons';
import React from 'react';
import { TreeNode } from '../index.d';
import { SelectorProps } from './Selector';

interface TagProps {
  onRemove?: SelectorProps['onRemove'];
  item: TreeNode;
  renderTitle: SelectorProps['renderTitle'];
  closable?: boolean;
}

const Tag = (props: TagProps) => {
  const {
    onRemove,
    item,
    renderTitle = (value: string, item: TreeNode) => undefined,
    closable = true,
  } = props;
  const handleRemove = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(item)
    }
  }

  const value = (item.value || item) as string;
  const title = renderTitle(value, item) || item.title || item;
  return (
    <span className="ant-select-selection-item">
      <span className="ant-select-selection-item-content">{title}</span>
      {closable && (
        <span className="ant-select-selection-item-remove">
          <CloseOutlined onClick={handleRemove} />
        </span>
      )}
    </span>
  )
}

export default Tag;
