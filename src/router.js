import settings from '@/app-settings.js'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: {
			title: settings.siteSubtitle,
		}
	},
	// {
	// 	path: '/page',
	// 	name: 'page',
	// 	component: () => import('@/pages/Page.vue'),
	// 	meta: {
	// 		title: 'Page',
	// 	}
	// },
	{
		path: '/:pathMatch(.*)*',
		name: 'Error',
		component: () => import('@/pages/404.vue'),
		meta: {
			title: 'Page not found',
		}
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {

	// Change title
	document.title = settings.siteTitle + ' – ' + to.meta.title || settings.siteTitle

	// Init load fonts ready
	if (!from.name) { document.fonts.ready.then(() => { next() }) }
	else { next() }
	
})

export default router