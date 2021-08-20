import React, { forwardRef, Ref, useCallback } from "react";
import { TreeNode } from "../index.d";
import { CascaderPlusProps } from "./CascaderPlus";
import Tag from './Tag';
import { keyBy } from 'lodash';
import CascaderPlusContainer from '../container';
import classNames from "classnames";
import { prefix } from "@/constants";
import Overflow from 'rc-overflow';
import { DownOutlined } from "@ant-design/icons";


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
    // value: valueProps,
    onChange,
    okText,
    cancelText,
    selectAllText,
    loadData,
    popupTransitionName,
    renderTitle,
    selectLeafOnly,
    getPopupContainer,
    maxTagCount,
    ...rest
  } = props;

  // console.log(rest)

  const {
    selectedItems,
    // hackValue,
    value: containerValue,

  } = CascaderPlusContainer.useContainer();

  const selectedItemsMap = keyBy(selectedItems, 'value');



  const renderItem = useCallback((item: string) => {
    return (
      <Tag
        key={item}
        onRemove={onRemove}
        item={selectedItemsMap[item] || item}
        renderTitle={renderTitle}
      />
    )
  }, [selectedItemsMap, renderTitle, onRemove])

  const renderRest = useCallback((omittedValues: string[]) => {
    <Tag
      closable={false}
      renderTitle={() => <span>+{omittedValues.length}...</span>}
      item={{
        title: '',
        value: '',
      }}
    />
  }, [])

  // const values = valueProps || hackValue.current || []
  const values = containerValue || []


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
        style={{ paddingRight: '24px' }}
      >
        {
          values.length ? (
            <Overflow
              prefixCls={`${prefix}-overflow`}
              data={values}
              renderItem={renderItem}
              renderRest={renderRest}
              maxCount={maxTagCount}
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
      <span className="ant-cascader-picker-arrow">
        <DownOutlined />
      </span>
    </div>
  )
}

export default Selector;
