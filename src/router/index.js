import Countries from '@/views/CountriesView.vue';
import {createRouter, createWebHistory} from 'vue-router';

const routes =
    [
      {
        name: 'home',
        path: '/',
        component: Countries,
      },
    ]

    const router = createRouter({
      history: createWebHistory(),
      routes,
    })

export default router;