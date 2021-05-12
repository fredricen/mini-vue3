// h
// createVNode
// vdom -> vnode

/**
 * 渲染函数生成virtual dom
 * @param {String} type
 * @param {*} props
 * @param {String|Array} children
 * @return {*}
 */
export function h(type, props, children) {
  return {
    type,
    props,
    children,
  };
}
