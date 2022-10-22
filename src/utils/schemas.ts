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

export const domainSchema = object({
    domainUsername: string().required().label('Domain Provider Username Or Email'),
    domainPassword: string().required().label('Domain Provider Password'),
    domain: string().required().label('Domain'),
    hostUsername: string().label('Host Provider Username Or Email'),
    hostPassword: string().label('Host Provider Password'),
    host: string().label('Host'),
   
})