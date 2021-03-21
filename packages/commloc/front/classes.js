export class ClassBuilder {

    constructor(defaultClasses) {
        this._class = defaultClasses.split(' ').filter(c => !!c)
        this.replace = this.replace.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
    }

    get get() {
        return this._class.join(' ')
    }


    replace(source, dest, cond) {
        if (cond) this._class.map(c => c === source ? dest : c)
        return this
    }

    remove(cls, cond = true) {
        if (cond) this._class.filter(c => c !== cls)
        return this
    }

    add(cls, cond, alt = '') {
        if (cond === undefined || cond)
            this._class.push(cls)
        if (alt && !cond)
            this._class.push(alt)
        return this
    }
}