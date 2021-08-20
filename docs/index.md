---
 order: 1
---
## CascaderPlus介绍

### 开发记录
* Tip：主要的状态维护在container中
* 拿到props.data构建flattenData，即flattenTree方法。
* flattenTree方法dfs遍历子节点，给子节点添加parent属性，并且替换parent节点中children为newChildren（拥有parent属性的子节点）。如此平铺的树结构，很方便通过value来查找。
* 在popupVisible改变的时候来重置menuData。首层的menuData就是那些没有parent的节点。




### 库与知识点
* [unstated-next](https://www.npmjs.com/package/unstated-next)：[利用Hooks封装解决状态管理](https://segmentfault.com/a/1190000021102415)
* [useMemo与useCallback](https://blog.csdn.net/sinat_17775997/article/details/94453167)
* [React.memo](https://segmentfault.com/a/1190000018563418)
* [React.forwardRef](https://reactjs.org/docs/forwarding-refs.html)
