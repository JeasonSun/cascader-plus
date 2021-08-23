import React, {
  ReactNode
} from 'react';
import CascaderPlusContainer from '../container';
import { TreeNode, ValueType } from '../index.d';
import CascaderComponent from './CascaderComponent';

import '../index.less';

export interface CascaderPlusProps {
  defaultValue?: ValueType[];
  data?: TreeNode[];
  allowClear?: boolean;
  columnWidth?: number;
  placeholder?: string;
  onChange?: (newValue: ValueType[], selectedItems?: TreeNode[]) => void;
  loadData?: (node:TreeNode) => Promise<[TreeNode[], TreeNode]>;
  showSearch?: boolean;
  filter?: (value: String) => Promise<TreeNode[]>;
  selectAll?: boolean;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  searchable?: boolean;
  okText?: string;
  cancelText?: string;
  selectAllText?: string;
  popupTransitionName?: string;
  selectLeafOnly?: boolean;
  renderTitle?: (value: string) => ReactNode | undefined;
  getPopupContainer?: (props: any) => HTMLElement;
  maxTagCount?: number | 'responsive';
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
}

export default CascaderPlus;
