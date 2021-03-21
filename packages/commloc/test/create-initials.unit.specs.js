const {expect} = require('chai')
const {createInitials} = require('../front/create-initials')

describe('sizes', () => {

    it('should return the right initials', () => {
        const testName = 'John Doe'
        expect(createInitials(testName)).to.equal('JD')
    })

    it('should return the right initials for multiple names', () => {
        const testName = 'John Mark Doe'
        expect(createInitials(testName)).to.equal('JM')
    })

    it('should return the right initials for multiple whitespaces', () => {
        const testName = ' John   Doe  Mark    '
        expect(createInitials(testName)).to.equal('JD')
    })

    it('should return the right initials for lowercase', () => {
        const testName = 'john doe'
        expect(createInitials(testName)).to.equal('JD')
    })

    it('should return the right initials for single name', () => {
        const testName = 'john'
        expect(createInitials(testName)).to.equal('JO')
    })

    it('should return the right initials if initials ', () => {
        const testName = 'J Doe'
        expect(createInitials(testName)).to.equal('JD')
    })

    it('should double the initial', () => {
        const testName = 'J'
        expect(createInitials(testName)).to.equal('JJ')
    })

    it('should double the initial for email', () => {
        const testEmail = 'john.dow@test.com'
        expect(createInitials(testEmail)).to.equal('JO')
    })
})