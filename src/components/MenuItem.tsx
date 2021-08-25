import React, { useCallback, useMemo, useState } from 'react';
import classnames from 'classnames';
import { RightOutlined, LoadingOutlined } from '@ant-design/icons';
import { TreeNode } from '../types';
import CascaderPlusContainer from '../container';
import Checkbox from './Checkbox';
import { prefix } from '../constants';


export interface MenuItemProps {
  node: TreeNode;
  depth: number;
}

export default React.memo((props: MenuItemProps) => {
  const { node, depth } = props;
  const { children, value, title, isLeaf } = node;

  const {
    selectLeafOnly,
    menuPath,
    handleCascaderChange,
    renderMenuItem
  } = CascaderPlusContainer.useContainer();

  const [loading, setLoading] = useState<boolean>(false);
  const hasChildren = (children && children.length > 0) || isLeaf === false;
  const checkboxHidden = selectLeafOnly && hasChildren;

  const active = useMemo(
    () => !!menuPath.find((item:TreeNode) => item.value === value),
    [menuPath, value]
  )


  const cls = classnames(`${prefix}-column-item`, {
      [`${prefix}-column-item-active`]: active
  })

  const handleClick = useCallback(() => {
    setLoading(true);
    handleCascaderChange(node, depth);
  }, [node, depth])



  return (
    <li className = {cls} onClick = {handleClick}>
      {checkboxHidden ? null : <Checkbox node={node} />}
      <p
        className={`${prefix}-column-item-label`}
        style={{ paddingLeft: checkboxHidden ? "0px" : '' }}
      >
        <span>{renderMenuItem?.(node) || title}</span>
      </p>
      {!hasChildren ? null : loading && !children?.length ? (
        <LoadingOutlined className={`${prefix}-column-item-icon`} />
      ) : (
        <RightOutlined className={`${prefix}-column-item-icon`} />
      )}
    </li>
  )

})
