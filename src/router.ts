import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/views/Index';
import Package from '@/views/Package';
import MissingPackages from '@/views/MissingPackages';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Index},
    { path: '/missing', component: MissingPackages},
    { path: '/:package', component: Package},
  ],
});
