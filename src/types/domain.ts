import { domainSchema } from '@/utils/schemas'
import { InferType } from 'yup'

export type DomainDetails = InferType<typeof domainSchema>

export type Domain = {
    id: number | null
    domainUId: string | null
    domainPId: string | null
    hostUId: string | null
    hostPId: string | null,
  } & Partial<DomainDetails>