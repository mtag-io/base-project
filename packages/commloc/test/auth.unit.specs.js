require('mock-local-storage')
const {expect} = require('chai')
const {writable} = require('./helpers')
const {Http, Auth, flatten} = require('../index')
const rawEndpoints = require('./__fixtures__/endpoints.json')
const {BASE_HEADERS} = require('../index')

const endpoints = flatten(rawEndpoints)

describe('Http class', () => {

    const dummyAccessToken = 'dummy-access-token'
    const dummyRefreshToken = 'dummy-refresh-token'
    const dummyRole = 'DUMMY-ROLE'

    const dummyUser = {
        userId: "dummy-user-id",
        email: "dummy-email",
        role: dummyRole,
        profile: {
            fullName: "Dummy User",
            lang: "en",
            avatar: "dummy-pic"
        }
    }

    const dummyAuthPayload = {
        user: dummyUser,
        accessToken: dummyAccessToken,
        refreshToken: dummyRefreshToken
    }

    const anonymousAccessToken = ''
    const anonymousRefreshToken = ''
    const anonymousRole = 'ANONYMOUS'

    const anonymousUser = {
        "userId": "",
        "role": anonymousRole,
        "email": "",
        "profile": {
            "fullName": "Anonymous User",
            "avatar": "assets/img/default-avatar.png",
            "lang": "default"
        }
    }

    const anonymousAuthPayload = {
        user: anonymousUser,
        accessToken: anonymousAccessToken,
        refreshToken: anonymousRefreshToken
    }

    it('should initialize ok', () => {

        const testStore = writable(anonymousAuthPayload)

        const fetch = () => {
        }
        const http = new Http(testStore, endpoints, fetch)
        const auth = new Auth(testStore, http, {
            anonymousUser,
            endpoints,
        })
        expect(auth.isAuth).to.be.false
        expect(auth.userId).to.equal('')
        expect(auth.role).to.equal('ANONYMOUS')
        expect(auth.profile).to.deep.equal(anonymousUser.profile)
    })

    it('should pass singin', () => {

        const dummyDto = {
            email: "dummy-mail",
            password: "dummy-pass"
        }

        const testSore = writable(dummyAuthPayload)

        const fetch = (url, payload) => {
            expect(url).to.equal(endpoints['AUTH_SIGNIN'])
            expect(payload.headers).to.deep.equal(BASE_HEADERS)
            expect(payload.body).to.equal(JSON.stringify(dummyDto))
        }
        const http = new Http(testSore, endpoints, fetch)
        const auth = new Auth(testSore, http, {
            anonymousUser,
            endpoints,
        })
        auth.signIn(dummyDto)
    })

    it('should pass signOut', () => {

        const fetch = (url, payload) => {
            expect(url).to.equal(endpoints['AUTH_ACTIVATE'])
            expect(payload.headers).to.deep.equal({
                ...BASE_HEADERS,
                'Authorization': `Bearer ${dummyAccessToken}`
            })
        }

        const testStore = writable(dummyAuthPayload)

        const http = new Http(testStore, endpoints, fetch)
        const auth = new Auth(testStore, http, {
            anonymousUser,
            endpoints,
        })

        auth.setUser(dummyAuthPayload)
        expect(auth.isAuth).to.be.true
        expect(auth.role).to.equal(dummyRole)
        expect(localStorage.getItem('userId')).to.equal(dummyUser.userId)
        expect(localStorage.getItem('accessToken')).to.equal(dummyAccessToken)
        expect(localStorage.getItem('refreshToken')).to.equal(dummyRefreshToken)
        http.getAuth(endpoints['AUTH_ACTIVATE'])
        auth.signOut()
        expect(auth.isAuth).to.be.false
        expect(auth.role).to.equal('ANONYMOUS')
        expect(localStorage.getItem('userId')).to.be.null
        expect(localStorage.getItem('accessToken')).to.be.null
        expect(localStorage.getItem('refreshToken')).to.be.null
    })
})