import React, { forwardRef, Ref, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
  onSearch?: (value: String) => void;
  forwardRef?: Ref<HTMLDivElement>
}

const inputStyle: React.CSSProperties = {
  border: 'none',
  fontSize: 14,
  margin: 0,
  outline: 'none',
  lineHeight: '20px',
  fontFamily: '-apple-system',
  padding: '0 4px',
};

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
    showSearch,
    onSearch,
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

  const {
    selectedItems,
    // hackValue,
    value: containerValue,
    setPopupVisible,
    setSearchInputFocus,
    searchInputFocus,
    popupVisible,
  } = CascaderPlusContainer.useContainer();

  const selectedItemsMap = keyBy(selectedItems, 'value');
  const [inputValue, setInputValue] = useState<string>('');
  const [inputWidth, setInputWidth] = React.useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = React.useRef<HTMLDivElement>(null);


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

  const onSearchInputChange = useCallback((e) => {
    const currentInputValue = e.target.value;
    setInputValue(currentInputValue);
    onSearch?.(currentInputValue);
  }, [])

  const onSearchInputBlur = useCallback((e) => {

    setSearchInputFocus(false);
  }, [])

  const triggerInputFocus = useCallback(() => {
    inputRef?.current?.focus();
    setSearchInputFocus(true);
    setPopupVisible(true);
  }, [searchInputFocus, popupVisible, inputRef]);

  const onSearchInputFocus = useCallback((e) => {
    triggerInputFocus();
  }, [])

  const onSearchInputClick = useCallback((e) => {
    if (searchInputFocus || popupVisible) {
      e.stopPropagation()
    }
  }, [showSearch, searchInputFocus, popupVisible])

  const onSelectFocus = useCallback((e) => {
    if (searchInputFocus || popupVisible) {
      e.stopPropagation()
    }
    if (showSearch && !searchInputFocus) {
      triggerInputFocus();
    }
  }, [showSearch, searchInputFocus, popupVisible]);

  const values = containerValue || [];

  useLayoutEffect(() => {
    const measureWidth = measureRef?.current?.offsetWidth || 4;
    setInputWidth(measureWidth);
  }, [inputValue]);


  useEffect(() => {
    if(!popupVisible){
      setInputValue('');
    }
  }, [popupVisible])

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
        onClick={onSelectFocus}
      >
        {
          values.length ? (
            <Overflow
              prefixCls={`${prefix}-overflow`}
              data={values}
              renderItem={renderItem}
              renderRest={renderRest}
              maxCount={maxTagCount}
              suffix={
                showSearch ? (
                  <div style={{ position: 'relative', maxWidth: '100%' }}>
                    <input
                      style={{
                        ...inputStyle,
                        background: 'rgba(0, 0, 0, 0.1)',
                        width: inputWidth,
                        minWidth: 10,
                        maxWidth: '100%',
                      }}
                      value={inputValue}
                      onClick={onSearchInputClick}
                      onChange={onSearchInputChange}
                      onBlur={onSearchInputBlur}
                      onFocus={onSearchInputFocus}
                      ref={inputRef}
                    />
                    <div
                      style={{
                        ...inputStyle,
                        pointerEvents: 'none',
                        position: 'absolute',
                        left: '-10000000px',
                        top: `200%`,
                      }}
                      ref={measureRef}
                    >
                      {inputValue}
                    </div>
                  </div>
                ) : null
              }
            />
          ) :
            <input
              className={`${prefix}-placeholder`}
              value={inputValue}
              placeholder={placeholder}
              style={{
                ...inputStyle,
                minWidth: 10,
                maxWidth: '100%',
                backgroundColor: "none"
              }}
              disabled={!showSearch}
              readOnly={!showSearch}
              onClick={onSearchInputClick}
              onChange={onSearchInputChange}
              onBlur={onSearchInputBlur}
              onFocus={onSearchInputFocus}
              ref={inputRef}
            />
        }
      </div>
      <span className="ant-cascader-picker-arrow">
        <DownOutlined />
      </span>
    </div>
  )
}

export default Selector;
