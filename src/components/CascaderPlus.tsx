import React, {
  ReactNode
} from 'react';
import CascaderPlusContainer from '../container';
import { TreeNode, ValueType } from '../types';
import CascaderComponent from './CascaderComponent';

import '../index.less';

export interface CascaderPlusProps {
  defaultValue?: ValueType[];
  data?: TreeNode[];
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  simplify?: boolean;
  showSearch?: boolean;

  onChange?: (newValue: ValueType[], selectedItems?: TreeNode[]) => void;
  loadData?: (node:TreeNode) => Promise<[TreeNode[], TreeNode]>;
  filter?: (value: string) => Promise<TreeNode[]>;
  renderTitle?: (value: string, item: TreeNode) => ReactNode | undefined;
  renderMenuItem?:(item: TreeNode) => ReactNode;
  getPopupContainer?: (props: any) => HTMLElement;

  maxTagCount?: number | 'responsive';
  allowClear?: boolean;
  columnWidth?: number;
  selectLeafOnly?: boolean;
  selectAll?: boolean;

}

const CascaderPlus: React.FunctionComponent<CascaderPlusProps> = React.forwardRef((props: CascaderPlusProps, ref) => {
  return (
    <CascaderPlusContainer.Provider initialState={props}>
      <CascaderComponent {...props} ref={ref}/>
    </CascaderPlusContainer.Provider>
  )
})

CascaderPlus.defaultProps = {
  data: [],
  defaultValue: undefined,
  placeholder: '请选择',
  simplify: true
}

export default CascaderPlus;
