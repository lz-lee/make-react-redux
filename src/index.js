import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import Header from './header'
import Content from './content'
import {applyMiddleware, thunk} from './myRedux'
// function createStore(reducer) {
//   let state = null
//   const listeners = []
//   // 订阅事件
//   const subscribe = (listener) => listeners.push(listener)
//   // 返回数据
//   const getState = () => state
//   // 更新数据，触发事件
//   const dispatch = (action) => {
//     state = reducer(state, action)
//     listeners.forEach((listener) => listener())
//   }
//   // 初始化 state
//   dispatch({})
//   return { subscribe, getState, dispatch }
// }

const initState = {
  themeColor: 'red'
}

const themeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      return {...state, themeColor: action.themeColor}
  
    default:
      return state
  }
}


const store = createStore(themeReducer, applyMiddleware(thunk))

class Index extends Component {
  render () {
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById('root')
)