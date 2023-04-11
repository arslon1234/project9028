<template>
  <section class="warehouse__navbar">
    <div class="warehouse__navbar-prof">
    <img :src="$store?.state?.me?.image" @click="isShow" alt="user">
    <article :class="isHide ? 'article1' : 'article2'"></article>
    <aside :class="isHide ? 'warehouse__user-show' : 'warehouse__user-hide'">
      <ul>
        <li @click="Go_Profile">Profile</li>
        <li @click="Log_Out">Log out</li>
      </ul>
    </aside>
    </div>
  </section>
</template>

<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router';
import store from '@/store';
const router = useRouter()
const isHide = ref(false) 
const isShow =()=>{
  isHide.value = !isHide.value
}
const Log_Out =()=>{
  sessionStorage.removeItem("token")
  location.reload()
}
const Go_Profile =()=>{
  const role = sessionStorage.getItem("role")
  if(role === 'warehouseman'){
  router.push({name: 'warehouse_profile'})
  }else if(role === 'salesman'){
  router.push({name: 'sales_profile'})
  }else if(role === 'director'){
    router.push({name: 'director_profile'})
  }else if(role === 'financier'){
    router.push({name: 'finance_profile'})
  }
  isHide.value = false
}
</script>

<style scoped lang="scss">
$bg-color: #fff;
$blue-color: #435EBE;
.warehouse__navbar{
  position: sticky;
  top: 0;
  width: 100%;
  padding: 8px 20px;
  background-color: #fff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .warehouse__navbar-prof{
    width: 55px;
    height: 55px;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      position: relative;
    }
    .article2{
      display: none;
    }
    .article1{
      display: block;
      width: 17px;
      height: 17px;
      background-color: #F2F7FF;
      transform: rotate(315deg);
      border-radius: 2px;
      position: absolute;
      top: 90%;
      right: 30px;
    }
    .warehouse__user-hide{
      display: none;
    }
    .warehouse__user-show{
      display: block;
      position: absolute;
      top: 100%;
      right: 20px;
      width: 100px;
      height: 100px;
      border-radius: 5px;
      box-shadow: 2px 2px 2px 2px rgb(224, 223, 223);
      ul{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        background-color: $bg-color;
        li{
          width: 100%;
          text-align: center;
          padding: 5px;
          font-size: 17px;
          transition: all 0.4s linear;
          letter-spacing: 0.4px;
          &:hover{
            background-color: $blue-color;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>