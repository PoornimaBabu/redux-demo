const redux = require('redux')
const reduxLogger = require('redux-logger')
const createStore = redux.createStore
const combineReducer = redux.combineReducers
const logger = reduxLogger.logger
const applyMiddleware = redux.applyMiddleware

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'ICE_CREAM'

function buyCake(){
    return {
        type: BUY_CAKE
    }
}

function buyIceCream(){
    return {
        type: BUY_ICECREAM
    }
}

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCream: 20
}

function cakeReducer(state = initialCakeState, action){
    switch(action.type){
        case BUY_CAKE:
            return{
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        default: return state
    }
}

function iceCreamReducer(state = initialIceCreamState, action){
    switch(action.type){
        case BUY_ICECREAM:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream - 1
            }
        default: return state
    }
}

const reducers = combineReducer({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(reducers,applyMiddleware(logger))
console.log('Initial State', store.getState())
const unsubscribe = store.subscribe(() => {})
store.dispatch(buyCake())
store.dispatch(buyIceCream())
unsubscribe()
