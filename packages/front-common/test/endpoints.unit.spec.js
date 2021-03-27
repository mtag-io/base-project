const {expect} = require('chai')
const {baseEndpoints, flatten, controllerEndpoints, accessEndpoints} = require('../../common/endpoints.helpers')
const endpoints = require('./__fixtures__/endpoints.json')

describe('baseEndpoints', () => {
    it('should dist all paths', () => {
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
        const actual = flatten(endpoints['auth'], 'auth')
        const expected = {
            "AUTH_ACTIVATE": "/activate",
            "AUTH_DEACTIVATE": "/deactivate",
            "AUTH_PASSWORD_RESET_ACCESS": "/password-reset/access",
            "AUTH_PASSWORD_RESET_REQUEST": "/password-reset/request",
            "AUTH_REFRESH": "/refresh",
            "AUTH_SIGNIN": "/signIn",
            "AUTH_SIGNUP": "/signup",
            "AUTH_VERIFY_EMAIL_ACCESS": "/verify-email/access",
            "AUTH_VERIFY_EMAIL_REQUEST": "/verify-email/request",
        }
        expect(actual).deep.equal(expected)
    })
})

describe('controllerEndpoints', () => {

    it('should fill in the controllerEndpoints', () => {
        const actual = controllerEndpoints(endpoints)
        const expected = {
            "AUTH_ACTIVATE": "/activate",
            "AUTH": "/auth",
            "AUTH_DEACTIVATE": "/deactivate",
            "LINK": "/link",
            "NOTIFICATION": "/notification",
            "AUTH_PASSWORD_RESET_ACCESS": "/password-reset/access",
            "AUTH_PASSWORD_RESET_REQUEST": "/password-reset/request",
            "PROFILE": "/profile",
            "AUTH_REFRESH": "/refresh",
            "AUTH_SIGNIN": "/signIn",
            "AUTH_SIGNUP": "/signup",
            "SOURCE": "/source",
            "USER": "/user",
            "AUTH_VERIFY_EMAIL_ACCESS": "/verify-email/access",
            "AUTH_VERIFY_EMAIL_REQUEST": "/verify-email/request"
        }
        expect(actual).deep.equal(expected)
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
            "AUTH_SIGNIN": "/auth/signIn",
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

