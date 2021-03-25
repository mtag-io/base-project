class Store {
    constructor(initVal) {
        this._value = initVal
        this._subscribers = []
        this.subscribe = this.subscribe.bind(this);
        this.update = this.update.bind(this);
    }

    get value() {
        return this._value
    }

    set value(data) {
        this._value = data
    }

    subscribe(fn) {
        this._subscribers.push(fn)
        fn(this.value)
    }

    update(fn) {
        this._subscribers.forEach(
            _fn => {
                this.value = fn(this.value)
                _fn(this.value)
            })
    }
}

module.exports = {
    writable: initVal => new Store(initVal)
}