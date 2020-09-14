import {createStore} from './createStore'
const initialState = {
    count: 0
}
const reducer = (state = initialState, action) => {
    if (action.type === 'ADD') {
        return {...state, count: state.count++}
    }
    return state
}

describe('createStore:', () => {
    let store
    beforeEach(() => {
        store = createStore(reducer, initialState)
    })
    test('should return store object', () => {
        expect(store).toBeDefined()
        expect(store.dispatch()).toBeDefined()
        expect(store.subscribe()).toBeDefined()
        expect(store.getState()).not.toBeUndefined()
    })
    test('should return object as a state', () => {
        expect(store.getState()).toBeInstanceOf(Object)
    })
    test('should return default state', () => {
        expect(store.getState()).toEqual(initialState)
    })
})