import React, { useRef } from "react";
import { Button, Empty } from 'antd'
import { CascaderPlusProps } from "./CascaderPlus";
import CascaderPlusContainer from '../container';
import { prefix } from '../constants';
import { TreeNode } from "../index.d";


export interface PopupSearchProps extends CascaderPlusProps {

}
const PopupSearch = (props: PopupSearchProps) => {
  const ref = useRef(null);
  const {

  } = props;

  const { searchData } = CascaderPlusContainer.useContainer();

  // console.log('searchData', searchData)

  return (
    <div className={`${prefix}-popup`} ref={ref}>
      {
        searchData && searchData.length ?
          searchData.map((item: TreeNode, index: number) => (
            <div className={`${prefix}-popup-search-item`} key={item.value}>
              {item.title}
            </div>
          ))
          : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )
      }
    </div>
  )
}

export default PopupSearch;
