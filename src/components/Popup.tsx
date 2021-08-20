import React, { useRef } from "react";
import { Button, Empty } from 'antd'
import { CascaderPlusProps } from "./CascaderPlus";
import CascaderPlusContainer from '../container';
import { prefix } from '../constants';
import Menu from './Menu';

export interface PopupProps extends CascaderPlusProps {
  onCancel?: () => void;
  onConfirm?: () => void;
  onLayout?: (dom: HTMLDivElement) => void;
}
const Popup = (props:PopupProps) => {
  const ref = useRef(null);
  const {
    data,
    selectAll,
    onCancel,
    onConfirm,
    okText = 'Confirm',
    cancelText = 'Cancel',
    selectAllText = 'All',
  } = props;

  const { flattenData } = CascaderPlusContainer.useContainer();

  return (
    <div className={`${prefix}-popup`} ref={ref}>
      {
        data && data.length?(
          <>
            <Menu/>
          </>
        ):(
          <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE} />
        )
      }
    </div>
  )
}

export default Popup;
