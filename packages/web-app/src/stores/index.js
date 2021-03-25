import {derived, writable} from 'svelte/store'
import {Auth, createAnonymousUser, flatten, Http} from 'front-common'
import endpoints from 'config/endpoints.json'
import {accessTokenKey, anonymousRoleKey, anonymousUser, autoSignin, refreshTokenKey, userKey} from 'config/auth.json'

// the global auth store
export const authStore = writable({
    user: createAnonymousUser(anonymousUser, anonymousRoleKey),
    accessToken: '',
    refreshToken: ''
})

// an "is a user registered" store
export const isAuth = derived(
    authStore,
    $store => !!$store.user.userId
)

// a store that contains the current path of the application
export const currentPath = writable('')

// is servicePAge
// export const  isServicePAge = derived()

// the global http fetch dog
export const http = new Http(
    authStore,
    flatten(endpoints),
    window.fetch
)

// the global auth store engine
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