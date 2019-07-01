import { shallowMount, createLocalVue } from '@vue/test-utils'
import Searchable from '../src/components/LineLoginButton.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
jest.mock('axios')

const localVue = createLocalVue()
localVue.use(VueRouter)

let actual, expected

describe('test', () => {

    let router
    const getLabel = (wrap) => {
        return wrap.find('label').text()
    }

    let create

    beforeEach(() => {
        router = new VueRouter({query: {paginate: '15'}})

        create = (prop) => {
            return shallowMount(Searchable, {
                propsData: {searches: [prop]},
                localVue,
                router
            })
        }
    })

    it('select maximum parameter', async () => {
        axios.get.mockImplementation(() => Promise.resolve({data: [
                {value: 0, text: 'user'},
                {value: 1, text: 'cast'},
            ]}))
        const prop = {select: 'user.type', fetch: true, key: 'user_type', label: 'タイプ', text: 'text', value: 'value'}

        const wrap = create(prop)
        await wrap.vm.$nextTick()

        const options = wrap.findAll('option')
        expect(options.at(0).text()).toBe('--選択--')
        expect(options.at(1).text()).toBe('user')
        expect(options.at(2).text()).toBe('cast')
    })

})
