<template>
    <AppModal v-model="dialog">
      <div class="modal">
        <h3>Add Expense</h3>
        <Form @submit="send">
             <label for="product" v-if="!forms.active2">Select invoice</label>
             <Field
             rules="required"
             :modelValue="forms.invoice"
             v-slot="{ errors }"
             name="Select invoice"
             v-if="!forms.active2"
             >
             <select id="product" class="form__select" v-model="forms.invoice" @change="handechange($event)">
               <option disabled selected hidden value="">Select sales</option>
               <option :value="item.id" v-for="item in input_invoice_lists" :key="item.id">{{ item?.supplier?.title }}</option>
             </select>
            <p class="login__input-error" v-if="errors && errors.length && !forms.active2">
               {{ errors[0] }}
             </p>
             </Field>
             <label for="product" v-if="!forms.active">Select returned invoice</label>
             <Field
             rules="required"
             :modelValue="forms.returned_invoice"
             v-slot="{ errors }"
             name="Select returned invoice"
             v-if="!forms.active"
             >
             <select id="product" class="form__select" v-model="forms.returned_invoice" @change="handechange2($event)">
               <option disabled selected hidden value="">Select sales</option>
               <option :value="item.id" v-for="item in return_invoice" :key="item.id">{{ item?.client?.title }}</option>
             </select>
            <p class="login__input-error" v-if="errors && errors.length && !forms.active">
               {{ errors[0] }}
             </p>
             </Field>
             <label for="desc">Amount</label>
             <Field
                rules="required"
                :modelValue="forms.amount"
                v-slot="{ errors }"
                name="Amount"
              >
              <input class="form__input" type="number" id="product_name" placeholder="Amount" v-model="forms.amount">
            <p class="login__input-error" v-if="errors && errors.length">
               {{ errors[0] }}
             </p>
             </Field>
             <label for="desc">Description</label>
             <Field
                rules="required"
                :modelValue="forms.description"
                v-slot="{ errors }"
                name="Description"
              >
              <textarea v-model="forms.description" class="form__text" id="desc" placeholder="Description"></textarea>
            <p class="login__input-error" v-if="errors && errors.length">
               {{ errors[0] }}
             </p>
             </Field>
            
          <button
            type="submit"
          >
            Add expense
          </button>
         
        </Form>
      </div>
   </AppModal>
  </template>
  <script setup>
  import {ref, defineExpose, watch} from 'vue'
  import { Field, Form } from "vee-validate";
  import AppModal from "@/components/ui/app-modal.vue";
  import Notification from '@/plugins/Notification';
  import http from '@/plugins/axios';
  const dialog = ref(false)
  const input_invoice_lists = ref([])
  const return_invoice = ref([])
  const forms = ref({
  income_type: "",
  amount: "",
  description: "",
  invoice: null,
  returned_invoice: null,
  active: false,
  active2: false
  });
  const params = ref({
  page: 1,
  per_page: 10,
  last_page: null,
});
  const openModal = (item) => {
    dialog.value = true
  }
  const handechange =(event)=>{
    if(event.target.value){
        forms.value.active = true
    }else{
        forms.value.active = false
    }
  }
  const handechange2 =(event)=>{
    if(event.target.value){
        forms.value.active2 = true
    }else{
        forms.value.active2 = false
    }
  }
  watch(dialog, (value) => {
        if (!value) {
            forms.value.amount = ""
            forms.value.invoice = null
            forms.value.returned_invoice = null
            forms.value.active = false
            forms.value.active2 = false
            forms.value.description = ''
        }
  })
  async function send(event) {
  try {
       await http.post('/api/finance/expense/',{
        amount: forms.value.amount,
        invoice: forms.value.invoice,
        returned_invoice: forms.value.returned_invoice,
        description: forms.value.description
       }).then(res=>{
        if(res.status === 201){
          location.reload()
        }
       })
    dialog.value = false
    Notification({ text: "Expense added !!!" },{type: 'success'})
  
  } catch(err) {
   console.log(err);
    Notification({ text: "Something wrong !!!" },{type: 'danger'}
   )
  }
  }
  async function getInvoiceInput (){
      try{
              await http.get('/api/warehouse/input-invoice').then(res=>{
                input_invoice_lists.value = res.data.results
          })
          
      }catch(err){
          console.log(err)
      }
  }
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
  getInvoiceInput()
  getInvoiceReturned()
  defineExpose({openModal})
  </script>
  
  <style scoped lang="scss">
  $blue-color: #435ebe;
  $input_bg: #edf2f7;
  $hover-color: #f0f1f5;
  $white-color: #fff;
  $blue-color2: #57caeb;
  $red-color: #ff7976;
  .modal{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h3{
  text-align: center;
  margin: 10px 0px;
  font-size: 25px;
  }
  Form {
      width: 70%;
      margin: 15px 0px;
      display: flex;
      flex-direction: column;
      .modal__form-img{
        width: 100%;
        display: flex;
        justify-content: center;
        cursor: pointer;
        .modal__form-change-img{
          display: block;
          position: absolute;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background-color: rgba(240, 241, 245,0.7);
          border-radius: 50%;
          label{
            text-align: center;
            font-size: 14px;
            cursor: pointer;
          }
          input{
            opacity: 0;
            cursor: pointer;
          }
        }
        img{
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 50%;
          position: relative;
        }
      }
      .Login__form-input {
        width: 100%;
        display: flex;
        align-items: center;
        background-color: $input_bg;
        %input_act {
          cursor: pointer;
          background-color: transparent;
          margin-right: 10px;
        }
        .Login__show {
          @extend %input_act;
          display: block;
        }
        .Login__hide {
          @extend %input_act;
          display: none;
        }
      }
      %global_form{
        width: 100%;
        font-weight: 400;
        font-size: 14px;
        height: 45px;
        padding-left: 15px;
        color: #272a2c;
        background: $input_bg;
        border-radius: 5px;
        outline: none;
        border: none;
      }
      .form__input {
        @extend %global_form
      }
      .form__select{
        @extend %global_form
      }
      .form__text{
        @extend %global_form;
        padding-top: 10px;
        height: 70px;
      }
      .login__input-error {
        margin-top: 5px;
        color: red;
        font-size: 15px;
        font-weight: 500;
      }
      label {
        margin: 10px 0px;
        font-weight: 500;
        font-size: 16px;
        color: #2c2728;
      }
      button {
        margin-top: 40px;
        border: none;
        padding: 10px 0px;
        color: #fff;
        font-size: 16px;
        background-color: $blue-color;
        border-radius: 5px;
        cursor: pointer;
      }
  }
    @media (max-width: 576px) {
      Form{
        width: 90%;
      }
}
  }
  </style>