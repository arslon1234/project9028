<template>
    <section class="warehouse__invoice">
      <inputOutput ref="input_invoice"/>
      <div class="warehouse__invoice-bar">
          <button @click="openOutputInvoice" v-if="role !== 'director'">Add output invoice</button>
      </div>
          <div class="product__lists-table">
         <app-table :headers="headers_output" :body="output_invoice_lists">
          <template #body_client="{ item }">
            <router-link :to="{name: 'invoice_output_item', params:{id: item.id}}" class="product__lists-table-text">{{ item.client.title }}</router-link>
          </template>
          <template #body_address="{ item }">
            <span class="product__lists-table-text">{{ item.client.address }}</span>
          </template>
          <template #body_phone_number="{ item }">
            <span class="product__lists-table-text">{{ item.client.phone_number }}</span>
          </template>
          <template #body_actions="{item}">
              <div class="actions">
                <router-link class="eye" v-if="role === 'warehouseman'" :to="{name: 'invoice_output_item', params:{id: item.id}}"><i class="fa-solid fa-eye"></i></router-link>
                <router-link class="eye" v-if="role === 'director'" :to="{name: 'invoice_output_item_d', params:{id: item.id}}"><i class="fa-solid fa-eye"></i></router-link>
                <span class="edit" v-if="item.status != 'confirmed' && role !== 'director'" @click="openInvoiceEdit(item, 'output-invoice')"><i class="fa-solid fa-pen-to-square"></i></span>
                <span class="delete" v-if="item.status != 'confirmed' && role !== 'director'" @click="open_Output_Invoice(item.id, 'output-invoice')"><i class="fa-solid fa-trash-can"></i></span>
              </div>
          </template>
        </app-table>
        <div class="pagination">
          <VPagination
            v-model="params_output.page"
            :pages="params_output.last_page"
            :range-size="1"
            active-color="#EAF5FF"
            @update:modelValue="getInvoiceOutput"
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
import router from '@/router';
  const input_invoice = ref()
  const output_invoice_lists = ref([])
  const params_output = ref({
    page: 1,
    per_page: 10,
    last_page: null,
  });
  const role = sessionStorage.getItem("role")
  const headers_output = ref([
    {title: "№", value:"index"},
    {title: "Client", value:"client"},
    {title: "Total sum", value:"total_sum"},
    {title: "Address", value:"address"},
    {title: "Phone", value:"phone_number"},
    {title: "Status", value:"status"},
    {title: "Description", value:"description"},
    {title: "Actions", value:"actions"},
  ])
  
  async function getInvoiceOutput (){
      try{
              await http.get('/api/warehouse/output-invoice',{
              params:{
              per_page: params_output.value.per_page,
              page: params_output.value.page,
             }
          }).then(res=>{
              output_invoice_lists.value = res.data.results
              output_invoice_lists.value.forEach((item, index) => {
              item.index = params_output.value.page * params_output.value.per_page -
              (params_output.value.per_page - 1) +
              index;
              });
              params_output.value.last_page = Math.ceil(res.data.count / params_output.value.per_page);
          })
          
      }catch(err){
          console.log(err)
      }
  }
  
  const openOutputInvoice =()=>{
      input_invoice.value.openModalOutput()
  }
  const open_Output_Invoice =(id,value)=>{
    input_invoice.value.deleteInvoices(id,value)
  }
  const openInvoiceEdit =(item,value)=>{
    input_invoice.value.openModalOutput(item,value)
  }
  getInvoiceOutput()
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
      overflow-x: scroll;
      .actions{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
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
        &:hover{
        color: $blue-color;
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
  }
  </style>