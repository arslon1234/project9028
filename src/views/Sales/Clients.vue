<template>
    <div class="product__lists">
      <clientModal ref="client_list"/>
      <div class="product__lists-action">
        <button @click="openModal" v-if="role !== 'director'">Add client</button>
      </div>
      <div class="product__lists-table">
        <app-table :headers="headers" :body="client_lists">
          <template #body_action="{ item }">
            <div class="actions" v-if="role !== 'director'">
                <span class="edit" @click="openModalEdit(item)"><i class="fa-solid fa-pen-to-square"></i></span>
                <span class="delete" @click="openModalDelete(item)"><i class="fa-solid fa-trash-can"></i></span>
            </div>
          </template>
          <template #body_title="{ item }">
          <span class="product__lists-table-text">{{ item.title }}</span>
        </template>
        </app-table>
      </div>
      <div class="pagination">
        <VPagination
          v-model="params.page"
          :pages="params.last_page"
          :range-size="1"
          active-color="#EAF5FF"
          @update:modelValue="getItem"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import {ref} from 'vue'
  import appTable from '@/components/ui/app-table.vue';
  import http from '@/plugins/axios';
  import VPagination from "@hennge/vue3-pagination";
  import groupBrand from '@/components/pages/group-brand.vue';
  import clientModal from '../../components/pages/sales-client.vue'
  import { onUnmounted } from 'vue';
  const client_list = ref()
  const client_lists = ref([])
  const params = ref({
    page: 1,
    per_page: 10,
    last_page: null,
  });
  const headers = ref([
    {title: "№", value:"index"},
    {title: "Name", value:"title"},
    {title: "Phone number", value:"phone_number"},
    {title: "Address", value:"address"},
    {title: "Action", value:"action"},
  ])
const role = localStorage.getItem("role")
  const getItem =()=>{
   http.get('/api/sales/client/',{
    params:{
      per_page: params.value.per_page,
      page: params.value.page,
    }
   }).then(res=>{
    client_lists.value = res.data.results
    client_lists.value.forEach((item, index) => {
          item.index =
            params.value.page * params.value.per_page -
            (params.value.per_page - 1) +
            index;
        });
    params.value.last_page = Math.ceil(res.data.count / params.value.per_page);
   })
  }
  const openModal = () => {
    client_list.value.openModal()
  }
  const openModalDelete = (item) => {
    client_list.value.openDeleteModal(item)
  }
  const openModalEdit =(item) =>{
    client_list.value.openModal(item)
  }
  getItem()
  </script>
  <style scoped lang="scss">
  $blue-color: #435EBE;
  $white-color: #fff;
  $red-color: #ff7976;
  $blue-color2: #57caeb;
  .product__lists{
    .product__lists-action{
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding: 15px;
      button{
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      background-color: #435EBE;
      color: $white-color;
      cursor: pointer;
      letter-spacing: 0.8px;
      }
    }
    .product__lists-table{
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow-x: scroll;
      %action{
        font-size: 18px;
        cursor: pointer;
        margin: 0px 5px;
    }
    .edit{
      @extend %action;
      color: $blue-color2;
    }
    .delete{
      @extend %action;
      color: $red-color;
    }
      .product__lists-table-text{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical;
        color: #000;
        &:hover{
          color: $blue-color;
          font-size: 13.5px;
        }
      }
    }
    .pagination {
      width: 98%;
      display: flex;
      align-items: center;
      justify-content: end;
      margin: 10px 0px;
    }
  }
  </style>