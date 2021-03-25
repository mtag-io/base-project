const {expect} = require('chai')
const {componentCase} = require('../strings.helpers')

describe('componentCase', () => {

    it('should pass one word name', () => {
        expect(componentCase('HOME')).to.equal('Home')
    })

    it('should pass for underscore name]', () => {
        expect(componentCase('HOME_PAGE')).to.equal('HomePage')
    })

    it('should pass for hyphen name]', () => {
        expect(componentCase('HOME-PAGE')).to.equal('HomePage')
    })

})