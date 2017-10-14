import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import propTypes from 'prop-types'
import Header from './header'
import Content from './content'
import './index.css'

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

const themeReducer = (state, action) => {
  if (!state) return {
    themeColor: 'red'
  }

  switch (action.type) {
    case 'CHANGE_COLOR':
      return {...state, themeColor: action.themeColor}
  
    default:
      return state
  }
}

const store = createStore(themeReducer)

class Index extends Component {
  static childContextTypes = {
    store: propTypes.object
  }

  getChildContext() {
    return { store }
  }
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
  <Index />,
  document.getElementById('root')
)