import React, {Component} from 'react'
import propTypes from 'prop-types'

export const connect = (mapStateToProps, mapDispatchToProps) => (wrapperComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: propTypes.object
    }

    constructor() {
      super()
      this.state = {
        allProps: {}
      }
    }
    
    componentWillMount() {
      const {store} = this.context
      this._updateProps()
      store.subscribe(() => this._updateProps())
    }

    _updateProps = () => {
      const {store} = this.context
      // mapStateToProps 函数，为高阶组件提供该组件所需要的数据
      let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {}// 额外传入的props

      // mapDispatchToProps 函数，为高阶组件提供reducer函数，触发action
      let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.props) : {}

      this.setState({
        // 整合props
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      })
    }
    render() {
      return <wrapperComponent {...this.state.allProps}/>
    }
  }
  return Connect
}

// 用props.store初始化context，容器类组件
export class Provider extends Component {
  static propTypes = {
    store: propTypes.object,
    children: propTypes.any
  }

  static childContextTypes = {
    store: propTypes.object
  }

  getChildContext() {
    return {
      store: this.props.store
    }
  }
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}