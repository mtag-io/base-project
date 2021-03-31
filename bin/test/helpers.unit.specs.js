const {relative} = require('path')
const {expect} = require('chai')
const {createDestPaths, getRoot} =require('../@commands/ssg/helpers')


describe('getRoot', () => {

    it('should get the right path and package', () => {
        const [pkg, pth] = getRoot()
        expect(pkg['workspaces']).to.be.ok
        expect(relative(pth, process.cwd())).to.equal('bin/ssg/test')
    })
})

describe('createDestPaths', () => {

    const packages= ['web-static-spa']

    it('should create the right path', () => {
        expect(createDestPaths(packages)).to.have.members(['packages/web-static-spa'])
    })
})