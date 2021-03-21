import * as yup from 'yup'

const signinSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required()
})

const signupSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
    passwordConfirm: yup.string().required()
})

export {signinSchema, signupSchema}