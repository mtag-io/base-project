const fs = require('fs')
const {WORKSPACE} = require('../../lib/constants')
const {join, resolve} = require('path')
const {expect} = require('chai')
const {findRoot, mapPackages, updateRootPkg} = require('../../lib/helpers/fs')

describe('fs unit tests', () => {

    const cwd = process.cwd()

    const setCwd = () => {
        process.chdir(resolve(join(__dirname, '../', '__fixtures__/fs/packages/package2')))
    }

    const resetCwd = () => {
        process.chdir(cwd)
    }

    const map = {
        'package1': resolve(join(__dirname, '../', '__fixtures__/fs/packages/package1')),
        'package2': resolve(join(__dirname, '../', '__fixtures__/fs/packages/package2'))
    }
    describe('findRoot', () => {

        beforeEach(setCwd)
        afterEach(resetCwd)

        it('should get the right path and package for monorepo root', () => {

            const ws = true
            const [pkg, pth] = findRoot(ws)
            expect(pkg[WORKSPACE]).to.be.ok
            expect(pth).to.equal(resolve(join(__dirname, '../', '__fixtures__/fs')))
        })

        it('should get the right path and package', () => {
            const [pkg, pth] = findRoot()
            expect(pkg['name']).to.equal('@package2/test-pack')
            expect(pth).to.equal(resolve(join(__dirname, '../', '__fixtures__/fs/packages/package2')))
        })
    })

    describe('mapPackages', () => {

        beforeEach(setCwd)
        afterEach(resetCwd)

        it('should map the packages', () => {
            const pkgMap = mapPackages()
            expect(pkgMap).to.deep.equal(map)
        })
    })

    describe('updateRootPkg', () => {

        const resetPkg = () => {
            const root = resolve(__dirname, '../__fixtures__/fs/package.json')
            const pkg = JSON.parse(fs.readFileSync(root, 'utf8'))
            if (pkg.wsMap) {
                delete pkg.wsMap
                fs.writeFileSync(root, JSON.stringify(pkg, null, 2))
            }
        }
        beforeEach(() => {
            setCwd()
            resetPkg()
        })

        afterEach(() => {
            resetPkg()
            resetCwd()
        })

        it('should map the packages', () => {
            updateRootPkg()
        })
    })
})