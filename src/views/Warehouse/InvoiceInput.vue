<template>
  <section class="warehouse__invoice">
    <inputOutput ref="input_invoice"/>
    <div class="warehouse__invoice-bar">
        <button @click="openInputInvoice">Add input invoice</button>
    </div>
        <div class="product__lists-table">
      <app-table :headers="headers_input" :body="input_invoice_lists">
        <template #body_supplier="{ item }">
          <span class="product__lists-table-text">{{ item.supplier.title }}</span>
        </template>
        <template #body_address="{ item }">
          <span class="product__lists-table-text">{{ item.supplier.address }}</span>
        </template>
        <template #body_actions >
            <div class="actions">
                <button class="btn1">edit</button>
                <button class="btn2">delete</button>
            </div>
        </template>
        
      </app-table>
      <div class="pagination">
        <VPagination
          v-model="params_input.page"
          :pages="params_input.last_page"
          :range-size="1"
          active-color="#EAF5FF"
          @update:modelValue="getInvoiceInput"
        />
      </div>
        </div>
</section>
</template>
<script setup>
import {ref} from 'vue'
import appTable from '@/components/ui/app-table.vue';
import tabBars from '@/components/ui/tab-bars.vue';
import http from '@/plugins/axios';

import VPagination from "@hennge/vue3-pagination";
import inputOutput from '../../components/pages/input-output.vue'
const input_invoice = ref()
const input_invoice_lists = ref([])
const output_invoice_lists = ref([])
const params_input = ref({
  page: 1,
  per_page: 10,
  last_page: null,
});
const params_output = ref({
  page: 1,
  per_page: 10,
  last_page: null,
});
const headers_input = ref([
  {title: "№", value:"index"},
  {title: "Supplier", value:"supplier"},
  {title: "Total sum", value:"total_sum"},
  {title: "Address", value:"address"},
  {title: "Status", value:"status"},
  {title: "Description", value:"description"},
  {title: "Actions", value:"actions"},
])
async function getInvoiceInput (){
    try{
            await http.get('/api/warehouse/input-invoice',{
            params:{
            per_page: params_input.value.per_page,
            page: params_input.value.page,
           }
        }).then(res=>{
            input_invoice_lists.value = res.data.results
            input_invoice_lists.value.forEach((item, index) => {
            item.index = params_input.value.page * params_input.value.per_page -
            (params_input.value.per_page - 1) +
            index;
            });
            params_input.value.last_page = Math.ceil(res.data.count / params_input.value.per_page);
        })
        
    }catch(err){
        console.log(err)
    }
}
const openInputInvoice =()=>{
    input_invoice.value.openModalInput()
}
getInvoiceInput()
</script>
<style scoped lang="scss">
$blue-color: #435EBE;
$blue-color2: #57caeb;
$white-color: #fff;
$red-color: #ff7976;
.warehouse__invoice{
    padding: 15px;
    .warehouse__invoice-bar{
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
    .actions{
        width: 100%;
        display: flex;
        align-items: center;
        gap: 5px;
        %btn{
        border: none;
        border-radius: 5px;
        cursor: pointer;
        color: $white-color;
        font-size: 14px;
        letter-spacing: 0.5px;
        padding: 6px 13px
    }
    .btn1{
        @extend %btn;
        background-color: $blue-color2;
    }
    .btn2{
        @extend %btn;
        background-color: $red-color;
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