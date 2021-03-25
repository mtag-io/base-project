import {omit} from './build'
import {componentCase} from '../common/strings.helpers'

export const findRoute = (r, routes) => {
    if(r[0] !== '/') r = '/' + r
    for(let k of Object.keys(routes))
        if(routes[k].path === r) return [k, routes[k]]
    return [null, null]
}

export const createRoutePaths = (routesList, appName) => ({
    ...omit(routesList.default, 'serviceRoutes'),
    ...routesList.default['serviceRoutes'],
    ...routesList[appName]
})

export const createRoutes = (routesList, name, Pages) => {
    const routePaths = createRoutePaths(routesList, name)
    return Object.keys(routePaths).map(k => ({
        name: k,
        path: routePaths[k],
        isServiceRoute: !!routesList.default['serviceRoutes'][k],
        component: /^E([0-9]{3}$)/.test(k)
            ? Pages['ErrorPage']
            : Pages[componentCase(k)],
        isError: /^E([0-9]{3}$)/.test(k) && k.slice(1)
    }))
}