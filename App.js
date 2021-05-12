import {
  reactive,
  h,
} from './core/index.js';
export default {
  // template -> render
  render(context) {
    // view
    // view写死的 =》dom
    // !dom情况如何处理
    // 1. 公共逻辑需要抽离
    // 2. 优化点 =》如何只更新变化了的view，实现最少更新？
    //          - vdom
    //          - diff

    // reset
    //   document.querySelector('#app').textContent = '';

    // const div = document.createElement('div');
    // div.setAttribute('id', 'my-div');

    // const p = document.createElement('p');
    // p.textContent = 'p1';
    // div.append(p);

    // const p2 = document.createElement('p');
    // p2.textContent = 'p2 --- ' + context.state.count;
    // div.append(p2);

    return h('div', context.state.props, context.state.children);
    // document.querySelector('#app').append(div);

    // return div;
  },

  setup() {
    const state = reactive({
      count: 1,
      props: {
        id: 'my-div',
        class: 'red',
      },
      children: [
        h('div', {id: 'child1'}, '123'),
        h('div', {id: 'child2'}, '456'),
      ],
    });
    window.state = state;
    window.h = h;
    return {
      state,
    };
  },
};
