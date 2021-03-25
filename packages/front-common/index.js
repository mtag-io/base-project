// Endpoints utilities
export {flatten, controllerEndpoints} from '../common/endpoints.helpers'

// Frontend utility classes
export {Http} from './http'
export {Auth} from './auth'
export {createAnonymousUser} from "./auth";

export {createInitials} from './create-initials'

// Constant utilities (sizes, time)
export {ONE_HOUR, ONE_MONTH, A_DAY, A_WEEK, TEN_MINUTES} from '../common/time.const'
export {imgSize, h, m, mb, ml, mr, mt, mx, my, p, pb, pl, pr, pt, px, py, w, roundSize} from './sizes'

// Http constants
export {BASE_HEADERS} from '../common/http.const'

// Named constants
export {
    ANONYMOUS, AUTHORIZATION, CONFIRM, DELETE, GET, PATCH, POST,
    REGISTERED, HERO, HUGE, JUMBO, LG, MD, SM, X_LG, X_SM, XX_LG, XX_SM
} from '../common/named.const'

// Manipulation utilities
export {pick, omit, toKey, upperKeys} from '../common/obj.helpers'

// Generator utilities
export {uuid} from '../common/uuid.helpers'

// Classes utilities
export {ClassBuilder} from './classes'

// routes helpers
export {createRoutes, createRoutePaths} from './routes'

// String helpers
export {capitalize, componentCase, dashCase, camelCase} from '../common/strings.helpers'
