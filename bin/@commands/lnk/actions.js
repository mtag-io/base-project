import {basename, extname, join} from "path";
import {findRoot, readJson} from "../../lib/helpers/fs";
import {throwErr} from "../../lib/helpers/console";
import {symlinkSync, existsSync, unlinkSync} from 'fs';
import {PKG} from "../../lib/constants";


export const createLinks = (pack) => {
    const [wsPkg, wsRoot] = findRoot(true)
    const root = wsPkg["wsMap"][pack]
    if(!root)
        throwErr(`Couldn't find any ${pack} package in root:wsMap!`)
    const pkg = readJson(join(root, PKG))
    if(!pkg.links)
        throwErr(`No links for package ${pack}!`)
    Object.entries(pkg.links).forEach(
        ([packagePath, projectPath]) => {
            const type = extname(basename(packagePath)) ? "file" : "dir"
            try{
                if(existsSync(join(root, packagePath)))
                    unlinkSync(join(root, packagePath))
                symlinkSync(join(wsRoot, projectPath), join(root, packagePath), type)
            }
            catch(err){
                throwErr(err.message)
            }
        }
    )
}

