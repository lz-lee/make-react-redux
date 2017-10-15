import React, { Component } from 'react'
import propTypes from 'prop-types'
import {connect} from 'react-redux'
import ThemeSwitch from './themeSwitch'

class Content extends Component {
  static propTypes = {
    themeColor: propTypes.string
  }
  render () {
    return (
      <div>
        <p style={{color: this.props.themeColor}}>React.js 小书内容</p>
        <ThemeSwitch />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}

Content = connect(mapStateToProps)(Content)

export default Content