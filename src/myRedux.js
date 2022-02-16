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
  if (typeof creators === 'function') {
    return bindActionCreator(creators, dispatch);
  }
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
    // 希望在 middleware 链被构建的时候，dispatch 不应该被调用，否则抛错。因为中间件里的 dispatch 是经过增强后的
    // 即后续实际会用第二次赋值的 dispatch
    let dispatch = () => {};
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 单个中间件
    // dispatch = middleware(midApi)(store.dispatch)
    const middlewareChain = middlewares.map(middleware => middleware(midApi))
    // middlewareChain => [ (next) => action => {...}, xxx, xxx ]
    // 这里 store.dispatch 即 compose 里 (...args) => ret(item(...args)) 这里的 args
    // 修改了 dispatch
    dispatch = compose(...middlewareChain)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
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

export const thunk = ({dispatch, getState}) => (next) => (action) => {
  console.log(action, typeof action, '<<< thunk action');
  console.log(next)
  // 如果是函数，则执行函数，参数是dispatch 和getState
  if (typeof action === 'function') {
    // 这里的 dispatch 是 const midApi = {
    //   getState: store.getState,
    //   dispatch: (...args) => dispatch(...args)
    // }
    // 这里  dispatch, 而 dispatch(...args) 调用这个的 dispatch ，是 dispatch = compose(...middlewareChain)(store.dispatch) 返回的 dispatch 修改的，因此当异步执行到的 action ，可以再次进入中间价里执行
    return action(dispatch, getState)
  }
  // 下一个 thunk，如果还有别的 thunk，则传递到 next thunk， 如果没有则 next 即是 store.dispatch (默认使用原来的dispatch)， 即执行了 reducer
  return next(action)
}


export const arrThunk = ({dispatch, getState}) => (next) => (action) => {
  console.log(action, typeof action, '<<< arr thunk action')
  if (Array.isArray(action)) {
    action.forEach(v => dispatch(v))
  }
  // 如果是函数，则执行函数，参数是dispatch 和getState
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }
  // 下一个 thunk，如果没有 默认使用原来的dispatch
  return next(action)
}

/**
 * actions 生成器 可用于创建同步的action
 * let addAction = createAction('ADD', 'count')
 * addAction(1)
 * 相当于 function addAction(id) {return {type: 'ADD', count: count}}
 * @param {*} type
 * @param {*} argNames
 */
export const createAction = (type, ...argNames) => (...args) => {
  let action = {type}
  argNames.forEach((v, i) => {
    action[v] = args[i]
  })
  return action
}

/**
 * reducer 生成器
 * let userReducer = createReducer(initState, {
 *    [actionTypes.ADD](state, action) {
 *        // do something
 *        return state
 *    }
 * })
 * @param {*} initState
 * @param {*} handles
 */
export const createReducer = (initState, handles = {}) => (state = initState, action = {}) => {
  if (handles.hasOwnProperty(action.type)) {
    return handles[action.type](state, action)
  }
  return state
}