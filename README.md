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

## connect

* context

  * 组件的context只有它的子组件能够访问，父组件不能访问

  * 父组件设置context

    ```
    ...

    // 验证getChildContext 返回的对象， 必须要写
    static childContextTypes = {
      name: propTypes.string
    }

    // 设置context的方法，返回的对象是context
    getChildContext() {
      return {name: this.state.name}
    }

    ...
    ```
  * 子组件 获取context

    ```
    ...
    // 验证此组件需要获取的状态的类型，必须写才能获取context里的状态
    static contextTypes = {
      name: propTypes.string
    }

    // 通过this.context 获取
    return (
      const name = this.context.name
      <h2>{name}</h2>  
    )
    ```

* mapStateToProps

  * 接受state为参数，返回一个对象，为高阶组件提供该组件所需要的数据

* mapDispatchToProps

  * 接受dispatch为参数，返回一个对象，为高阶组件提供reducer函数，触发action