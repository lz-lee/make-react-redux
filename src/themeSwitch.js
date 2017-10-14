import React, { Component } from 'react'
import {connect} from './myConnect'
import propTypes from 'prop-types'

class ThemeSwitch extends Component {
  static contextTypes = {
    themeColor: propTypes.string,
    onSwitchColor: propTypes.func
  }

  handleChangeColor = (color) => {
    if (this.props.onSwitchColor) {
      this.props.onSwitchColor(color)
    }
  }
  render () {
    return (
      <div>
        <button style={{color: this.state.themeColor}}
          onClick={this.handleChangeColor('red')}
        >Red</button>
        <button style={{color: this.state.themeColor}}
        onClick={this.handleChangeColor('blue')}
        >Blue</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchColor: (color) => {
      dispatch({
        type: 'CHANGE_COLOR',
        themeColor: color
      })
    }
  }
}

ThemeSwitch = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch)
export default ThemeSwitch