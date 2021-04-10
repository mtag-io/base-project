
| workspace root
|-- package.json (root package json - workspaces: [])
|-- utilities and resources folders....
|-- packages
    |-- package1
        |-- package.json //of package1
    |-- package2
        |-- package.json //of package2
    ...
    |-- folder // has no package.json, so it's not treated as a package
    |-- package3
        |-- package.json //of package3

1. Create symlinks for every package

From a local package.json:

 "links":{
    "local package relative path" : "workspace relative path"
}


findRoot -> [pkg, root] package.json (ws root)
pkg.wsMap //[]
iterezi pe array 
extragi pkg
iterezi pe pkg.links
creezi symlynk cu sursa -> key  dest -> value


2. add  symlinks to gitignore (glob)

glob(`**/${PKG}`, {
    cwd: wsRoot,
    absolute: true
}).reduce(
    (acc, pth) => {
            const pkg = readJson(pth)
            if(pkg.links) {
                acc.push(
                    Object.values(pkg.link).map(
                        shc => join(dirname(pth), shc)
                )
                acc = {...acc, ...pkg.links}
            }
            return acc
        }, []
)

// Am pus un comment in gitignore # links
// trebuie cautat, sters totul dupa el
// si adaugat noul allLinks ca mai jos

// allLinks.join('\n')