// Endpoints utilities
export {flatten, controllerEndpoints} from './front/endpoints'

// Frontend utility classes
export {Http} from './front/http'
export {Auth} from './front/auth'
export {createAnonymousUser} from "./constants/auth";
export {clickOutside} from './front/click-outside'
export {createInitials} from './front/create-initials'

// Constant utilities (sizes, time)
export {ONE_HOUR, ONE_MONTH, A_DAY, A_WEEK, TEN_MINUTES} from './constants/time'
export {imgSize, h, m, mb, ml, mr, mt, mx, my, p, pb, pl, pr, pt, px, py, w, roundSize} from './front/sizes'

// Http constants
export {BASE_HEADERS} from './constants/http'

// Named constants
export {
    ANONYMOUS, AUTHORIZATION, CONFIRM, DELETE, GET, PATCH, POST,
    REGISTERED, HERO, HUGE, JUMBO, LG, MD, SM, X_LG, X_SM, XX_LG, XX_SM
} from './constants/named'

// Manipulation utilities
export {pick, omit, toKey, upperKeys} from './utils/lowdash'

// Generator utilities
export {uuid} from './utils/uuid'

// Tailwind utilities
export {ClassBuilder} from './front/classes'


