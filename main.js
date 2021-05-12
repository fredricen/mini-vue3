
// import {
//   ref, reactive, effect,
// } from './node_modules/@vue/reactivity/dist/reactivity.esm-browser.js';

// 版本一：响应式值
// const a = ref(10);
// let b;

// effect(()=>{
//     b = a.value + 10;//调用a的get，依赖收集过程
//     console.log(b);
// })

// //update
// a.value = 20;//调用a的set，触发依赖更新


// 版本二：响应式视图单节点
// const a = ref(10);
// window.a = a;

// const b = () => {
//     //reset
//     document.querySelector("#app").textContent = '';

//     const div = document.createElement('div');
//     div.textContent = a.value;
//     document.querySelector("#app").append(div);
// }

// effect(()=>{
//     //这里才可以收集依赖
//     b();
// })


// 版本三：响应式视图多个节点，需要diff
// const a = ref(10);
// window.a = a;

// const b = () => {
//     //reset
//     document.querySelector("#app").textContent = '';

//     const div = document.createElement('div');

//     const p = document.createElement('p');
//     p.textContent = 'p1';
//     div.append(p);
//     const p2 = document.createElement('p');
//     p2.textContent = 'p2 --- ' + a.value;
//     div.append(p2);
//     document.querySelector("#app").append(div);
// }

// effect(()=>{
//     //这里才可以收集依赖
//     b();
// })

// 版本四：更像vue3一些
// const App = {
//   // template -> render
//   render(context) {
//     // view
//     // view写死的 =》dom
//     // !dom情况如何处理
//     // 1. 公共逻辑需要抽离
//     // 2. 优化点 =》如何只更新变化了的view，实现最少更新？
//     //          - vdom
//     //          - diff
//     effect(()=>{
//       // reset
//       document.querySelector('#app').textContent = '';
//       const div = document.createElement('div');

//       const p = document.createElement('p');
//       p.textContent = 'p1';
//       div.append(p);
//       const p2 = document.createElement('p');
//       p2.textContent = 'p2 --- ' + context.state.count;
//       div.append(p2);
//       document.querySelector('#app').append(div);
//     });
//   },

//   setup() {
//     const state = reactive({
//       count: 1,
//     });
//     window.state = state;
//     return {
//       state,
//     };
//   },
// };
// App.render(App.setup());

// 版本五
import {createApp} from './core/index.js';
import App from './App.js';

createApp(App).mount(document.querySelector('#app'));

