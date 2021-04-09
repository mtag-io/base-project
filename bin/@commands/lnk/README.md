
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

const files = fs.readdirSync(dir, {encoding: 'utf8', withFileTypes: true});
files.forEach((file) => {
if (file.isSymbolicLink()) {
console.log('found symlink!');
}
}