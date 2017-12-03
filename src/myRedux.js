export function createStore(reducer, enhancer) {
  // applyMiddleware
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }

  let state = {}

  let listeners = []

  const getState = () => state

  /* 这里的subscribe有两个功能
   * 调用 subscribe(listener) 会使用listeners.push(listener)注册一个listener
   * 而调用 subscribe 的返回函数则会注销掉listener
   */
  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(v => v !== listener)
    }
  }

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(v => v())
  }

  // 初始化 state
  dispatch({type: '@@!!'})
  return {getState, subscribe, dispatch}
}

/**
 * @param creators 
 * function changeColor (...args) {
 *  return {
 *    type: 'CHANGE_COLOR,
 *    payload: args
 *  }
 * }
 * 
 * @param dispatch
 * 
 * @return {actionName: (...args) => dispatch(creator(...args))}
 */
export function bindActionCreators(creators, dispatch) {
  // let bound = {}
  // Object.keys(creators).forEach(v => {
  //   bound[v] = bindActionCreator(creators[v], dispatch)
  // })
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(creators[item], dispatch)
    return ret
  }, {})
}

const bindActionCreator = (creator, dispatch) => {
  return (...args) => dispatch(creator(...args))
}

/**
 * applyMiddleware
 */

export function applyMiddleware(...middlewares) {
  return (createStore) => (...args) => {
    const store = createStore(...args)
    let dispatch = createStore.dispatch

    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 单个中间件
    // dispatch = middleware(midApi)(store.dispatch)
    const middlewareChain = middlewares.map(middleware => middleware(midApi))
    dispatch = compose(...middlewareChain)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}

export const thunk = ({dispatch, getState}) => (next) => (action) => {
  console.log(action, typeof action)
  // 如果是函数，则执行函数，参数是dispatch 和getState
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }
  // 默认使用原来的dispatch
  return next(action)
}

/**
 * 
 * @param {fn1, fn2, fn3,...} middlewareChain 
 * fn1(fn2(fn3))
 */
export const compose = (...middlewareChain) => {
  if (middlewareChain.length === 0) {
    return arg => arg
  }
  if (middlewareChain.length === 1) {
    return middlewareChain[0]
  }
  
  return middlewareChain.reduce((ret, item) => (...args) => ret(item(...args)))
}

export const arrThunk = ({dispatch, getState}) => (next) => (action) => {
  console.log(action, typeof action)
  if (Array.isArray(action)) {
    action.forEach(v => dispatch(v))
  }
  // 如果是函数，则执行函数，参数是dispatch 和getState
  // if (typeof action === 'function') {
  //   return action(dispatch, getState)
  // }
  // 默认使用原来的dispatch
  return next(action)
}