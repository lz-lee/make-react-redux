import React, { Component } from 'react'
import {connect} from 'react-redux'
import propTypes from 'prop-types'

class ThemeSwitch extends Component {
  constructor(props) {
    super(props)
  }
  static contextTypes = {
    themeColor: propTypes.string,
    onSwitchColor: propTypes.func
  }

  handleChangeColor(color) {
    if (this.props.onSwitchColor) {
      this.props.onSwitchColor(color)
    }
  }
  render () {
    console.log(this.props)
    return (
      <div>
        <button style={{color: this.props.themeColor}}
          onClick={() => this.handleChangeColor('red')}
        >Red</button>
        <button style={{color: this.props.themeColor}}
        onClick={() => this.handleChangeColor('blue')}
        >Blue</button>
        <button style={{color: this.props.themeColor}}
        onClick={() => this.handleChangeColor('green')}
        >等2s</button>
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

const changeAsync = (color) => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: 'CHANGE_COLOR',
        themeColor: color
      })
    }, 2000)
  }
}
ThemeSwitch = connect(mapStateToProps, {changeAsync, ...mapDispatchToProps})(ThemeSwitch)
export default ThemeSwitch