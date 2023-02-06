import { createStore } from 'vuex'
import http from '@/plugins/axios'
export default createStore({
  state(){
    me: {};
    brands:[];
    groups:[];
    suppliers:[];
    clients:[];
    count: null
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
    }
  },
  actions: {
    getMe({commit}){
      http.get("api/user/me").then(res=>{
        commit("getMe", res.data)
      })
    },
    getBrands({commit}){
      http.get("/api/warehouse/brand/").then((res)=>{
        commit("getBrands",res.data.results)
      })
    },
    getGroups({commit}){
      http.get("/api/warehouse/group/").then((res)=>{
        commit("getGroups",res.data.results)
      })
    },
    getSuppliers({commit}){
      http.get("/api/warehouse/supplier/").then((res)=>{
        commit("getSuppliers",res.data.results)
        // this.state.suppliers.forEach(element => {
        //   element.index =  params.value.page * params.value.per_page -
        //   (params.value.per_page - 1) +
        //   index;
        // });
        // params.value.last_page = Math.ceil(res.data.count / params.value.per_page);
      })
    },
    getClients({commit}){
      http.get("/api/sales/client/").then((res)=>{
        commit("getClients",res.data.results)
      })
    }
  },
  modules: {
  }
})
