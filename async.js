const redux = require('redux')
const reduxLogger = require('redux-logger')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const createStore = redux.createStore
const logger = reduxLogger.logger
const applyMiddleware = redux.applyMiddleware



const FETCH_USERS_REQ = 'FETCH_USERS_REQ'
const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS'
const USER_FETCH_FAILURE = 'USER_FETCH_FAILURE'

const initialState = {
    loading: true,
    users: [],
    error: ''
}

const fetchUserRequest = () => {
    return{
        type: FETCH_USERS_REQ
    }
    
}

const userFetchSuccess = (users) => {
    return {
        type: USER_FETCH_SUCCESS,
        payload: users
    }

}

const userFetchFailure = (error) => {
    return {
        type: USER_FETCH_FAILURE,
        payload: error
    }
    
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQ: return {
            ...state,
            loading: true
        }
        case USER_FETCH_SUCCESS: return {
            loading: false,
            users: action.payload,
            error: ''
        }
        case USER_FETCH_FAILURE: return {
            loading: false,
            users: '',
            error: action.payload
        }
        default: return state
    }
}

const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
             .then(response => {
                 const users = response.data.map(user => user.id)
                 dispatch(userFetchSuccess(users))
             })
             .catch(error => {
                 dispatch(userFetchFailure(error.message))
             })

    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
console.log('Initial State', store.getState())
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())

