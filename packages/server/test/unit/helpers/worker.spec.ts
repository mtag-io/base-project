import {solveWidgetDir} from "../../../src/worker/worker.helpers";

describe('solveWidgetDir', () => {
    it('should return a valid name', () => {
        expect(solveWidgetDir('test-file_00999.jpeg')).toEqual('test-file')
        expect(solveWidgetDir('test-file_0.png')).toEqual('test-file')
        expect(solveWidgetDir('test-file088.gif')).toEqual('test-file')
    })
})