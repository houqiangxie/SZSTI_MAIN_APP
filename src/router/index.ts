import { createRouter, createWebHashHistory,createWebHistory,RouteRecordRaw } from "vue-router";

const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/views/index.vue'),
    },
    {
        path: '/lhzh/:page*',
        name: 'Child1',
        component: () => import('@/views/child1.vue'),
    },
    {
        path: '/app-child/:page*',
        name: 'Child2',
        component: ()=> import('@/views/child2.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect:'/'
    }
]


export default createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(import.meta.env.BASE_URL),
//   history: createWebHistory("/custom-scaffold/"),
  routes, // short for `routes: routes`
});