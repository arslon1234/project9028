<template>
  <section class="groups_brands">
    <groupBrand ref="group_brand"/>
    <groupBrand ref="delete_brand"/>
    <router-link to="/product_list_d" v-if="role === 'director'" class="btn">
      <i class="left fa-solid fa-left-long"></i>
      <span>Back</span>
    </router-link>
    <router-link to="/product-list" v-if="role === 'warehouseman'" class="btn">
      <i class="left fa-solid fa-left-long"></i>
      <span>Back</span>
    </router-link>
    <div class="groups_brands__item">
      <div class="groups_brands__item_el">
        <p>Groups</p>
        <div class="groups_brands__table">
          <appTable :headers="headers" :body="$store?.state.groups">
            <template #body_action="{item}">
              <button class="delete_btn" @click="deleteBrandGroup(item.id,'group')" v-if="role !== 'director'">delete</button>
        </template>
          </appTable>
        </div>
        <aside class="groups_brands_act">
          <button @click="openGroupBrand('groups')" v-if="role !== 'director'">Create</button>
        </aside>
      </div>
      <div class="groups_brands__item_el">
        <p>Brands</p>
        <div class="groups_brands__table">
          <appTable :headers="headers" :body="$store?.state.brands">
            <template #body_action="{ item }">
            <button class="delete_btn" @click="deleteBrandGroup(item.id,'brand')" v-if="role !== 'director'">delete</button>
           </template>
          </appTable>
        </div>
        <aside class="groups_brands_act">
          <button @click="openGroupBrand('brands')" v-if="role !== 'director'">Create</button>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import appTable from '@/components/ui/app-table.vue';
import groupBrand from '@/components/pages/group-brand.vue';
import store from '@/store';
import { mapGetters } from 'vuex';
const brands = ref([])
const groups = ref([])
const group_brand = ref()
const delete_group = ref()
const delete_brand = ref()
const role = localStorage.getItem('role')
const headers = ref([
  {title: "№", value:"id"},
  {title: "Name", value:"title"},
  {title: "Delete", value:"action"},
])
const deleteBrandGroup = (id,value) =>{
  delete_brand.value.deleteBrand(id,value)
}
const openGroupBrand =(item) =>{
  group_brand.value.create_group_brand(item)
}
</script>

<style lang="scss" scoped> 
$blue-color: #435ebe;
$blue-color2: #57caeb;
$input_bg: #edf2f7;
$white-color: #fff;
$red-color: #ff7976;
.groups_brands{
  width: 100%;
  padding: 10px;
  .btn{
    width: 100px;
    padding: 8px 5px;
    border-radius: 5px;
    color: $white-color;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    background-color: $blue-color;
    &:hover .left{
      transform: translateX(-5px);
    }
    .left{
      font-size: 14px;
      transition: all 0.3s linear;
    }
  }
  .groups_brands__item{
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .groups_brands__item_el{
      width: 50%;
      p{
        text-align: center;
        font-size: 23px;
        font-weight: 500;
      }
    }
    .groups_brands__table{
      width: 100%;
      .delete_btn{
        padding: 4px 8px;
        border: none;
        border-radius: 3px;
        background-color: $red-color;
        color: $white-color;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .groups_brands_act{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      button{
        padding: 10px 20px;
        color: $white-color;
        background-color: $blue-color2;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        margin-left: 10px;
        letter-spacing: 0.8px;
      }
    }
  }
}
</style>