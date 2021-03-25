import routesList from 'config/routes.json'
import {name} from '../../package.json'
import {createRoutePaths} from 'front-common/routes'

export const routePaths = createRoutePaths(routesList, name)