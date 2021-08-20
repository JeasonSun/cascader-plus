import React, { useRef } from 'react';
import Trigger from 'rc-trigger';
import { ConfigContext } from 'antd/lib/config-provider';
import { Button } from 'antd'
import { CascaderPlusProps } from './CascaderPlus';
import CascaderPlusContainer from '../container';
import { prefix } from '../constants';
import Popup from './Popup';
import BUILT_IN_PLACEMENTS from '@/libs/placement';
import Selector from './Selector';

const CascaderComponent = React.memo(
  React.forwardRef((props: CascaderPlusProps, ref) => {
    const { getPopupContainer: getContextPopupContainer } = React.useContext(ConfigContext);
    const selectorRef = useRef(null);
    const {
      disabled,
      popupTransitionName = 'slide-up',
      getPopupContainer
    } = props;

    const {
      popupVisible,
      setPopupVisible,
      flattenData,
      value,
      resetMenuState,
      triggerChange,
    } = CascaderPlusContainer.useContainer();


    const visibleChange = (visible: boolean) => {
      // console.log(visible)
      setPopupVisible(visible)
    }
    const handleItemRemove = () => { }

    const handleClear = () => { }

    return (
      <Trigger
        action={!disabled ? ['click'] : []}
        prefixCls={prefix}
        popup={
          <Popup {...props} />
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
          {...props}
        />
      </Trigger>
    )
  })
)


export default CascaderComponent;
