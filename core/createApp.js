import {
  effect,
} from './index.js';
import {diff, mountElement} from './renderer.js';
/**
 * 创建应用
 * @param {*} rootComponent
 * @return {*}
 */
export function createApp(rootComponent) {
  // app
  return {
    mount(rootContainer) {
      const context = rootComponent.setup();
      let isMounted = false;
      let prevNode;

      effect(()=>{
        // reset
        // rootContainer.textContent = '';
        if (!isMounted) {
          isMounted = true;
          const vdom = rootComponent.render(context);
          prevNode = vdom;

          // vdom -> dom
          mountElement(vdom, rootContainer);
        } else {
          const nextNode = rootComponent.render(context);
          diff(prevNode, nextNode);

          prevNode = nextNode;
          // update
        }
        // rootContainer.append(vdom);
      });
    },
  };
}
