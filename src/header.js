import React, { Component } from 'react'
import propTypes from 'prop-types'
import {connect} from './myConnect'

class Header extends Component {
  render () {
    return (
      <h1 style={{color: this.props.themeColor}}>React.js 小书</h1>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     themeColor: state.themeColor
//   }
// }

Header = connect(state => ({themeColor: state.themeColor}))(Header)

export default Header