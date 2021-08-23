import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { createContainer } from 'unstated-next';
import { TreeNode, ValueType } from './index.d';
import { CascaderPlusProps } from './components/CascaderPlus';
import {
  findNodeByValue,
  flattenAllChildren,
  flattenTree,
  reconcile,
  // shallowEqualArray,
  sortByTree,
  transformValue as originalTransformValue,
} from './libs/utils';
import { All } from './constants';

const useCascader = (params?: CascaderPlusProps) => {
  const {
    data,
    defaultValue: valueProp,
    selectAll,
    onChange,
    loadData,
    filter,
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

  const [searchValue, setSearchValue] = useState<string|undefined>(undefined);
  const [searchData, setSearchData ]= useState< TreeNode[]>([]);


  const filterLocalData = useCallback((value: string) => {
    const filterData =  flattenData.filter((node: TreeNode) => {
      //
      return value === node.title;
    })
    return Promise.resolve(filterData)
  }, [flattenData]);

  const filterData = filter? filter: filterLocalData;

  const [searchInputFocus, setSearchInputFocus] = useState<boolean>(false);

  // const selectedItems = useMemo(() => {
  //   return flattenData.filter((node: TreeNode) => {
  //     return (value).includes(node.value);
  //   })

  // }, [flattenData, value])



  const transformValue = useCallback(
    (value: ValueType[], type?: string) => {
      // console.log('transformValue', value, type, flattenData)
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
  const [value, setValue] = useState(transformValue(valueProp || [], 'default'));

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

  //
  const selectedItems = useMemo(() => {
    return flattenData.filter((node: TreeNode) => {
      return (value).includes(node.value);
    })

  }, [flattenData, value])

  // 这个主要提供给selector的remove使用。
  const triggerChange = useCallback(
    (nextValue: ValueType[]) => {
      setValue(nextValue);
      setPopupVisible(false);
    }, [selectedItems])


  const addChildrenToNode = useCallback(
    (target: TreeNode, children: TreeNode[]): TreeNode[] => {
      const found = findNodeByValue(target.value, dataRef.current!);
      if (found) {
        found.children = children;
      }
      return [...dataRef.current!];
    },
    []
  )

  const triggerSearchChange = useCallback((value: string) => {
      setSearchValue(value);
      filterData(value).then((res: TreeNode[]) => {
        const resSearchData = flattenAllChildren(res);
        setSearchData(resSearchData);
      })
  }, [filterData])


  const lastItemRef = useRef<TreeNode | null>(null);

  // 点击popup中的menuItem的回调
  const handleCascaderChange = useCallback(
    (item: TreeNode, depth: number) => {
      const { children } = item;
      lastItemRef.current = item;
      // 需要动态加载数据的时机
      const needLoadData = loadData && (item.children === undefined) && (item.isLeaf === false);
      if (needLoadData) {
        loadData?.(item).then(([newChildren, node]) => {
          console.log(newChildren, node)
          // const newData = addChildrenToNode(node, newChildren);
          if (lastItemRef.current === node) {
            node.children = newChildren;
            node.isLeaf = false;
            newChildren.forEach((child) => {
              child.parent = node;
            })
            setFlattenData((prev) => [...prev, ...newChildren])
            handleCascaderChange(node, depth)
          }
        })
      }

      addMenu(children!, depth + 1);
      // 用户确定点击的item，确定active样式
      setMenuPath((prevMenuPath) => prevMenuPath.slice(0, depth).concat(item))
    }, [menuPath, loadData]);


  // 修改checkbox
  const handleSelectChange = useCallback(
    (item: TreeNode, checked: boolean) => {
      setValue((prevValue) => {
        const newValue = sortByTree(reconcile(item, checked, prevValue), flattenData);
        return newValue;
      })
    }, [flattenData]);


  // TODO: selectAll如何特殊处理？
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

  const resetSearchState = useCallback(() => {
    setSearchData([]);
    setSearchValue('');
  }, []);

  useEffect(() => {
    if (onChange) {
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
      // setValue(transformValue(valueProp || value , 'effect'));
      // setValue(transformValue(value , 'effect'));
      resetMenuState();
      resetSearchState();
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
    // hackValue,
    selectedItems,
    triggerChange,
    searchData,
    searchValue,
    triggerSearchChange,
    searchInputFocus,
    setSearchInputFocus,
  }
}

export default createContainer(useCascader);
