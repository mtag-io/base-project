import routesList from 'config/routes.json'
import {name} from '../../package.json'
import {Pages} from '../views/pages'
import {createRoutes} from 'front-common'

export const routes = createRoutes(routesList, name, Pages)