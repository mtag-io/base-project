import {writeFileSync, readFileSync} from 'fs'
import {join, resolve} from 'path'
import {expect} from 'chai'
import {setupHooks} from '../../actions'
import {PKG} from '../../../../lib/constants'


describe('ssg actions', () => {

    const FIXTURES_PATH = resolve(__dirname, '..', '__fixtures__')
    const cwd = process.cwd()

    const setCwd = () => {
        process.chdir(resolve(__dirname, '../', '__fixtures__', 'base'))
    }

    const resetCwd = () => {
        process.chdir(cwd)
    }

    describe('setupHooks', () => {

        const staticServerPath = join(FIXTURES_PATH, 'base', 'packages', 'static-server')
        const frontPackPath = join(FIXTURES_PATH, 'base', 'packages', 'front-pack')

        const modelsPath = {
            testCompModelPath: join(staticServerPath, 'api', 'test-comp', 'models', 'test-comp.js'),
            testSubCompModelPath: join(staticServerPath, 'api', 'test-sub-comp', 'models', 'test-sub-comp.js'),
            testSectionModelPath: join(staticServerPath, 'api', 'test-section', 'models', 'test-section.js')
        }

        const putRootPackageJson = () => {
            const pkg = {
                name: 'test-root-pkg',
                workspaces:[
                    'packages/*'
                ],
                wsMap: {
                    'static-server': staticServerPath,
                    'front-pack': frontPackPath
                }
            }
            try {
                writeFileSync(
                    join(resolve(__dirname, '..', '__fixtures__', 'base'), PKG),
                    JSON.stringify(pkg, null, 2)
                )
            } catch(e){
                console.log(e.messages)
            }
        }

        const modelsCleanup = () => {
            Object.values(modelsPath).forEach(
                p => writeFileSync(p, 'module.exports = {}')
            )
        }

        before(() => {
            putRootPackageJson()
        })

        beforeEach(setCwd)

        afterEach(() => {
            resetCwd()
            modelsCleanup()
        })

        it('should create the right models hooks', () => {
            setupHooks('static-server')
            const testCompHook = readFileSync(modelsPath.testCompModelPath, 'utf8')
            const testSubCompHook = readFileSync(modelsPath.testSubCompModelPath, 'utf8')
            const testSectionHook = readFileSync(modelsPath.testSectionModelPath, 'utf8')
            expect(testCompHook).to.match(/http:\/\/localhost:4646/)
            expect(testSubCompHook).to.match(/http:\/\/localhost:4646/)
            expect(testSectionHook).to.match(/http:\/\/localhost:4646/)
        })
    })
})