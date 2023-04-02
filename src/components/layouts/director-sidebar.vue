<template>
    <section :class="props.isShow ? 'sidebar1' : 'sidebar'">
     <div class="sidebar__img" @click="props.isShowItem">
      <i class="img-icon fa-solid fa-bars-staggered"></i>
     </div>
     <div class="sidebar__items">
      <router-link to="/dashboard" active-class="sidebar__item1" class="sidebar__item">
          <span><i class="fa-solid fa-chart-column"></i></span>
          <span :class="isShow ? 'sidebar__items-title' : ''" >Dashboard</span>
      </router-link>
      <router-link to="/dashboard_demo" active-class="sidebar__item1" class="sidebar__item">
          <span><i class="fa-solid fa-chart-column"></i></span>
          <span :class="isShow ? 'sidebar__items-title' : ''" >Dashboard demo</span>
      </router-link>
      <router-link to="/product_list_d" active-class="sidebar__item1" class="sidebar__item" :class="{ sidebar__item1: $route.meta.child === 'product_lists_d' }">
          <span><i class="fa-solid fa-list"></i></span>
          <span :class="isShow ? 'sidebar__items-title' : ''" >Products</span>
      </router-link>
      <router-link to="/input_invoice" active-class="sidebar__item1" class="sidebar__item" :class="{ sidebar__item1: $route.meta.child === 'input_item_director' }">
          <span><i class="fa-solid fa-building-circle-check"></i></span>
          <span :class="isShow ? 'sidebar__items-title' : ''" >Arrived</span>
      </router-link>
      <router-link to="/output_invoice" active-class="sidebar__item1" class="sidebar__item" :class="{ sidebar__item1: $route.meta.child === 'output_item_director' }">
          <span><i class="fa-solid fa-building-circle-arrow-right"></i></span>
          <span :class="isShow ? 'sidebar__items-title' : ''" >Delivered</span>
      </router-link>
      <router-link to="/returned" active-class="sidebar__item1" class="sidebar__item" :class="{ sidebar__item1: $route.meta.child === 'returns_item_director' }">
          <span><i class="fa-solid fa-building-circle-exclamation"></i></span>
          <span :class="isShow ? 'sidebar__items-title' : ''" >Returned</span>
      </router-link>
      <router-link to="/supplier" active-class="sidebar__item1" class="sidebar__item">
        <span><i class="fa-solid fa-truck-field"></i></span>
          <span :class="isShow ? 'sidebar__items-title' : ''" >Suppliers</span>
      </router-link>
      <router-link to="/director_client_lists" active-class="sidebar__item1" class="sidebar__item">
          <span><i class="fa-solid fa-coins"></i></span>
          <span :class="isShow ? 'sidebar__items-title' : ''" >Clients</span>
      </router-link>
      <router-link to="/income_director" active-class="sidebar__item1" class="sidebar__item">
          <span><i class="fa-solid fa-coins"></i></span>
          <span :class="isShow ? 'sidebar__items-title' : ''" >Income</span>
      </router-link>
      <router-link to="/expence_director" active-class="sidebar__item1" class="sidebar__item" >
         <span><i class="fa-solid fa-coins"></i></span>
          <span :class="isShow ? 'sidebar__items-title' : ''" >Expence</span>
      </router-link>
     </div>
    </section>
  </template>
  
  <script setup>
  
  const props = defineProps({
      isShow:{
          type: Boolean
      },
      isShowItem:{
          type: Function
      }
  })
  </script>
  
  <style scoped lang="scss">
$blue-color: #435EBE;
$hover-color: #f0f1f5;
$bg-color: #fff;
.sidebar1{
    width: 53px;
    height: 100vh;
    position: fixed;
    background-color: $bg-color;
    transition: all 0.4s linear;
    overflow: hidden;
}
.sidebar{
    width: 300px;
    height: 100vh;
    position: fixed;
    background-color: $bg-color;
    transition: all 0.4s linear;
    overflow: hidden;
}
.sidebar__img{
        margin: 20px;
        .img-icon{
            font-size: 20px;
            color: $blue-color;
            cursor: pointer;
        }
}
.sidebar__items{
        width: 100%;
        margin-top: 70px;
        display: flex;
        flex-direction: column;
        align-items: center;
        @mixin sidebar__item($color, $bg_color){
            color: $color;
            background-color: $bg_color;
        }
        %sidebar_item{
            width: 90%;
            margin: 10px;
            padding: 12px 17px;
            font-size: 18px;
            display: flex;
            align-items: center;
            gap: 15px;
            border-radius: 5px;
            cursor: pointer
        }
        .sidebar__item{
            @extend %sidebar_item;
            @include sidebar__item($blue-color, transparent);
            &:hover{
                background-color: $hover-color;
            }
        }
        .sidebar__item1{
            @extend %sidebar_item;
            @include sidebar__item(#fff, $blue-color);
            &:hover{
                background-color: $blue-color;
            }
        }
}
@media screen and (max-width: 1024px) {
    .sidebar{
    width: 53px;
    height: 100vh;
    position: fixed;
    background-color: $bg-color;
    transition: all 0.4s linear;
    overflow: hidden;
}
.sidebar1{
    width: 300px;
    height: 100vh;
    position: fixed;
    background-color: $bg-color;
    transition: all 0.4s linear;
    z-index: 999;
    overflow: visible;
}


@mixin sidebar__item($color, $bg_color){
    color: $color;
    background-color: $bg_color;
}
%sidebar_item{
    display: block;
    width: 90%;
    margin: 10px;
    padding: 12px 17px;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 15px;
    border-radius: 5px;
    cursor: pointer
}

}
</style>