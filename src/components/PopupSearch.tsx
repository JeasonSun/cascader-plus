import React, { useRef } from "react";
import { Empty } from 'antd';
import { CascaderPlusProps } from "./CascaderPlus";
import CascaderPlusContainer from '../container';
import { prefix } from '../constants';
import { TreeNode } from "../index.d";
import Checkbox from "./Checkbox";

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
              <Checkbox node={item}/>
                <p className={`${prefix}-popup-search-item-label`}>{item.title}</p>

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
