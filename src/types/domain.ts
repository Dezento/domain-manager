import { domainSchema } from '@/utils/schemas'
import { InferType } from 'yup'
export type Domain = InferType<typeof domainSchema>