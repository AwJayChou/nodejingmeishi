import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import About from '@/components/About'
import Contact from '@/components/Contact'
import News from '@/components/News'
import Product from '@/components/Product'
import Product1 from '@/components/Product1'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ProductDetail from '@/components/ProductDetail'
import NewsDetail from '@/components/NewsDetail'
import cart from '@/components/cart'
//import VueResource from 'vue-resource'
Vue.use(Router);
//Vue.use(VueResource)
export default new Router({
  routes: [
    {path: '/', component: Index},
    {path: '/about', component: About},
    {path: '/contact', component: Contact},
    {path: '/news', component: News},
    {path: '/product',
              component: Product,
              children:[
                {path:'product1',component:Product1}
              ]
    },

    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/productDetail', component: ProductDetail},
    {path: '/newsDetail', component: NewsDetail},
    {path: '/cart', component: cart},
  ]
})
