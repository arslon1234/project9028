<template>
    <AppModal v-model="dialog">
        <div class="Password">
            <div class="Password__change">
              <h1 v-if="form.index">Edit product</h1>
              <h1 v-else>Add product</h1>
         <Form @submit="send">
        <label for="product" v-if="!form.index">Select product</label>
        <Field
        rules="required"
        :modelValue="form.product"
        v-slot="{ errors }"
        name="Product"
        v-if="!form.index"
        >
        <select id="product" class="form__select" v-model="form.product">
          <option disabled hidden value="">Select product</option>
          <option :value="item.id" v-for="item in $store?.state?.products" :key="item.id">{{ item.title }}</option>
        </select>
       <p class="login__input-error" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
        </Field>
        <label for="quantity">Quantity</label>
        <Field
        rules="required"
        :modelValue="form.quantity"
        v-slot="{ errors }"
        name="Quantity"
        >
        <input class="form__input" type="number" id="quantity" placeholder="Quantity" v-model="form.quantity">
       <p class="login__input-error" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
        </Field>
        <label for="quantity">Price</label>
        <Field
        rules="required"
        :modelValue="form.price"
        v-slot="{ errors }"
        name="Price"
        >
        <input class="form__input" type="number" id="quantity" placeholder="Quantity" v-model="form.price">
       <p class="login__input-error" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
        </Field>
        <button type="submit" v-if="form.index">Edit product</button>
        <button type="submit" v-else>Add product</button>
      </Form>
    </div>
    </div>
   </AppModal>
   <AppModal v-model="dialog2">
      <div class="modal">
        <h3>Are you sure you want to deletes ?</h3>
        <div class="modal_act">
          <button class="btn1" @click="dialog2 = false">cancel</button>
          <button class="btn2" @click="deleteModal">delete</button>
        </div>
      </div>
   </AppModal>
</template>
<script setup>
import {ref, defineExpose,watch} from 'vue'
import { Field, Form } from "vee-validate";
import AppModal from "@/components/ui/app-modal.vue";
import Notification from '@/plugins/Notification';
import http from '@/plugins/axios';
const dialog = ref(false)
const dialog2 = ref(false)
const ID = ref(null)
const invoice = ref(null)
const form = ref({
  index: null,
  product: null,
  quantity: "",
  price: "",
})
const openModal= (id,title) => {
   dialog.value = true
   invoice.value = title
   ID.value = id
}
const openModalEdit = (item,title) => {
  if(item && item.product.id) {
    form.value = {...item}
  }
  invoice.value = title
  dialog.value = true
}
const openModalDelete = (item,title) => {
  if(item && item.id) {
    form.value = {...item}
  }
  invoice.value = title
  dialog2.value = true
}
watch(dialog,(value) => {
      if (!value) {
         form.value.index = ''
         form.value.product = ''
         form.value.quantity = ''
         form.value.price = '',
         invoice.value = null
      }
})
watch(dialog2,(value) => {
      if (!value) {
         form.value.index = ''
         form.value.product = ''
         form.value.quantity = ''
         form.value.price = ''
         invoice.value = null
      }
})
async function send() {
 try {
  if(!form.value.id){
    await http.post(`/api/warehouse/${invoice.value}/`, {
     product: form.value.product,
     invoice: ID.value,
     quantity:form.value.quantity,
     price:form.value.price
    }).then(res=>{
     if(res.status === 201){
       location.reload()
     }
   })
  }else {
    await http.put(`/api/warehouse/${invoice.value}/${form.value.id}/`,{
     quantity:form.value.quantity,
     price:form.value.price
    }).then(res=>{
    if(res.status === 200){
      location.reload()
    }
  })
  }
  dialog.value = false
  if(!form.value.id){
    Notification({ text: "Invoice item added !!!" },{type: 'success'})
  }else{
    Notification({ text: "Invoice item updated !!!" },{type: 'warning'})
  }
 } catch(err) {
   console.log(err);
   Notification({ text: "Something wrong !!!"}, {type: 'danger'})
 }
}
async function deleteModal () {
  try{
    await Notification({ text: "Invoice item deleted !!!" },{type: 'danger'})
     http.delete(`/api/warehouse/${invoice.value}/${form.value.id}`).then(res=>{
      if(res.status === 204){
        location.reload()
      }
    })
   dialog2.value = false
  }catch(err){
    console.log(err)
    Notification({ text: "Something wrong !!!" },{type: 'danger'})
  }
}
defineExpose({openModal, openModalEdit,openModalDelete})
</script>

<style scoped lang="scss">
$blue-color: #435ebe;
$input_bg: #edf2f7;
$white-color: #fff;
$blue-color2: #57caeb;
$red-color: #ff7976;
.Password{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .Password__change {
    width: 100%;
    background: #ffffff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0px;
    h1 {
      font-weight: 600;
      font-size: 30px;
      color: #272a2c;
      margin: 20px auto;
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
  }
}
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
.modal_act{
        margin-top: 40px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
        %btn{
            padding: 15px 50px;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            color: $white-color;
            cursor: pointer
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
}
@media (max-width: 576px) {
      Form{
        width: 90%;
      }
      .modal{
        h3{
        font-size: 20px;
}
        .modal_act{
        gap: 14px;
        %btn{
            padding: 10px 30px;
            border-radius: 3px;
            font-size: 16px;
        }
}
      }
      
}
</style>