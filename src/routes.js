import Home from '@/pages/HomePage.vue'
import Product from '@/pages/ProductPage.vue'
import Search from '@/pages/SearchPage.vue'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Página Home',
    meta: {
      title: 'WK3 Outlet',
      layout: 'AppLayoutDefault'
    }
  },
  {
    path: '/p/:url',
    component: Product,
    name: 'Página de Produto',
    meta: {
      title: 'WK3 Outlet',
      layout: 'AppLayoutDefault'
    }
  },
  {
    path: '/search/:q',
    component: Search,
    name: 'Página de listagem',
    meta: {
      title: 'WK3 Outlet',
      layout: 'AppLayoutDefault'
    }
  }
]

export default routes;
