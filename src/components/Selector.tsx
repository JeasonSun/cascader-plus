import React, {  Ref, useCallback, useEffect, useLayoutEffect,useRef, useState } from "react";
import { TreeNode } from "../types";
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
    onChange,
    showSearch,
    onSearch,
    filter,
    loadData,
    renderTitle,
    selectLeafOnly,
    getPopupContainer,
    maxTagCount,
    simplify,
    renderMenuItem,
    ...rest
  } = props;

  const {
    selectedItems,
    value: containerValue,
    setPopupVisible,
    setSearchInputFocus,
    searchInputFocus,
    popupVisible,
    unSimplify,
    unSimplifyValues,
    unSimplifyItems,
  } = CascaderPlusContainer.useContainer();



  const selectedItemsMap = keyBy(selectedItems, 'value');
  const unSimplifyItemsMap = keyBy(unSimplifyItems, 'value');
  const [inputValue, setInputValue] = useState<string>('');
  const [inputWidth, setInputWidth] = React.useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = React.useRef<HTMLDivElement>(null);
  const searchPlaceholder = '请选择或输入搜索';
  const compositionFlag = useRef<boolean>(false);


  const renderItem = useCallback((item: string) => {
    const itemData = unSimplify ? unSimplifyItemsMap[item] : selectedItemsMap[item];
    return (
      <Tag
        key={item}
        onRemove={onRemove}
        item={itemData || item}
        renderTitle={renderTitle}
      />
    )
  }, [selectedItemsMap, renderTitle, onRemove,])

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
    if (!compositionFlag.current) {
      onSearch?.(currentInputValue);
    }
  }, [])

  const onSearchInputBlur = useCallback((e) => {

    setSearchInputFocus(false);
  }, [])

  const onCompositionStart = useCallback((e) => {
    compositionFlag.current = true;
  }, [])

  const onCompositionEnd = useCallback((e) => {
    compositionFlag.current = false;
    onSearchInputChange(e);
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
    if (searchInputFocus || showSearch && popupVisible) {
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
    if (!popupVisible) {
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
              data={unSimplify ? unSimplifyValues : values}
              renderItem={renderItem}
              renderRest={renderRest}
              maxCount={maxTagCount}
              suffix={
                showSearch ? (
                  <div style={{ position: 'relative', maxWidth: '100%' }}>
                    <input
                      style={{
                        ...inputStyle,
                        width: inputWidth,
                        minWidth: 130,
                        maxWidth: '100%',
                      }}
                      value={inputValue}
                      placeholder={searchPlaceholder}
                      onClick={onSearchInputClick}
                      onChange={onSearchInputChange}
                      onBlur={onSearchInputBlur}
                      onFocus={onSearchInputFocus}
                      onCompositionStart={onCompositionStart}
                      onCompositionEnd={onCompositionEnd}
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
              placeholder={showSearch ? searchPlaceholder : placeholder}
              style={{
                ...inputStyle,
                minWidth: 130,
                maxWidth: '100%',
                backgroundColor: "none"
              }}
              disabled={!showSearch}
              readOnly={!showSearch}
              onClick={onSearchInputClick}
              onChange={onSearchInputChange}
              onBlur={onSearchInputBlur}
              onFocus={onSearchInputFocus}
              onCompositionStart={onCompositionStart}
              onCompositionEnd={onCompositionEnd}
              ref={inputRef}
            />
        }
      </div>
      <span className="ant-select-arrow">
        <DownOutlined />
      </span>
    </div>
  )
}

export default Selector;
