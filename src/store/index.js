import { createStore } from 'vuex'
import http from '@/plugins/axios'
export default createStore({
  state(){
    me: {};
    brands:[];
    groups:[];
    suppliers:[];
    clients:[];
    products:[];
    count: null;
  },
  getters: {
  },
  mutations: {
    getMe(state,data){
      state.me = data
    },
    getBrands(state,data){
      state.brands = data
    },
    getGroups(state,data){
      state.groups = data
    },
    getSuppliers(state,data){
      state.suppliers = data
    },
    getClients(state,data){
      state.clients = data
    },
    getProducts(state,data){
      state.products = data
    }
  },
  actions: {
    getMe({commit}){
      http.get("api/user/me").then(res=>{
        commit("getMe", res.data)
      })
    },
    getBrands({commit},param){
      http.get("/api/warehouse/brand/",{
        params:{
          per_page: param?.per_page,
          page: param?.page,
        }
       }).then((res)=>{
        res.data.results.forEach((item,index)=>{
          item.index =
          param?.page * param?.per_page -
          (param?.per_page - 1) +
          index;
        })
        commit("getBrands",res.data.results)
      })
    },
    getGroups({commit} , param){
      http.get("/api/warehouse/group/",{
        params:{
          per_page: param?.per_page,
          page: param?.page,
        }
       }).then((res)=>{
        res.data.results.forEach((item,index)=>{
          item.index =
          param?.page * param?.per_page -
          (param?.per_page - 1) +
          index;
        })
        commit("getGroups", res?.data?.results)
        console.log(res.data.results, 'group')
      })
    },
    getSuppliers({commit}){
      http.get("/api/warehouse/supplier/").then((res)=>{
        commit("getSuppliers",res.data.results)
      })
    },
    getClients({commit}){
      http.get("/api/sales/client/").then((res)=>{
        commit("getClients",res.data.results)

      })
    },
    getProducts({commit}){
      http.get("/api/warehouse/product/").then((res)=>{
        commit("getProducts",res.data.results)
        console.log(res.data,'res')
      })
    }
  },
  modules: {
  }
})
