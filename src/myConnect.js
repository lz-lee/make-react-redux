import React, {Component} from 'react'
import propTypes from 'prop-types'

export const connect = (mapStateToProps) => (wrapperComponent) => {
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
      let stateProps = mapStateToProps(store.getState(), this.props) // 额外传入的props
      this.setState({
        // 整合props
        allProps: {
          ...stateProps,
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