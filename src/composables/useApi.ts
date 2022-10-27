import { createFetch } from '@vueuse/core'

export const useApi = createFetch({
  baseUrl: import.meta.env.VITE_API_URL!,
  options: {
    async beforeFetch(ctx) {
      ctx.options.headers = {
        ...ctx.options.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }

      return ctx
    },
  },
  fetchOptions: {
    mode: 'cors'
  },
})
