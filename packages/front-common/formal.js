import * as yup from 'yup'
import {writable} from 'svelte/store'

export class Formal {

    static NO_ERROR = '';
    static IS_TOUCHED = true;

    constructor(schema, opts = {}) {
        this.schema = yup.object().shape(schema)
        this.initialValues = opts.initialValues || {}
        this.validateOnBlur = opts.validateOnBlur !== false // unless specified this is true
        this._state = writable(Object.keys(schema).reduce((acc, k) => {
            acc[k] = {
                value: this.initialValues[k] || Forms.initialValue(schema[k].type),
                touched: false,
                errors: [],
                isValidating: false
            }
            return acc
        }, {}))
    }

    validateField(k, val){
        return yup.reach(this.schema, 'k').validate(val)
    }

    hasError(k){
        return this._state[k].errors.length
    }

    onChange(k, val){
        this._state.update(() => ({
            ...this._state,
            values: {
                ...this._state.values,
                k: val}
        }))
    }

    onBlur(k, val){
        if(!this.validateOnBlur) return
        const err = this.validateField(k, val)
        this._state.update(
            () => ({
                ...this._state,
                errors: {
                    ...this._state.errors,
                    k: [...err]}
            })
        )
    }

    static initialValue = (type) => {
        switch(type){
            case 'boolean':
                return 'false'
            case 'number':
                return 0
            case "date":
                return Date.now().toISOString()
            default:
                return ''
        }
    }

    onSubmit(fn){
        fn(this._state.values)
    }
}