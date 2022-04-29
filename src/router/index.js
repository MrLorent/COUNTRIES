import Countries from '@/views/CountriesView.vue';
import Country from '@/views/CountryView.vue';
import {createRouter, createWebHistory} from 'vue-router';

const routes =
    [
      /*====== COUNTRIES ======*/
      {
        name: 'countries',
        path: '/',
        component: Countries,
      },
      {
        name: 'country',
        path: '/country/:id',
        component: Country,
        props: true,
      },
    ]

    const router = createRouter({
      history: createWebHistory(),
      routes,
    })

export default router;