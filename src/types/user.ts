import { userDetailSchema, userLoginSchema } from '@/utils/schemas'
import { InferType } from 'yup'

export type UserDetails = InferType<typeof userDetailSchema & userLoginSchema>
export type UserLogin = InferType<typeof userLoginSchema>

export type User = {
  id: string | null
  token?: string
} & Partial<UserDetails>  & Partial<UserLogin> 
