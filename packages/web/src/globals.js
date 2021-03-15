import {Http, Auth, flatten, createAnonymousUser} from 'commloc'

import endpoints from '../__config__/endpoints.json'
import {anonymousUser, autoSignin, accessTokenKey, refreshTokenKey, userKey, anonymousRoleKey} from '../__config__/auth.json'
import {authStore} from './stores'

export const http = new Http(
    authStore,
    flatten(endpoints),
    window.fetch
)

export const auth = new Auth(
    authStore,
    http,
    {
        anonymousUser: createAnonymousUser(anonymousUser, anonymousRoleKey),
        endpoints: flatten(endpoints),
        autoSignin,
        accessTokenKey,
        refreshTokenKey,
        userKey
    }
)
