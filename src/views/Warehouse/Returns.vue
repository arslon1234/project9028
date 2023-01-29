<template>
  <section class="return">
    <returnInvoice ref="returned_invoice"/>
    <div class="return_bar">
      <button @click="openReturnModal">Add return invoice</button>
    </div>
    <div class="product__lists-table">
      <!-- <app-table :headers="headers_input" :body="input_invoice_lists">
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
        
      </app-table> -->
      <!-- <div class="pagination">
        <VPagination
          v-model="params_input.page"
          :pages="params_input.last_page"
          :range-size="1"
          active-color="#EAF5FF"
          @update:modelValue="getInvoiceInput"
        />
      </div> -->
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
const headers = ref([
  {title: "№", value:"index"},
  {title: "Name", value:"title"},
  {title: "Phone number", value:"phone_number"},
  {title: "Address", value:"address"},
  {title: "Status", value:"status"},
  {title: "Total sum", value:"total_sum"},
  {title: "Description", value:"description"},
  {title: "Actions", value:"actions"},
])
async function getInvoiceInput (){
    try{
            await http.get('/api/warehouse/returned-invoice'
          //   {
          //   params:{
          //   per_page: params_input.value.per_page,
          //   page: params_input.value.page,
          //  }}
           ).then(res=>{
          return_invoice.value = res.data.results
          console.log(res.data.results,'res')
            // input_invoice_lists.value.forEach((item, index) => {
            // item.index = params_input.value.page * params_input.value.per_page -
            // (params_input.value.per_page - 1) +
            // index;
            // });
            // params_input.value.last_page = Math.ceil(res.data.count / params_input.value.per_page);
        })
        
    }catch(err){
        console.log(err)
    }
}
const openReturnModal =()=>{
  returned_invoice.value.openModalReturnInvoice()
}
getInvoiceInput()
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
}
</style>