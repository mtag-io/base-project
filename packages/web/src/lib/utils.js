import {dirs} from '../../__config__/global.json'
import {REGISTERED} from "../constants/named";

export const pick = (o, ...args) => {
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

export const omit = (o, ...args) => {
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

export const sGet = store => {
    let sv
    store.update(v => {
        sv = v
    })
    return sv && sv
}

export const createStorage = (userId, isWidget) => src => [
        dirs.storage,
        REGISTERED,
        userId,
        isWidget? dirs.widget : dirs.source,
        src
    ].join('/')
