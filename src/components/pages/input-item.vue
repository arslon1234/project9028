<template>
    <AppModal v-model="dialog" :width="'40%'">
        <div class="Password">
            <div class="Password__change">
                <h1>Add product</h1>
         <Form @submit="send">
        <label for="product">Select product</label>
        <Field
        rules="required"
        :modelValue="form.product"
        v-slot="{ errors }"
        name="Product"
        >
        <select id="product" class="form__select" v-model="form.product">
          <option disabled selected hidden value="">Select product group</option>
          <option :value="item.id" v-for="item in $store?.state?.groups" :key="item.id">{{ item.title }}</option>
        </select>
       <p class="login__input-error" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
        </Field>
        <!-- <label for="product">Select supplier</label>
        <Field
        rules="required"
        :modelValue="form.invoice"
        v-slot="{ errors }"
        name="Supplier"
        >
        <select id="product" class="form__select" v-model="form.invoice">
          <option disabled selected hidden value="">Select supplier</option>
          <option :value="item.id" v-for="item in $store?.state?.suppliers" :key="item.id">{{ item.title }}</option>
        </select>
       <p class="login__input-error" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
        </Field> -->
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
        <button type="submit">Add product</button>
      </Form>
    </div>
    </div>
   </AppModal>
</template>
<script setup>
import {ref, defineExpose} from 'vue'
import { Field, Form } from "vee-validate";
import AppModal from "@/components/ui/app-modal.vue";
import Notification from '@/plugins/Notification';
import http from '@/plugins/axios';
const dialog = ref(false)
const form = ref({
  product: null,
  invoice: null,
  quantity: "",
  price: "",
})
const openModal= () => {
   dialog.value = true
}
async function send() {
 try {
       await http.post('/api/warehouse/input-invoice-item/', {
        product: form.value.product,
        // invoice:form.value.invoice,
        quantity:form.value.quantity,
        price:form.value.price
       }).then(res=>{
        console.log(res.status)
        if(res.status === 200){
            Notification({ text: "Everything is okay !!!" },{type: "success"})
        }
       })
    dialog.value = false
 } catch(err) {
   console.log(err);
   Notification({ text: "Something wrong !!!"}, {type: 'danger'})
 }
}
defineExpose({openModal})
</script>

<style scoped lang="scss">
$blue-color: #435ebe;
$input_bg: #edf2f7;
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
</style>