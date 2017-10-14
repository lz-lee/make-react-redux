# redux
## create-store： 数据管理，只能通过dispatch action 修改数据，（对dispatch管理的唯一性）

* 订阅事件

* 获取state

* dispatch事件，更新state

 ```
 function createStore(reducer) {
  let state = null
  const listeners = []
  // 订阅事件
  const subscribe = (listener) => listeners.push(listener)
  // 返回数据
  const getState = () => state
  // 更新数据，触发事件
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  // 初始化 state
  dispatch({})
  return { subscribe, getState, dispatch }
}
 ```

 ## reducer：纯函数

 * 初始化state

 * 使用拓展对象的语法，覆盖更新原有数据，返回**新的state**

 ```
 let newAppState = { // 新建一个 newAppState
  ...appState, // 复制 appState 里面的内容
  title: { // 用一个新的对象覆盖原来的 title 属性
    ...appState.title, // 复制原来 title 对象里面的内容
    text: '学react' // 覆盖 text 属性
  }
}
 ```


