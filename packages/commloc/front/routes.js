export const findRoute = (r, routes) => {
    if(r[0] !== '/') r = '/' + r
    for(let k of Object.keys(routes))
        if(routes[k].path === r) return [k, routes[k]]
    return [null, null]
}