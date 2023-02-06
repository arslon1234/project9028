<template>
  <section class="input_item">
    <inputItem ref="input_item"/>
    <div class="input_item__bar">
      <div class="input_bar-info">
        <span>{{ input_invoice?.supplier?.title }}</span>
        <span>{{ input_invoice?.total_sum }}</span>
      </div>
      <button class="btn" @click="addProduct">Add product</button>
    </div>
    <div class="product__lists-table">
      <app-table :headers="headers_input" :body="input_invoice_item">
        <template #body_title="{ item }">
          <span class="product__lists-table-text">{{ item.product.title }}</span>
        </template>
        <template #body_code="{ item }">
          <span class="product__lists-table-text">{{ item.product.code }}</span>
        </template>
      </app-table>
      <div class="pagination_action">
        <div class="actions">
          <button>save</button>
          <button>confirm</button>
          <button>delete</button>
        </div>
        <VPagination
          v-model="params_input.page"
          :pages="params_input.last_page"
          :range-size="1"
          active-color="#EAF5FF"
          @update:modelValue="getInputItem"
        />
      </div>
        </div>
  </section>
</template>

<script setup>
import {ref} from 'vue'
import http from '@/plugins/axios';
import VPagination from "@hennge/vue3-pagination";
import appTable from '@/components/ui/app-table.vue';
import inputItem from '@/components/pages/input-item.vue'
const url = window.location.href.split('/');
const input_invoice = ref({})
const input_item = ref()
const input_invoice_item = ref([])
const params_input = ref({
  page: 1,
  per_page: 10,
  last_page: null,
});
const headers_input = ref([
  {title: "№", value:"index"},
  {title: "Product", value:"title"},
  {title: "Code", value:"code"},
  {title: "Price", value:"price"},
  {title: "Quantity", value:"quantity"},
  {title: "Invoice", value:"invoice"},
])
async function getInvoiceInput (){
    try{
            await http.get(`/api/warehouse/input-invoice/${url[4]}`).then(res=>{
            input_invoice.value = res.data
            console.log(res.data,'gg')
        })
        
    }catch(err){
        console.log(err)
    }
}
async function getInputItem (){
    try{
            await http.get(`/api/warehouse/input-invoice-item/`,{
            params:{
            per_page: params_input.value.per_page,
            page: params_input.value.page,
            }
        }).then(res=>{
          console.log(res.data.results, 'res')
            input_invoice_item.value = res.data.results
            input_invoice_item.value.forEach((item, index) => {
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
const addProduct =()=>{
  input_item.value.openModal()
}
getInvoiceInput()
getInputItem()
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
        button{
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