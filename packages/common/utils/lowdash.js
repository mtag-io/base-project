const pick = (o, ...args) => {
    if (!(o && Object.keys(o).length)) return o;
    if (args[0] instanceof Array)
        args = [...args[0]];
    if (!args || !args.length) return o;
    return args.reduce(
        (acc, key) => {
            acc[key] = o[key];
            return acc;
        }, {});
};

const omit = (o, ...args) => {
    if (!(o && Object.keys(o).length)) return o;
    if (args[0] instanceof Array)
        args = [...args[0]];
    if (!args || !args.length) return o;
    return Object.keys(o).reduce(
        (acc, key) => {
            if (!args.includes(key)) acc[key] = o[key];
            return acc;
        }, {}
    );
};

const toKey = (k, uk = '') => {
    k = k.toUpperCase().replace('-', '_')
    return uk ? uk + '_' + k : k
}

const upperKeys = o => Object.keys(o)
    .reduce((acc, k) => {
        acc[toKey(k)] =o[k]
        return acc
    }, {})

module.exports = {
    pick,
    omit,
    toKey,
    upperKeys
}