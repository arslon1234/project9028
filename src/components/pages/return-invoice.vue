<template>
    <AppModal v-model="dialog2" :width="'40%'">
        <div class="input_output">
            <h1>Add return invoice</h1>
            <Form @submit="sendReturn">
             <label for="supplier">Select client</label>
             <Field
                rules="required"
                :modelValue="forms_output.client"
                v-slot="{ errors }"
                name="Supplier"
              >
              <select v-model="forms_output.client">
             <option disabled selected hidden value="">Select your supplier</option>
              <option v-for="item in $store?.state?.clients" :key="item.id" :value="item.id">
                {{ item.title }}
              </option>
              </select>
            <p class="login__input-error" v-if="errors && errors.length">
               {{ errors[0] }}
             </p>
              </Field>
              <label for="description">Description</label>
              <Field
                rules="required"
                :modelValue="forms_output.description"
                v-slot="{ errors }"
                name="Description"
              >
              <textarea v-model="forms_output.description" class="form__text" id="desc" placeholder="Description"></textarea>
            <p class="login__input-error" v-if="errors && errors.length">
               {{ errors[0] }}
             </p>
              </Field>
          <button
            type="submit"
            @click="sendReturn"
          >
            Add return invoice
          </button>
        </Form>
        </div>
   </AppModal>
</template>
<script setup>
import {ref, defineExpose} from 'vue'
import AppModal from "@/components/ui/app-modal.vue";
import http from '@/plugins/axios';
import { Field, Form } from "vee-validate";
import Notification from '@/plugins/Notification';
import store from '@/store';
const dialog = ref(false);
const dialog2 = ref(false);
const forms_output = ref({
    client: null,
    description: ""
})
const openModalReturnInvoice = (value) => {
    if(value && value.id) forms_output.value = value
    dialog2.value = true
}
async function sendReturn() {
 try {
       await http.post('/api/warehouse/returned-invoice-item/', {
        client: forms_output.value.client,
        description: forms_output.value.description
       }).then(res=>{
        if(res.status === 201){
            location.reload()
            Notification({ text: "Invoce addedd !!!" },{type: 'success'})
        }
        console.log(res)
       })
       dialog.value = false
 } catch(err) {
   console.log(err);
    Notification({ text: "Something wrong !!!" },{type: 'danger'}
   )
 }
}
defineExpose({openModalReturnInvoice})
</script>

<style scoped lang="scss">
$blue-color: #435ebe;
$input_bg: #edf2f7;
$white-color: #fff;
.input_output{
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1{
        text-align: center;
    }
    Form{
        width: 80%;
        display: flex;
        flex-direction: column;
        %global_form{
        width: 100%;
        font-weight: 400;
        font-size: 14px;
        border-radius: 5px;
        outline: none;
        border: none;
        }   
        .form__text{
        @extend %global_form;
        padding: 10px;
        height: 70px;
        border: 1px solid #363636;
        }
        .form__input{
        height: 45px;
        padding-left: 15px;
        color: #272a2c;
        background: $input_bg;
        @extend %global_form
        }
        button{
            @extend %global_form;
            margin-top: 20px;
            padding: 10px 0px;
            background-color: $blue-color;
            color: $white-color;
            cursor: pointer;
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
      select{
      width: 100%;
      height: 35px;
      font-size: 16px;
      border-radius: 5px;
    }
    }
}
</style>