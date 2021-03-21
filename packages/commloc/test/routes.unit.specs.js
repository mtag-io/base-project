const {expect} = require('chai')
const {findRoute} = require('../front/routes')

const testRoutes = {
    HOME: {
        path: '/',
        component: null
    },
    ABOUT: {
        path: '/about',
        component: null
    },
    ADMIN: {
        path: '/admin',
        component: null
    }
}

describe('findRoute', () => {

    it('should find home route', () => {
        expect(findRoute('/', testRoutes)).to.deep.equal(
            ['HOME', testRoutes['HOME']]
        )
    })

    it('should find about route', () => {
        expect(findRoute('/about', testRoutes)).to.deep.equal(
            ['ABOUT', testRoutes['ABOUT']]
        )
    })

    it('should find about route despite missing /', () => {
        expect(findRoute('about', testRoutes)).to.deep.equal(
            ['ABOUT', testRoutes['ABOUT']]
        )
    })
})