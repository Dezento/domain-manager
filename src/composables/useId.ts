import { nanoid } from 'nanoid'

export const useId = () => {
  return nanoid(5)
}
