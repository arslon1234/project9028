<template>
    <AppModal v-model="dialog">
      <div class="modal">
        <h3>Add Income</h3>
        <Form @submit="send">
             <label for="brand">Select income type</label>
             <Field
                rules="required"
                :modelValue="forms.income_type"
                v-slot="{ errors }"
                name="Income type"
              >
              <select id="brand" class="form__select" v-model="forms.income_type" @change="handechange($event)">
                <option disabled selected hidden value="">Select product brand</option>
                <option value="from_sales">From sales</option>
                <option value="from_outside">From outside</option>
              </select>
            <p class="login__input-error" v-if="errors && errors.length">
               {{ errors[0] }}
             </p>
             </Field>
             <label for="product" v-if="forms.title === 'from_sales'">Select sales</label>
             <Field
             rules="required"
             :modelValue="forms.invoice"
             v-slot="{ errors }"
             name="select sales"
             v-if="forms.title === 'from_sales'"
             >
             <select id="product" class="form__select" v-model="forms.invoice">
               <option disabled selected hidden value="">Select sales</option>
               <option :value="item.id" v-for="item in output_invoice_lists" :key="item.id">{{ item?.client?.title }}</option>
             </select>
            <p class="login__input-error" v-if="errors && errors.length">
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
            
          <button
            type="submit"
          >
            Add income
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
  import { useRouter } from 'vue-router';
  import store from '@/store';
  const router = useRouter()
  const dialog = ref(false)
  const output_invoice_lists = ref([])
  const forms = ref({
  income_type: "",
  amount: "",
  invoice: null,
  title: false
  });
  const openModal = (item) => {
    dialog.value = true
    forms.value.title = item
  }
  const handechange=(event)=>{
    console.log(event.target.value, 'type')
    if(event.target.value === 'from_sales'){
        forms.value.title = 'from_sales'
    }else{
        forms.value.title = 'from_outside'
    }
  }
  watch(dialog, (value) => {
        if (!value) {
            forms.value.income_type = ""
            forms.value.amount = ""
            forms.value.invoice = null
            forms.value.title = false
        }
  })
  async function send(event) {
  try {
       await http.post('/api/finance/income/',{
        income_type: forms.value.income_type,
        amount: forms.value.amount,
        invoice: forms.value.invoice
       }).then(res=>{
        if(res.status === 201){
          location.reload()
        }
       })
    dialog.value = false
    Notification({ text: "Income added !!!" },{type: 'success'})
  
  } catch(err) {
   console.log(err);
    Notification({ text: "Something wrong !!!" },{type: 'danger'}
   )
  }
  }
  async function getInvoiceOutput (){
      try{
              await http.get('/api/warehouse/output-invoice').then(res=>{
              output_invoice_lists.value = res.data.results
              console.log(output_invoice_lists.value,'value-issue')
          })
          
      }catch(err){
          console.log(err)
      }
  }
  getInvoiceOutput()
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