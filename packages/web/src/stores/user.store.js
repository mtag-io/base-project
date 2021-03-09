import {getAuth, post} from "../lib/http";
import {endpoints} from '../../__config__/endpoints.json'
import {derived, writable} from "svelte/store";
import {autoLogin, accessTokenKey, anonymousUser, refreshTokenKey, userKey} from '../../__config__/auth.json'
import {accessToken, refreshToken} from "./token.store";

const init = authPayload => {
    accessToken.update(() => authPayload[accessTokenKey])
    localStorage.setItem('accessToken', authPayload[accessTokenKey])
    refreshToken.update(() => authPayload[refreshTokenKey])
    localStorage.setItem('refreshToken', authPayload[refreshTokenKey])
}

const dispose = () => {
    accessToken.update(() => '')
    refreshToken.update(() => '')
    localStorage.removeItem('userId')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}

// auth
const auth = () => {

    const {subscribe, update} = writable(anonymousUser)

    const signIn = async signInDto => {
        try {
            const authPayload = await post(endpoints.signin, {body: signInDto})
            update(() => authPayload[userKey])
            init(authPayload)
        } catch (err) {
            return err.message
        }
    }

    const autoSignIn = async () => {
        const rTok = autoLogin && localStorage.getItem('refreshToken')
        if (rTok) {
            update(user => {
                user.userId = 'pending'
                return user
            })
            try {
                const authPayload = await getAuth(endpoints.signin)
                update(() => authPayload[userKey])
                init(authPayload)
            } catch (err) {
                console.log(`AutoSignIn failed: ${err.message}`)
            }
        }
    }

    const signOut = () => {
        update(() => anonymousUser)
        dispose()
    }

    return {
        subscribe,
        update,
        signIn,
        signOut,
        autoSignIn
    }
}

export const user = auth()

export const isAuth = derived(user, $user => $user['userId'])