import React, { forwardRef, Ref, useCallback } from "react";
import { TreeNode } from "../index.d";
import { CascaderPlusProps } from "./CascaderPlus";
import { Tag } from 'antd';
import {keyBy} from 'lodash';
import CascaderPlusContainer from '../container';
import classNames from "classnames";
import { prefix } from "@/constants";
import Overflow from 'rc-overflow';


export interface SelectorProps extends CascaderPlusProps {
  onRemove: (value: TreeNode) => void;
  onClear: () => void;
  forwardRef?: Ref<HTMLDivElement>
}

const Selector = (props: SelectorProps) => {
  const {
    onRemove,
    placeholder,
    allowClear,
    onClear,
    forwardRef,
    className,
    disabled,
    data,
    selectAll,
    value: valueProps,
    onChange,
    okText,
    cancelText,
    selectAllText,
    onCascaderChange,
    popupTransitionName,
    renderTitle,
    selectLeafOnly,
    getPopupContainer,
    maxTagCount,
    ...rest
  } = props;

  const {
    selectedItems,
    hackValue,
    value: containerValue,

  } = CascaderPlusContainer.useContainer();

  const selectedItemsMap = keyBy(selectedItems, 'value');


  const renderItem = useCallback((item: string) => {
    return (
      <Tag key={selectedItemsMap[item] || item}>
        {item}
      </Tag>
    )
  },[selectedItemsMap, renderTitle, onRemove] )

  const renderRest = useCallback((omittedValues: string[]) => {
      <Tag>
        <span>+{omittedValues.length}...</span>
      </Tag>
  },[])

  // const values = valueProps || hackValue.current || []
  const values = valueProps || containerValue || []


  return (
    <div
      className={
        classNames(
          prefix,
          'ant-select ant-tree-select ant-select-multiple',
          className,
          {
            'ant-select-disabled': disabled,
          }
        )
      }
      ref={forwardRef}
      {...rest}
    >
      <div className="ant-select-selector"
        style={{ paddingRight: !disabled && allowClear ? '24px' : undefined }}
      >
        {
          values.length ? (
            <Overflow
              prefixCls={`${prefix}-overflow`}
              data={values}
              renderItem = {renderItem}
              renderRest = {renderRest}
              maxCount = { maxTagCount}
            />
          ) : (
            <span
              className={`${prefix}-placeholder ant-select-selection-placeholder`}
            >
              {placeholder}
            </span>
          )
        }
      </div>
    </div>
  )
}

export default Selector;
