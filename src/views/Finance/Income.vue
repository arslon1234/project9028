<template>
    <div class="product__lists">
      <financeIncome ref="finance_income"/>
    <div class="product__lists-action">
        <button @click="openModal('sales')" v-if="role !== 'director'">Add income</button>
    </div>
      <div class="product__lists-table">
        <app-table :headers="headers" :body="income">
         
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
  import financeIncome from '@/components/pages/finance-income.vue'
  import VPagination from "@hennge/vue3-pagination";
  const income = ref([])
  const finance_income = ref()
  const params = ref({
    page: 1,
    per_page: 10,
    last_page: null,
  });
  const headers = ref([
    {title: "№", value:"index"},
    {title: "Income type", value:"income_type"},
    {title: "Invoice", value:"invoice"},
    {title: "Amount", value:"amount"},
  ])
  const role = localStorage.getItem("role")
  const getItem =()=>{
   http.get('/api/finance/income/',{
    params:{
      per_page: params.value.per_page,
      page: params.value.page,
    }
   }).then(res=>{
    income.value = res.data.results
    income.value.forEach((item, index) => {
          item.index =
            params.value.page * params.value.per_page -
            (params.value.per_page - 1) +
            index;
        });
    params.value.last_page = Math.ceil(res.data.count / params.value.per_page);
   })
  }
  const openModal = () => {
    finance_income.value.openModal()
  }
  getItem()
  </script>
  <style scoped lang="scss">
  $blue-color: #435EBE;
  $white-color: #fff;
  .product__lists{
    .product__lists-action{
     width: 100%;
     display: flex;
     justify-content: flex-end;
     padding: 10px 15px;
      button{
            border: none;
            border-radius: 5px;
            background-color: $blue-color;
            color: #fff;
            padding: 10px 15px;
            cursor: pointer;
            letter-spacing: 0.8px;
      }
    }
    .product__lists-table{
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow-x: scroll;
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