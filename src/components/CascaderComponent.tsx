import React, { useCallback, useEffect, useRef, useState } from 'react';
import Trigger from 'rc-trigger';
import { ConfigContext } from 'antd/lib/config-provider';
import { CascaderPlusProps } from './CascaderPlus';
import CascaderPlusContainer from '../container';
import { prefix } from '../constants';
import Popup from './Popup';
import BUILT_IN_PLACEMENTS from '@/libs/placement';
import Selector from './Selector';
import { TreeNode } from '../index.d';
import { reconcile } from '@/libs/utils';
import PopupSearch from './PopupSearch';

const CascaderComponent = React.memo(
  React.forwardRef((props: CascaderPlusProps, ref) => {
    const { getPopupContainer: getContextPopupContainer } = React.useContext(ConfigContext);
    const selectorRef = useRef(null);
    const {
      disabled,
      popupTransitionName = 'slide-up',
      getPopupContainer,
      showSearch
    } = props;

    const {
      popupVisible,
      setPopupVisible,
      flattenData,
      value,
      resetMenuState,
      triggerChange,
      triggerSearchChange,
      searchValue,
    } = CascaderPlusContainer.useContainer();

    const visibleChange = (visible: boolean) => {

      setPopupVisible(visible);
    }

    const handleItemRemove = useCallback(
      (item: TreeNode | string) => {
        let nextValue: string[];
        if (typeof item === 'string') {
          nextValue = value.filter((v: string) => v !== item)
        } else {
          nextValue = reconcile(item, false, value)
        }

        triggerChange(nextValue);
      }, [value, triggerChange])

    const handleClear = () => { }

    const handleSearch = useCallback((value: String) => {
      triggerSearchChange(value);
    }, [])

    return (
      <Trigger
        action={!disabled ? ['click'] : []}
        prefixCls={prefix}
        popup={
          showSearch && searchValue ? <PopupSearch {...props} /> : <Popup {...props} />
        }
        popupVisible={disabled ? false : popupVisible}
        onPopupVisibleChange={visibleChange}
        popupStyle={{
          position: 'absolute',
          zIndex: 1050
        }}
        builtinPlacements={BUILT_IN_PLACEMENTS}
        popupPlacement="bottomLeft"
        // popupTransitionName={popupTransitionName}
        getPopupContainer={getPopupContainer || getContextPopupContainer}
      >

        <Selector
          forwardRef={selectorRef}
          onRemove={handleItemRemove}
          onClear={handleClear}
          onSearch={handleSearch}
          {...props}
        />
      </Trigger>
    )
  })
)


export default CascaderComponent;
