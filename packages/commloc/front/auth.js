export class Auth {
    constructor(authStore, http, opts = {}) {
        this.store = authStore
        this.http = http
        this.accessTokenKey = opts['accessTokenKey'] || 'accessToken'
        this.refreshTokenKey = opts['refreshTokenKey'] || 'refreshToken'
        this.userKey = opts['userKey'] || 'user'
        this.anonymousUser = {
            user: opts['anonymousUser'],
            accessToken: '',
            refreshToken: ''
        }
        this.endpoints = opts.endpoints
        this.autosignIn = opts.autosignIn
        this._authData = null
        this.store.subscribe(authData => {
            this._authData = authData
        })
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.auto = this.auto.bind(this);
    }

    setAnonymous() {
        this.store.update(() => ({
            anonymousUser: this.anonymousUser,
            accessToken: '',
            refreshToken: ''
        }))
        localStorage.removeItem('userId')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }

    setUser(authPayload) {
        this.store.update(() => ({
            user: authPayload[this.userKey],
            accessToken: authPayload[this.accessTokenKey],
            refreshToken: authPayload[this.refreshTokenKey]
        }))
        localStorage.setItem('userId', authPayload[this.userKey]['userId'] )
        localStorage.setItem('accessToken', authPayload[this.accessTokenKey])
        localStorage.setItem('refreshToken', authPayload[this.refreshTokenKey])
    }

    clearStorage() {
        localStorage.removeItem('userId')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }

    get isAuth() {
        return !!this._authData.user.userId
    }

    get userId() {
        return this._authData.user.userId
    }

    get email() {
        return this._authData.user.email
    }

    get role() {
        return this._authData.user.role
    }

    get profile() {
        return this._authData.user.profile
    }

    async signIn(signInDto) {
        try {
            const authPayload = await this.http.post(
                this.endpoints['AUTH_SINGIN'],
                {
                    body: signInDto,
                    sensitive: true
                })
            this.store.update(() => authPayload[this.userKey])
            this.setUser(authPayload)
        } catch (err) {
            return err.message
        }
    }

    async auto() {
        const refreshToken = this.autosignIn() && localStorage.getItem('refreshToken')
        if (refreshToken) {
            try {
                const authPayload = await this.http.getAuth(this.endpoints['AUTH_REFRESH'])
                this.store.update(() => authPayload)
                this.setUser(authPayload)
            } catch (err) {
                console.warn(`AUTH_ERR: Auto signIn failed: ${err.message}`)
            }
        }
    }

    signOut() {
        this.store.update(() =>  this.anonymousUser)
        this.clearStorage()
    }
}
