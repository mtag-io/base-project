const {expect} = require('chai')
const {baseEndpoints, flatten, controllerEndpoints, accessEndpoints} = require('../utils/endpoints')
const endpoints = require('./__fixtures__/endpoints.json')

describe('baseEndpoints', () => {
    it('should build all paths', () => {
        const actual = baseEndpoints(endpoints)
        const expected = {
            "AUTH": "/auth",
            "LINK": "/link",
            "NOTIFICATION": "/notification",
            "PROFILE": "/profile",
            "SOURCE": "/source",
            "USER": "/user"
        }
        expect(expected).deep.equal(actual)
    })
})

describe('flatten', () => {

    it('should flatten an endpoint object', () => {
        const actual = flatten(endpoints['auth'])
        const expected = {
            "ACTIVATE": "/activate",
            "DEACTIVATE": "/deactivate",
            "PASSWORD_RESET_ACCESS": "/password-reset/access",
            "PASSWORD_RESET_REQUEST": "/password-reset/request",
            "REFRESH": "/refresh",
            "SIGNIN": "/signin",
            "SIGNUP": "/signup",
            "VERIFY_EMAIL_ACCESS": "/verify-email/access",
            "VERIFY_EMAIL_REQUEST": "/verify-email/request"
        }
        expect(expected).deep.equal(actual)
    })
})

describe('controllerEndpoints', () => {

    it('should fill in the controllerEndpoints', () => {
        const actual = controllerEndpoints(endpoints)
        const expected = {
            "ACTIVATE": "/activate",
            "AUTH": "/auth",
            "DEACTIVATE": "/deactivate",
            "LINK": "/link",
            "NOTIFICATION": "/notification",
            "PASSWORD_RESET_ACCESS": "/password-reset/access",
            "PASSWORD_RESET_REQUEST": "/password-reset/request",
            "PROFILE": "/profile",
            "REFRESH": "/refresh",
            "SIGNIN": "/signin",
            "SIGNUP": "/signup",
            "SOURCE": "/source",
            "USER": "/user",
            "VERIFY_EMAIL_ACCESS": "/verify-email/access",
            "VERIFY_EMAIL_REQUEST": "/verify-email/request"
        }
        expect(expected).deep.equal(actual)
    })
})

describe('controllerEndpoints', () => {

    it('should fill in the controllerEndpoints', () => {
        const actual = accessEndpoints(endpoints)
        const expected = {
            "AUTH_ACTIVATE": "/auth/activate",
            "AUTH_DEACTIVATE": "/auth/deactivate",
            "AUTH_PASSWORD_RESET_ACCESS": "/auth/password-reset/access",
            "AUTH_PASSWORD_RESET_REQUEST": "/auth/password-reset/request",
            "AUTH_REFRESH": "/auth/refresh",
            "AUTH_SIGNIN": "/auth/signin",
            "AUTH_SIGNUP": "/auth/signup",
            "AUTH_VERIFY_EMAIL_ACCESS": "/auth/verify-email/access",
            "AUTH_VERIFY_EMAIL_REQUEST": "/auth/verify-email/request",
            "LINK": "/link",
            "NOTIFICATION": "/notification",
            "PROFILE": "/profile",
            "SOURCE": "/source",
            "USER": "/user"
        }
        expect(expected).deep.equal(actual)
    })
})

