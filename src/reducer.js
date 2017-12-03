const initState = {
  themeColor: 'red'
}

export const themeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      return {...state, themeColor: action.payload}
  
    default:
      return state
  }
}

export const changeColor = (color) => {
  return {
    type: 'CHANGE_COLOR',
    payload: color
  }
}
export const changeAsync = (color) => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: 'CHANGE_COLOR',
        payload: color
      })
    }, 2000)
  }
}

export const changeTwice = () => {
  return [changeColor('yellow'), changeAsync('#f0f')]
}