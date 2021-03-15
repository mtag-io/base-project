const {expect} = require('chai')
const {Http, flatten} = require('../index')
const {BASE_HEADERS, POST} = require('../index')
const rawEndpoints = require('./__fixtures__/endpoints.json')

const endpoints = flatten(rawEndpoints)

describe('Http class', () => {

    const testToken = 'testToken'

    const dummyStore = {
        subscribe: fn => {
            fn({accessToken: 'testToken'})
        }
    }

    it('initialize the store on initialization', () => {

        const fetch = () => {
        }

        const http = new Http(dummyStore, endpoints, fetch)
        expect(http.accessToken).to.equal('testToken')
    })

    it('should post with the right parameters', () => {

        const body = {
            key1: 'val1',
            key2: "val2"
        }

        const fetch = (url, payload) => {
            expect(url).to.equal('auth/refresh')
            expect(payload.method).to.equal(POST)
            expect(payload.headers).to.deep.equal(BASE_HEADERS)
            expect(payload.body).to.equal(JSON.stringify(body))
        }

        const http = new Http(dummyStore, endpoints, fetch)
        http.post(
            endpoints['AUTH_REFRESH'],
            {body}
        )
    })

    it('should post auth with the right parameters', () => {

        const body = {
            key1: 'val1',
            key2: "val2"
        }
        
        const fetch = (url, payload) => {
            expect(url).to.equal('auth/refresh')
            expect(payload.method).to.equal(POST)
            expect(payload.headers).to.deep.equal({
                ...BASE_HEADERS,
                'Authorization': `Bearer ${testToken}`
            })
            expect(payload.body).to.equal(JSON.stringify(body))
        }

        const http = new Http(dummyStore, endpoints, fetch)
        http.postAuth(
            endpoints['AUTH_REFRESH'],
            {body}
        )
    })
})


