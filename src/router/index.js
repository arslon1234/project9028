import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Auth/Login.vue'
import Warehouse from '../views/Warehouse/Warehouse.vue'
import ProductList from '../views/Warehouse/ProductList.vue'
import InvoiceInput from '../views/Warehouse/InvoiceInput.vue'
import InvoiceOutput from '../views/Warehouse/InvoiceOutput.vue'
import Returns from '../views/Warehouse/Returns.vue'
import Director from '../views/Director/Director.vue'
import Sales from '../views/Sales/Sales.vue'
import Finance from '../views/Finance/Finance.vue'
import Profile from '../views/Warehouse/Profile.vue'
import Groups_Brands from '../views/Warehouse/Groups-Brands.vue'
import SingleProduct from '../views/Warehouse/SingleProduct.vue'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/warehouse',
    name: 'warehouseman',
    component: Warehouse,
    children:[
      {
        path: "/product-list",
        name:"product-list",
        component:ProductList,
      },
      {
        path:"/groups-brands",
        name:"groups-brands",
        meta:{
          child: 'product_lists',
        },
        component: Groups_Brands
      },
      {
        path:"/single-product/:id",
        name:"single_product",
        meta:{
          child: 'product_lists',
        },
        component: SingleProduct
      },
      {
        path: "/invoice_input",
        name:"invoice_input",
        component:InvoiceInput
      },
      {
        path: "/invoice_output",
        name:"invoice_output",
        component:InvoiceOutput
      },
      {
        path: "/returns",
        name:"returns",
        component:Returns
      },
      {
        path: "/profile",
        name:"profile",
        component:Profile
      },
    ]
  },
  {
    path: "/director",
    name: "director",
    component: Director
  },
  {
    path: "/sales",
    name: "salesman",
    component: Sales
  },
  {
    path: "/financier",
    name: "financier",
    component: Finance
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")
  const name = to.name === "login"
  if(!token && !name){
    return next({name: "login"})
  }else{
    if(token && name){
      if(role === 'warehouseman'){
        return next({name: 'product-list'})
      }else if(role === 'salesman'){
        return next({name: "salesman"})
      }else if(role === 'director'){
        return next({name: 'director'})
      }else if(role === 'financier'){
        return next({name: 'financier'})
      }
    }else{
      next()
    }
  }
})
export default router
