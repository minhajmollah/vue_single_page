import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{ path: '/', name: 'Home', component: () => import('../views/Home.vue') },
	{ path: '/about', name: 'About', component: () => import('../views/About.vue') },
	{ path: '/sitrep', name: 'SitRepList', component: () => import('../views/SitRepList.vue') },
	{ path: '/sitrep/:id', name: 'SitRep', component: () => import('../views/SitRep.vue') },
	{ path: '*', redirect: '/' },
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
