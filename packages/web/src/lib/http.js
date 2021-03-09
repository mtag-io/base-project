import {HttpError} from "./http-error.class";
import {AUTHORIZATION, BASE_HEADERS, DELETE, GET, PATCH, POST} from "../constants/http";
import {accessToken} from "../stores/token.store";

const storeGet = store => {
    let val = null
    store.update(v => {val = v})
    return val
}

const serialize = obj => {
    const str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return '?' + str.join("&");
}

const baseHttp = async (opts) => {
    const {token, url,method, body, params, query} = opts
    const payload = {
        url,
        headers: BASE_HEADERS,
        method
    }

    if (params) payload.url += `/${params}`
    if (query) payload.url += serialize(query)
    if (method !== GET) payload.body = JSON.stringify(body)

    if (token) payload.headers[AUTHORIZATION] = `Bearer ${token}`

    let res = null

    try {
        res = await fetch(url, payload)
        if (res.ok) return await res.json()
    } catch (err) {
        throw new HttpError(err)
    }
    throw new HttpError(res.status)
}


export const postAuth = async (url, opts) => baseHttp({...opts, url, method: POST, token: storeGet(accessToken)})
export const post = async (url, opts) => baseHttp({...opts, url, method: POST})

export const get = async (url, opts) => baseHttp({...opts, url, method: GET})
export const getAuth = async (url, opts) => baseHttp({...opts, url, method: GET, token: storeGet(accessToken)})

export const patch = async (url, opts) => baseHttp({...opts, url, method: PATCH})
export const patchAuth = async (url, opts) => baseHttp({...opts, url, method: PATCH, token: storeGet(accessToken)})

export const remove = async (url, opts) => baseHttp({...opts, url, method: DELETE})
export const removeAuth = async (url, opts) => baseHttp({...opts, url, method: DELETE, token: storeGet(accessToken)})
