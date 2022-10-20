import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'
import './style.css'

const state = useGlobalState()
const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  
  if(to.fullPath.includes('dashboard')){

    const authorize = await authorizeUser(state.getUser())

    if(!authorize.data){
      console.log(authorize)
      return next({
        path: '/',
      //  query: { from: from.path },
      })
    }
	  
  }

  return next()
})

app.use(router)
app.mount('#app')



const authorizeUser = async (data) => {
	return fetch('/api/auth', {
		body: JSON.stringify(data),
		method: 'POST'
	}).then(response => {
		return response.json()
	})
} 