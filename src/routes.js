import Home from '@/pages/HomePage.vue'
import Product from '@/pages/ProductPage.vue'
import Search from '@/pages/SearchPage.vue'
import MinhaContaPage from '@/pages/MinhaContaPage.vue'
import EntrarPage from '@/pages/EntrarPage.vue'
import CheckoutPage from '@/pages/CheckoutPage.vue'

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
    path: '/minha-conta',
    component: MinhaContaPage,
    name: 'Minha conta',
    meta: {
      title: 'WK3 Outlet',
      layout: 'AppLayoutDefault'
    }
  },
  {
    path: '/entrar',
    component: EntrarPage,
    name: 'Entre ou cadastre-se',
    meta: {
      title: 'WK3 Outlet',
      layout: 'AppLayoutDefault'
    }
  },
  {
    path: '/checkout',
    component: CheckoutPage,
    name: 'Checkout',
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
