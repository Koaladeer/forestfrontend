import {test, describe, expect, it, vi} from 'vitest'
import {mount} from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'
import Chat from '../Chat.vue';
import App from '../../App.vue';
describe('HelloWorld', () => {
    it('renders properly', () => {
        const wrapper = mount(HelloWorld, {props: {msg: 'Hello Vitest'}})
        expect(wrapper.text()).toContain('Hello Vitest')
    })

});
function mountTheChat () {
    const wrapperC = mount(Chat)
    return wrapperC
}
function mountTheAPP () {
    const wrapperA = mount(App)
    return wrapperA
}
global.fetch = vi.fn()
function createFetchResponse(data) {
    return { json: () => new Promise((resolve) => resolve(data)) }
}
describe('The Chat', () => {
    it('Mounts properly', () => {
        expect(mountTheChat()).toBeTruthy()
        // Check the     button mounts
        expect(mountTheChat().text()).toContain('City  Forest  Send')
    })
    test('makes a GET request', async () => {
        const expectedData = [
            {"message":{"id":1682024057404,"content":"Idk how do you work without feelings","from":"system"}}
        ]
        fetch.mockResolvedValue(createFetchResponse(expectedData))
        fetch.mockReturnValueOnce(expectedData)
        console.log(mountTheAPP().text())
        expect(mountTheAPP().text()).toContain("how").rejects.toThrowError("oh no, run!")
    })
})