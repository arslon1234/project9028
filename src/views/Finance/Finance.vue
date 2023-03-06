<template>
    <section class="warehouse">
      <div :class="isShow ? 'warehouse__sidebar1' : 'warehouse__sidebar'">
        <financeSidebarVue :isShow="isShow" :isShowItem="isShowItem"/>
      </div>
      <div :class="isShow ? 'warehouse__main' : 'warehouse__main1'">
        <div class="warehouse-navbar">
          <warehouseNavbarVue />
        </div>
        <router-view class="router"></router-view>
      </div>
    </section>
  </template>
  
  <script setup>
  import financeSidebarVue from '@/components/layouts/finance-sidebar.vue';
  import warehouseNavbarVue from '@/components/layouts/warehouse-navbar.vue';
  import { ref } from 'vue';
  import store from '@/store';
  import {onMounted } from 'vue'
  const isShow = ref(false)
  const isShowItem =()=>{
    isShow.value = !isShow.value
  }
  onMounted(() => {
    store.dispatch("getMe")
    store.dispatch("getGroups")
    store.dispatch("getBrands")
    store.dispatch("getSuppliers")
    store.dispatch("getClients")
  })
  </script>
  
  <style scoped lang="scss">
$bg-color: #F2F7FF;

.warehouse{
  width: 100%;
  height: 100vh;
  display: flex;
  %warehouse__global{
    height: 100%;
    background-color: $bg-color;
    transition: all 0.4s linear;
  }
  .warehouse__main1{
    width: calc(100% - 300px);
    @extend %warehouse__global
  }
  .warehouse__main{
    width: calc(100% - 53px);
    @extend %warehouse__global
  }
  .warehouse__sidebar1{
    width: 62px;
    transition: all 0.4s linear;
  }
  .warehouse__sidebar{
    width: 300px;
  }
  .warehouse-navbar{
    width: 100%;
    position: sticky;
    top: 0;
  }
}
@media screen and (max-width: 1024px) {
  %warehouse__global2{
    height: 100%;
    background-color: $bg-color;
    transition: all 0.4s linear;
  }
  .warehouse__sidebar{
    width: 62px !important;
  }
  .warehouse__main1{
    width: calc(100% - 53px) !important;
    @extend %warehouse__global2
  }
}
</style>