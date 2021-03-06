import { fromJS } from 'immutable'
import {
  getOneBoard,
  validate,
  changeRound,
  eat,
  clear,
  getLength
} from '../../utils'
import { Alert } from 'react-native'

const initialState = getOneBoard()

function gameplay (state = initialState, action) {
  switch (action.type) {
    case 'VALIDATE': {
      let Round = state.get('Round')
      let who = Round === 'B ' ? "Blancas" : "Negras"
      let message = `Turno de las ${who}`
      let nextState = clear(state)
      // Alert.alert(message)
      nextState = validate(nextState, Round, changeRound(Round))
      nextState = getLength(nextState)

      return nextState
    }
    case 'CHANGE_ROUND': {
      let Round = state.get('Round')
      return state.set('Round', changeRound(Round))
    }
    case 'MOVE': {
      let { x, y } = action.payload
      let Round = state.get('Round')
      let nextState

      if (state.getIn(['state', x, y]) === 'CM') {
        nextState = state.setIn(['state', x, y], Round)
        return nextState
      }
      else {
        Alert.alert(`Movimiento invalido ${action.payload.x}, ${action.payload.y}!`)
      }

      return state
    }
    case 'EAT': {
      let Round = state.get('Round')
      let { y, x } = action.payload
      let nextState = eat(state, x, y, Round)
      return nextState
    }
    default: {
      return state
    }
  }
}

export default gameplay
