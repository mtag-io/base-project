import {flatten}  from '../common/endpoints.helpers'
import {AUTHORIZATION, DELETE, GET, PATCH, POST}  from "../common/named.const"
import {BASE_HEADERS} from '../common/http.const'

export class Http {

    constructor(authStore, endpoints, fetch) {

        this.fetch = fetch
        this.accessToken = ''

        authStore.subscribe(({accessToken}) => {
            this.accessToken = accessToken
        })

        this.endpoints = flatten(endpoints)
        this.serialize = obj =>
            Object.keys(obj).reduce((acc, k) => {
                acc.push(encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]));
                return acc
            }, []).join("&")

        this.post = this.post.bind(this);
        this.postAuth = this.postAuth.bind(this);
        this.get = this.get.bind(this);
        this.getAuth = this.getAuth.bind(this);
        this.patch = this.patch.bind(this);
        this.patchAuth = this.patchAuth.bind(this);
        this.remove = this.remove.bind(this);
        this.removeAuth = this.removeAuth.bind(this);
    }

    setHeaders(headers = {}) {
        const tmp = {
            ...BASE_HEADERS,
            ...headers
        }
        if (this.accessToken) tmp[AUTHORIZATION] = `Bearer ${this.accessToken}`
        return tmp
    }

    async request(opts) {
        const {url, method, body, params, query, headers} = opts

        const payload = {
            url,
            headers: this.setHeaders(headers),
            method
        }

        if (params) payload.url += `/${params}`
        if (query) payload.url += serialize(query)
        if (method !== GET && payload.body)
            payload.body = payload.pre
                ? JSON.stringify(payload.pre(body))
                : JSON.stringify(body)

        try {
            const raw = await this.fetch(url, payload)
            if (raw['ok']) {
                const res = await raw['json']()
                return payload.normalize
                    ? payload.normalize(res)
                    : res
            }
        } catch (err) {
            throw new Error(`HTTP_ERR: ${err}`)
        }
        throw new Error(`HTTP_ERR: ${raw.status}`)
    }

    postAuth = async (endpoint, opts) => this.request({
        ...opts,
        url: this.endpoints[endpoint],
        method: POST
    })
    post = async (endpoint, opts) => this.request({
        ...opts,
        url: this.endpoints[endpoint],
        method: POST
    })
    get = async (endpoint, opts) => this.request({
        ...opts,
        url: this.endpoints[endpoint],
        method: GET
    })
    getAuth = async (endpoint, opts) => this.request({
        ...opts,
        url: this.endpoints[endpoint],
        method: GET
    })
    patch = async (endpoint, opts) => this.request({
        ...opts,
        url: this.endpoints[endpoint],
        method: PATCH
    })
    patchAuth = async (endpoint, opts) => this.request({
        ...opts,
        url: this.endpoints[endpoint],
        method: PATCH
    })
    remove = async (endpoint, opts) => this.request({
        ...opts,
        url: this.endpoints[endpoint],
        method: DELETE
    })
    removeAuth = async (endpoint, opts) => this.request({
        ...opts,
        url: this.endpoints[endpoint],
        method: DELETE
    })
}


