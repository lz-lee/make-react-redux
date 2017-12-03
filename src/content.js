import React, { Component } from 'react'
import propTypes from 'prop-types'
import {connect} from './myConnect'
import ThemeSwitch from './themeSwitch'

class Content extends Component {
  render () {
    return (
      <div>
        <p style={{color: this.props.themeColor}}>React.js 小书内容</p>
        <ThemeSwitch />
      </div>
    )
  }
}

Content = connect(state => ({themeColor: state.themeColor}))(Content)

export default Content