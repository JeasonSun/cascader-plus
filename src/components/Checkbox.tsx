import React, { useCallback } from "react";
import { Checkbox } from 'antd';
import { MenuItemProps } from "./MenuItem";
import CascaderPlusContainer from '../container';
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { hasChildChecked, hasParentChecked } from "@/libs/utils";

export default React.memo((props: Pick<MenuItemProps, 'node'>) => {
  const { node } = props;
  const {
    value: containerValue,
    handleSelectChange
  } = CascaderPlusContainer.useContainer();


  const handleClick = useCallback((event: any) => {
    event.stopPropagation();
  }, [])

  const handleChange = useCallback((event: CheckboxChangeEvent) => {
    const { checked } = event.target;
    handleSelectChange(node, checked);
  }, [node])

  //判断是否有父节点（包括自己）有被选中,如果在value中有自己的value，那么就是选中的。
  const checked = hasParentChecked(node, containerValue);


  const indeterminate = !checked && hasChildChecked(node, containerValue)

  return (
    <Checkbox
      onClick={handleClick}
      onChange={handleChange}
      checked={checked}
      indeterminate={indeterminate}
    />
  )
})
