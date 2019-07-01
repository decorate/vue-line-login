import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const requireContext = require.context('./modules', false, /.*\.js$/)

const modules = requireContext.keys()
    .map(file =>
        [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
    )
    .reduce((modules, [name, module]) => {
        modules[name] = module
        return modules
    }, {})

const store = new Vuex.Store({modules})
export default store
