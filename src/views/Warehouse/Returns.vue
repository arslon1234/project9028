<template>
  <section class="return">
    <returnInvoice ref="returned_invoice"/>
    <div class="return_bar">
      <button @click="open_Modal" v-if="role !== 'director'">Add return invoice</button>
    </div>
    <div class="product__lists-table">
      <app-table :headers="headers" :body="return_invoice">
        <template #body_title="{ item }">
          <span class="product__lists-table-text">{{ item.client.title }}</span>
        </template>
        <template #body_phone_number="{ item }">
          <span>{{ item.client.phone_number }}</span>
        </template>
        <template #body_address="{ item }">
          <span class="product__lists-table-text">{{ item.client.address }}</span>
        </template>
        <template #body_description="{ item }">
          <span class="product__lists-table-text">{{ item.description }}</span>
        </template>
        <template #body_actions="{item}">
            <div class="actions">
              <router-link class="eye" :to="{name: 'returns_item', params:{id: item.id}}"><i class="fa-solid fa-eye"></i></router-link>
                <span class="edit" v-if="item?.status != 'confirmed' && role !== 'director'" @click="openEditModal(item,item.id)" ><i class="fa-solid fa-pen-to-square"></i></span>
                <span class="delete" v-if="item?.status != 'confirmed' && role !== 'director'" @click="openDeleteModal(item)"><i class="fa-solid fa-trash-can"></i></span>
            </div>
        </template>
      </app-table>
      <div class="pagination">
        <VPagination
          v-model="params.page"
          :pages="params.last_page"
          :range-size="1"
          active-color="#EAF5FF"
          @update:modelValue="getInvoiceReturned"
        />
      </div>
        </div>
  </section>
</template>

<script setup>
import {ref} from 'vue'
import appTable from '@/components/ui/app-table.vue';
import http from '@/plugins/axios';
import VPagination from "@hennge/vue3-pagination";
import returnInvoice from '@/components/pages/return-invoice.vue';
const return_invoice = ref([])
const returned_invoice = ref()
const params = ref({
  page: 1,
  per_page: 10,
  last_page: null,
});
const role = localStorage.getItem("role")

const headers = ref([
  {title: "№", value:"index"},
  {title: "Client", value:"title"},
  {title: "Phone number", value:"phone_number"},
  {title: "Address", value:"address"},
  {title: "Status", value:"status"},
  {title: "Total sum", value:"total_sum"},
  {title: "Description", value:"description"},
  {title: "Actions", value:"actions"},
])
async function getInvoiceReturned (){
    try{
            await http.get('/api/warehouse/returned-invoice',
            {
            params:{
            per_page: params.value.per_page,
            page: params.value.page,
           }}
           ).then(res=>{
          return_invoice.value = res.data.results
          return_invoice.value.forEach((item, index) => {
            item.index = params.value.page * params.value.per_page -
            (params.value.per_page - 1) +
            index;
            });
            params.value.last_page = Math.ceil(res.data.count / params.value.per_page);
        })
        
    }catch(err){
        console.log(err)
    }
}
const open_Modal =()=>{
  returned_invoice.value.openModal()
}
const openEditModal =(item, id)=>{
  returned_invoice.value.openModal(item,id)
}
const openDeleteModal =(item)=>{
  returned_invoice.value.openDeleteModal(item)
}
getInvoiceReturned()
</script>

<style lang="scss" scoped>
$blue-color: #435EBE;
$blue-color2: #57caeb;
$white-color: #fff;
$red-color: #ff7976;
.return{
  padding: 15px;
  .return_bar{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
    .actions{
      display: flex;
      align-items: center;
      justify-content: center;
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
      .eye{
        @extend %action;
        color: $blue-color;
      }
    }
    .product__lists-table-text{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; 
      -webkit-box-orient: vertical;
      color: #000;
    }
    .pagination {
      width: 98%;
      display: flex;
      align-items: center;
      justify-content: end;
      margin: 10px 0px;
    }
    }
}
</style>