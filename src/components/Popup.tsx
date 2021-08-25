import React, { useRef } from "react";
import { Empty } from 'antd'
import { CascaderPlusProps } from "./CascaderPlus";
import { prefix } from '../constants';
import Menu from './Menu';

export interface PopupProps extends CascaderPlusProps { }
const Popup = (props: PopupProps) => {
  const ref = useRef(null);
  const {
    data,
  } = props;

  return (
    <div className={`${prefix}-popup`} ref={ref}>
      {
        data && data.length ? (
          <>
            <Menu />
          </>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )
      }
    </div>
  )
}

export default Popup;
