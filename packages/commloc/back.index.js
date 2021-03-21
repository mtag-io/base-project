// Endpoints utilities
export {flatten, controllerEndpoints} from './front/endpoints'

// Frontend utility classes
export {createAnonymousUser} from "./constants/auth";

// Constant utilities (sizes, time)
export {ONE_HOUR, ONE_MONTH, A_DAY, A_WEEK, TEN_MINUTES} from './constants/time'

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

// fs specific json utilities
export {readJson, readJsonAsync} from './utils/json-fs'