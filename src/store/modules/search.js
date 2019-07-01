import {getter, action} from '../types'

// state
export const state = {
    selectObjects: {}
}

// mutations
export const mutations = {
    [action.SET_OBJECT](state, obj) {
        state.selectObjects[obj.key] = obj.value
    }
}

// actions
export const actions = {
    [action.SET_OBJECT]({commit}, obj) {
        commit(action.SET_OBJECT, obj)
    }
}

// getters
export const getters = {
    [getter.OBJECTS]: state => (key) => state.selectObjects[key]
}
