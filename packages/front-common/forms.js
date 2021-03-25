import * as yup from 'yup'

export class Forms {

    static NO_ERROR = '';
    static IS_TOUCHED = true;

    constructor(schema, opts = {}) {
        this.schema = yup.object().shape(schema)
        this.initialValues = opts.initialValues || {}
        this.validateOnBlur = opts.validateOnBlur !== false // unless specified this is true
        this._formState = Object.keys(schema).reduce((acc, k) => {
            acc[k] = {
                value: this.initialValues[k] || Forms.initialValue(schema[k].type),
                touched: false,
                errors: [],
                isValidating: false,
                validation: this.validationPipe
            }
            return acc
        }, {})
    }

    hasError(k){
        return this._formState[k].errors.length
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

    validation(k){

    }
}