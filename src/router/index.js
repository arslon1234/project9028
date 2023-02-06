import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Auth/Login.vue'
import Warehouse from '../views/Warehouse/Warehouse.vue'
import ProductList from '../views/Warehouse/ProductList.vue'
import InvoiceInput from '../views/Warehouse/InvoiceInput.vue'
import InvoiceOutput from '../views/Warehouse/InvoiceOutput.vue'
import InvoiceOutputItem from '../views/Warehouse/OutputItem.vue'
import InvoiceInputItem from '../views/Warehouse/InputItem.vue'
import Returns from '../views/Warehouse/Returns.vue'
import ReturnsItem from '../views/Warehouse/ReturnsItem.vue'
import Director from '../views/Director/Director.vue'
import Sales from '../views/Sales/Sales.vue'
import Finance from '../views/Finance/Finance.vue'
import Profile from '../views/Warehouse/Profile.vue'
import Groups_Brands from '../views/Warehouse/Groups-Brands.vue'
import SingleProduct from '../views/Warehouse/SingleProduct.vue'
import Suppliers from '../views/Warehouse/Suppliers.vue'
import Income from '../views/Finance/Income.vue'
import Expence from '../views/Finance/Expence.vue'
import Clients from '../views/Sales/Clients.vue'
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
        path: "/invoice_output_item/:id",
        name:"invoice_output_item",
        meta:{
          child: 'output_item',
        },
        component:InvoiceOutputItem
      },
      {
        path: "/invoice_input_item/:id",
        name:"invoice_input_item",
        meta:{
          child: 'input_item',
        },
        component:InvoiceInputItem
      },
      {
        path: "/returns",
        name:"returns",
        component:Returns
      },
      {
        path: "/returns_item/:id",
        name:"returns_item",
        meta:{
          child: 'returns_item'
        },
        component:ReturnsItem
      },
      {
        path: "/suppliers",
        name:"suppliers",
        component:Suppliers
      },
      {
        path: "/profile",
        name:"warehouse_profile",
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
    component: Sales,
    children:[
      {
        path: '/clients',
        name: 'clients',
        component: Clients
      },
      {
        path: "/profile",
        name:"sales_profile",
        component:Profile
      },
    ]
  },
  {
    path: "/financier",
    name: "financier",
    component: Finance,
    children:[
      {
        path: '/income',
        name: 'income',
        component: Income
      },
      {
        path: '/expence',
        name: 'expence',
        component: Expence
      },
      {
        path: "/profile",
        name:"finance_profile",
        component:Profile
      },
    ]
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
        return next({name: "clients"})
      }else if(role === 'director'){
        return next({name: 'director'})
      }else if(role === 'financier'){
        return next({name: 'income'})
      }
    }else{
      next()
    }
  }
})
export default router
