/**
 * custom renderer -> 自定义渲染器
 * @param {*} type
 * @return {*}
 */
function createElement(type) {
  return document.createElement(type);
}

/**
 * 统一的props处理逻辑
 * @param {*} el
 * @param {*} key
 * @param {*} prevValue
 * @param {*} nextValue
 */
function patchProps(el, key, prevValue, nextValue) {
  if (nextValue) {
    el.setAttribute(key, nextValue);
  } else {
    el.removeAttribute(key);
  }
}

/**
 * 文本节点
 * @param {*} text
 * @return {*}
 */
function createTextNode(text) {
  return document.createTextNode(text);
}

/**
 * 插入节点
 * @param {*} el
 * @param {*} parent
 */
function insert(el, parent) {
  parent.append(el);
}
/**
 * 把虚拟dom转换为真实dom
 * @param {*} vnode
 * @param {*} container
 */
export function mountElement(vnode, container) {
  // vnode
  // type props children
  // type
  const {type, props, children} = vnode;
  const el = (vnode.el = createElement(type));

  // props
  if (props) {
    Object.keys(props).forEach((key)=>{
      patchProps(el, key, null, props[key]);
    });
  }

  // children
  // string | array
  if (typeof children === 'string') {
    const textNode = createTextNode(children);
    insert(textNode, el);
  } else if (Array.isArray(children)) {
    children.forEach((v)=>{
      mountElement(v, el);
    });
  }

  insert(el, container);
}

/**
 * 删除指定节点
 * @param {*} element
 * @param {*} parent
 */
export function remove(element, parent) {
  parent.removeChild(element);
}
/**
 * diff vdom
 * 实现只更新需要更新的节点，保证最小更新
 * @param {*} n1 prevNode
 * @param {*} n2 nextNode
 */
export function diff(n1, n2) {
  console.log('prevNode: ', n1);
  console.log('nextNode: ', n2);
  // type
  if (n1.type!==n2.type) {
    n1.el.replaceWith(document.createElement(n2.type));
  } else {
    // props
    // 1. 老的值和新的值 不一样，直接更新
    // new: {id: "123"}
    // old: {id: "456"}
    // 2. 新的里面key没有了，老的里面有的话，需要删除
    // new: {id: "123"}
    // old: {id: "456", class:"red"}
    const {props: newProps} = n2;
    const {props: oldProps} = n1;
    const el = (n2.el = n1.el);

    if (newProps) {
      Object.keys(newProps).forEach((key)=>{
        if (newProps[key] !== oldProps[key]) {
          patchProps(el, key, oldProps[key], newProps[key]);
        }
      });
    }
    if (oldProps) {
      Object.keys(oldProps).forEach((key)=>{
        if (!(key in newProps)) {
          patchProps(el, key, oldProps[key], null);
        }
      });
    }

    // children
    // array | string
    // new string : old string | array
    // new array : old string | array
    const {children: oldChildren} = n1;
    const {children: newChildren} = n2;

    if (typeof newChildren === 'string') {
      if (typeof oldChildren === 'string') {
        el.textContent = newChildren;
      } else if (Array.isArray(oldChildren)) {
        el.textContent = newChildren;
      }
    } else if (Array.isArray(newChildren)) {
      if (typeof oldChildren === 'string') {
        Object.keys(newChildren).forEach((v)=>{
          mountElement(v, el);
        });
      } else if (Array.isArray(oldChildren)) {
        // 1. 依次对比 diff
        // new: [a, b, c]
        // old: [a, b, e]
        const length = Math.min(newChildren.length, oldChildren.length);
        for (let i=0; i<length; i++) {
          diff(oldChildren[i], newChildren[i]);
        }
        // 2. new > old , 那么需要创建新元素
        // new: [a, b, c, d, e]
        // old: [a, b, c]
        if (newChildren.length > length) {
          for (let i=length; i<newChildren.length; i++) {
            mountElement(newChildren[i], el);
          }
        }
        // 3. old > new , 那么需要删除元素
        // new: [a, b, c]
        // old: [a, b, c, d, e]
        if (oldChildren.length > length) {
          for (let i=length; i<oldChildren.length; i++) {
            remove(oldChildren[i].el, el);
          }
        }
      }
    }
  }
}
