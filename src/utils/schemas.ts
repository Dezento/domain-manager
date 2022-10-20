import { object, string } from 'yup'

export const userDetailSchema = object({
    first_name: string().required().label('First name'),
    last_name: string().required().label('Last name'),
})

export const userLoginSchema = object({
    email: string().required().email().label('Email'),
    password: string().required().label('Password'),
})

export const useRegistrationSchema = userDetailSchema.concat(userLoginSchema)