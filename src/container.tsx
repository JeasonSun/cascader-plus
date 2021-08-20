import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { createContainer } from 'unstated-next';
import { TreeNode, ValueType } from './index.d';
import { CascaderPlusProps } from './components/CascaderPlus';
import {
  flattenTree,
  reconcile,
  sortByTree,
  transformValue as originalTransformValue,
} from './libs/utils';
import { All } from './constants';

const useCascader = (params?: CascaderPlusProps) => {
  const {
    data,
    value: valueProp,
    selectAll,
    onChange,
    onCascaderChange
  } = params || {};

  const [popupVisible, setPopupVisible] = useState(false);
  const dataRef = useRef<TreeNode[] | undefined>(data);
  const [flattenData, setFlattenData] = useState<TreeNode[]>((): TreeNode[] => {
    if (selectAll) {
      return flattenTree([
        {
          title: 'All',
          value: All,
          parent: null,
          children: data
        }
      ])
    }
    return flattenTree(data || []);
  });


  const transformValue = useCallback(
    (value: ValueType[]) => {
      const nextValue = originalTransformValue(value, flattenData)

      // TODO:
      // if (onChange && !shallowEqualArray(nextValue, value)) {
      //   requestAnimationFrame(() => triggerChange(nextValue))
      // }

      return nextValue
    },
    [flattenData]
  )

  const [menuPath, setMenuPath] = useState<TreeNode[]>([]);
  const [value, setValue] = useState(transformValue(valueProp || []));
  const hackValue = useRef(value);
  const [menuData, setMenuData] = useState(() => {
    if (selectAll && flattenData.length === 1) {
      return []
    }

    return [
      selectAll
        ? flattenData[0].children!
        : flattenData.filter((item) => !item.parent),
    ]
  })

  // 修改MenuData,如果下级有[]数据，那么添加， 如果没有，删除上次的下级数据。
  const addMenu = useCallback((menu: TreeNode[], index: number) => {
    if (menu && menu.length) {
      setMenuData((prevMenuData) => [...prevMenuData.slice(0, index), menu])
    } else {
      setMenuData((prevMenuData) => [...prevMenuData.slice(0, index)])
    }
  }, [])

  const selectedItems = useMemo(() => {
    return flattenData.filter((node: TreeNode) => {
      return (valueProp || value).includes(node.value);
    })

  },[flattenData, valueProp, popupVisible, value])

  const triggerChange = useCallback(
    (nextValue: ValueType[]) => {
      // if(onChange){
      //   onChange(nextValue, selectedItems.slice(0))
      // }
      // hackValue.current = nextValue;
      setValue(nextValue);
      setPopupVisible(false);
  }, [selectedItems])


  const lastItemRef = useRef<TreeNode | null>(null);
  // 点击popup中的menuItem的回调
  const handleCascaderChange = useCallback(
    (item: TreeNode, depth: number) => {
      const { children } = item;
      lastItemRef.current = item;
      onCascaderChange?.(item, {
        add: (newChildren: TreeNode[]) => {
          // TODO: 为什么要提供这个方法？
          return newChildren
        }
      })
      addMenu(children!, depth + 1);
      // 用户确定点击的item，确定active样式
      setMenuPath((prevMenuPath) => prevMenuPath.slice(0, depth).concat(item))
    }, [menuPath, onCascaderChange]);


  // 修改checkbox
  const handleSelectChange = useCallback(
    (item: TreeNode, checked: boolean) => {
      setValue((prevValue) => {
        const newValue = sortByTree(reconcile(item, checked, prevValue), flattenData);
        return newValue;
      })
  }, [flattenData]);

  const resetMenuState = useCallback(() => {
    if (selectAll && flattenData.length === 1) {
      return setMenuData([])
    } else {
      setMenuData([
        selectAll
          ? flattenData[0].children!
          : flattenData.filter((item) => !item.parent),
      ])
    }
    setMenuPath([])
  }, [flattenData, selectAll]);




  useEffect(() => {
    if(onChange){
      onChange(value, selectedItems.slice(0))
    }
  }, [selectedItems])

  useEffect(() => {
    dataRef.current = data;
  }, [data])

  // 只要有data的变化，就需要对data进行展开处理。
  useEffect(() => {
    // console.log('监测到data,selectAll的变化')
    setFlattenData((): TreeNode[] => {
      if (selectAll) {
        return flattenTree([
          {
            title: 'All',
            value: All,
            parent: null,
            children: data
          }
        ])
      }
      return flattenTree(data || []);
    })
  }, [data, selectAll])

  // popup变化后，开始初始化menu和value.
  useEffect(() => {
    if (popupVisible) {
      // console.log('监测到popupVisible的变化')
      setValue(transformValue(valueProp || value));
      resetMenuState();
    }
  }, [popupVisible])

  return {
    popupVisible,
    setPopupVisible,
    menuData,
    handleCascaderChange,
    menuPath,
    handleSelectChange,
    value,
    hackValue,
    selectedItems,
    triggerChange,

  }
}

export default createContainer(useCascader);
