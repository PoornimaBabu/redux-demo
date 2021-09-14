const redux = require('redux')
const createStore = redux.createStore

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

function buycake(){             // ACTION CREATOR
    return {
        type: BUY_CAKE,         // ACTION         
        info: 'First redux action'
    }
}

function buyIceCream(){
    return {type: BUY_ICECREAM}
}

// (prevState,action) => newState

const initialState = {
    numOfCakes: 10,
    numOfIceCream: 20
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case BUY_CAKE: return {                 // we are not mutating the state but we are returning a new object
             ...state,                          // copy of the state object and then only upd numOfCakes
             numOfCakes: state.numOfCakes - 1       // so other properties would remain unchanged
        }
        case BUY_ICECREAM: return {                 // we are not mutating the state but we are returning a new object
            ...state,                          // copy of the state object and then only upd numOfCakes
            numOfIceCream: state.numOfIceCream - 1       // so other properties would remain unchanged
       }
        default: return state
    }
}

const store = createStore(reducer)
console.log('Initial State:', store.getState())
const unsubscribe = store.subscribe(() => console.log('Updated State:', store.getState()))
store.dispatch(buycake())
store.dispatch(buycake())
store.dispatch(buycake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()

