import { Ref, ref } from 'vue'
import { createGlobalState, useStorage } from '@vueuse/core'
import type { User } from '@/types/user'

export const useGlobalState = createGlobalState(() => {

    const user = useStorage('user-storage', JSON.stringify({}) , localStorage)

    const saveUser = (userData: User) => user.value = JSON.stringify(userData)

    const getUser = (): User  => JSON.parse(user.value)

    const logOutUser = ()  =>  user.value = JSON.stringify({})
    
    return { getUser, saveUser, logOutUser }
})
