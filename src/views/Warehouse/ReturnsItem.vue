<template>
  <section class="input_item">
    <invoiceItem ref="returned_item"/>
    <div class="input_item__bar">
      <div class="input_bar-info">
        <span>{{ return_invoice?.client?.title }}</span>
        <span>{{ return_invoice?.total_sum }}</span>
      </div>
      <button class="btn" v-if="role !== 'director' && return_invoice?.status !== 'confirmed'" @click="addProduct(url[4],'returned-invoice-item')">Add product</button>
    </div>
    <div class="product__lists-table">
      <app-table :headers="headers" :body="return_invoice_item">
        <template #body_title="{ item }">
          <span class="product__lists-table-text">{{ item.product.title }}</span>
        </template>
        <template #body_code="{ item }">
          <span class="product__lists-table-text">{{ item.product.code }}</span>
        </template>
        <template #body_actions="{item}">
            <div class="action" v-if="role !== 'director'">
                <span class="edit" @click="editProduct(item,'returned-invoice-item')" v-if="output_invoice?.status !== 'confirmed'"><i class="fa-solid fa-pen-to-square"></i></span>
                <span class="delete" @click="deleteProduct(item,'returned-invoice-item')" v-if="output_invoice?.status !== 'confirmed'"><i class="fa-solid fa-trash-can"></i></span>
            </div>
        </template>
      </app-table>
      <div class="pagination_action">
        <div class="actions" v-if="role !== 'director'">
          <router-link to="/returns" class="btn1" v-if="return_invoice?.status === 'confirmed'">
          <i class="left fa-solid fa-left-long"></i>
          <span>Back</span>
          </router-link>
          <router-link to="/returns" class="btn" v-if="return_invoice?.status !== 'confirmed'">save</router-link>
          <button class="btn" v-if="return_invoice?.status !== 'confirmed'" @click="confirmInvoice">confirm</button>
          <button class="btn" v-if="return_invoice?.status !== 'confirmed'" @click="deleteInvoiceItem">delete</button>
        </div>
        <VPagination
          v-model="params.page"
          :pages="params.last_page"
          :range-size="1"
          active-color="#EAF5FF"
          @update:modelValue="getReturnItem"
        />
      </div>
        </div>
  </section>
</template>

<script setup>
import {ref} from 'vue'
import http from '@/plugins/axios';
import invoiceItem from '@/components/pages/invoice-item.vue'
import VPagination from "@hennge/vue3-pagination";
import appTable from '@/components/ui/app-table.vue';
import Notification from '@/plugins/Notification';
import { useRouter } from "vue-router";
const router = useRouter();
const url = window.location.href.split('/');
const return_invoice = ref({})
const returned_item = ref()
const return_invoice_item = ref([])
const params = ref({
  page: 1,
  per_page: 10,
  last_page: null,
});
const headers = ref([
  {title: "№", value:"index"},
  {title: "Product", value:"title"},
  {title: "Code", value:"code"},
  {title: "Price", value:"price"},
  {title: "Quantity", value:"quantity"},
  {title: "Invoice", value:"invoice"},
  {title: "Action", value:"actions"},
])
const role = sessionStorage.getItem("role")
async function confirmInvoice(){
  try{
    await http.post(`/api/warehouse/returned-invoice/${url[4]}/confirm/`).then(res=>{
      if(res.status === 200){
        router.push({name:'returns'})
        Notification({ text: "Status confirmed !!!" },{type: "warning"})
      }
    })
  }catch(err){
    Notification({ text: "Error !!!" },{type: "danger"})
  }
}
async function deleteInvoiceItem(){
  try{
    await http.delete(`/api/warehouse/returned-invoice/${url[4]}/`).then(res=>{
      if(res.status === 204){
        router.push({name:'returns'})
        Notification({ text: "Invoice item deleted !!!" },{type: "danger"})
      }
    })
  }catch(err){
    Notification({ text: "Error !!!" },{type: "danger"})
  }
}
async function getReturnInvoice (){
    try{
            await http.get(`/api/warehouse/returned-invoice/${url[4]}`).then(res=>{
              return_invoice.value = res.data
            console.log(res.data)
        })
        
    }catch(err){
        console.log(err)
    }
}
async function getReturnItem (){
    try{
            await http.get('/api/warehouse/returned-invoice-item',{
            params:{
            per_page: params.value.per_page,
            page: params.value.page,
            invoice: url[4]
            }
        }).then(res=>{
          console.log(res.data.results, 'res')
            return_invoice_item.value = res.data.results
            return_invoice_item.value.forEach((item, index) => {
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
const addProduct =(id,title)=>{
  returned_item.value.openModal(id,title)
}
const editProduct = (item,title)=>{
  returned_item.value.openModalEdit(item,title)
}
const deleteProduct = (item,title)=>{
  returned_item.value.openModalDelete(item,title)
}
getReturnInvoice()
getReturnItem()
</script>

<style lang="scss" scoped>
$blue-color: #435EBE;
$blue-color2: #57caeb;
$white-color: #fff;
$red-color: #ff7976;
.input_item{
  padding: 15px;
  %btn{
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  @mixin btn_mix($bg_color, $color){
    background-color: $bg_color;
    color: $color;
  }
  .input_item__bar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .input_bar-info{
      display: flex;
      gap: 20px;
      span{
        padding: 10px 15px;
        border: 3px solid rgba($color: #b4dfe9, $alpha: 0.4);
        border-radius: 5px;
        color: $blue-color;
        font-size: 18px;
        letter-spacing: 0.7px;
      }
    }
    .btn{
    @extend %btn;
    @include btn_mix($blue-color,$white-color );
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
      }
    }
    .action{
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
    }
    .pagination_action {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0px;
      .actions{
        display: flex;
        align-items: center;
        gap: 10px;
        .btn1{
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
        .btn{
          &:nth-child(1){
            @extend %btn;
            @include btn_mix($blue-color2, $white-color)
          }
          &:nth-child(2){
            @extend %btn;
            @include btn_mix($blue-color, $white-color)
          }
          &:nth-child(3){
            @extend %btn;
            @include btn_mix($red-color, $white-color)
          }
        }
      }
    }
  }
}
</style>