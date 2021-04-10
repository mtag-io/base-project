import fs from'fs'
import {join, resolve} from'path'
import {expect} from'chai'
import {findRoot, mapPackages, updateRootPkg} from'../../lib/helpers/fs'
import {WORKSPACE} from'../../lib/constants'

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
            const root = resolve(join(__dirname, '../', '__fixtures__/fs'))
            const pkg = require(join(root,'package.json'))
            const pkgMap = mapPackages(pkg, root)
            expect(pkgMap).to.deep.equal(map)
        })
    })

    describe('updateRootPkg', () => {

        const root = resolve(__dirname, '../__fixtures__/fs/package.json')

        const resetPkg = () => {
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
            const pkg = JSON.parse(fs.readFileSync(root, 'utf8'))
            expect(pkg.wsMap).to.deep.equal(map)
        })
    })
})