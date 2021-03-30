const {relative} = require('path')
const {expect} = require('chai')
const {createDestPaths, findCwd} =require('../helpers')


describe('findCwd', () => {

    it('should get the right path and package', () => {
        const [pkg, pth] = findCwd()
        expect(pkg['workspaces']).to.be.ok
        expect(relative(pth, process.cwd())).to.equal('bin/stasy/test')
    })
})

describe('createDestPaths', () => {

    const pkg = {
        workspaces: [
            'packages/*'
        ]
    }

    const config = {
        packages: ['web-static-spa']
    }

    it('should create the right path', () => {
        expect(createDestPaths(config)).to.have.members(['packages/web-static-spa'])
    })
})