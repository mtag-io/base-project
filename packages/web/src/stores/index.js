import {writable} from "svelte/store";
import {anonymousRoleKey, anonymousUser} from '../../__config__/auth.json'
import {createAnonymousUser} from 'commloc'

export const authStore = writable({
    user: createAnonymousUser(anonymousUser, anonymousRoleKey),
    accessToken: '',
    refreshToken: ''
})