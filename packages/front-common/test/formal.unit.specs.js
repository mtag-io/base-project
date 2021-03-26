const {expect} = require('chai')
const {Formal} = require('../../common/units.const')


describe('class Formal', () => {

    const testSchema  = {

    }

    it('should pass fro s < limits[0]', () => {
        expect(roundSize(42, limits)).to.equal('50')
    })

})

