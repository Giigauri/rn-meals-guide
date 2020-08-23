import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { mealsReducer } from './reducers/meals'

const rootReducer = combineReducers({
    meals: mealsReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))