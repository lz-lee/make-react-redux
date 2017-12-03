import React, { Component } from 'react'
import {connect} from './myConnect'
import {changeColor, changeAsync} from './reducer'
import propTypes from 'prop-types'


class ThemeSwitch extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div>
        <button style={{color: this.props.themeColor}}
          onClick={() => this.props.changeColor('red')}
        >Red</button>
        <button style={{color: this.props.themeColor}}
        onClick={() => this.props.changeColor('blue')}
        >Blue</button>
        <button style={{color: this.props.themeColor}}
        onClick={() => this.props.changeAsync('green')}
        >等2s</button>
      </div>
    )
  }
}

ThemeSwitch = connect(state => ({themeColor: state.themeColor}), {changeColor, changeAsync})(ThemeSwitch)
export default ThemeSwitch