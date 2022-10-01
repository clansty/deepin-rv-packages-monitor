import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/views/Index';
import Package from '@/views/Package';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Index},
    { path: '/:package', component: Package},
  ],
});
