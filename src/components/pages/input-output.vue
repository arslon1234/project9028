<template>
    <AppModal v-model="dialog">
        <div class="input_output">
            <h1 v-if="!forms_input.id">Add input invoice</h1>
            <h1 v-else>Edit input invoice</h1>
            <Form @submit="sendInput">
             <label for="supplier" v-if="!forms_input.id">Select supplier</label>
             <Field
                rules="required"
                :modelValue="forms_input.supplier"
                v-slot="{ errors }"
                name="Supplier"
                v-if="!forms_input.id"
              >
              <select v-model="forms_input.supplier">
             <option disabled selected hidden value="">Select your supplier</option>
              <option v-for="item in $store?.state?.suppliers" :key="item.id" :value="item.id">
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
                :modelValue="forms_input.description"
                v-slot="{ errors }"
                name="Description"
              >
              <textarea v-model="forms_input.description" class="form__text" id="desc" placeholder="Description"></textarea>
            <p class="login__input-error" v-if="errors && errors.length">
               {{ errors[0] }}
             </p>
              </Field>
          <button
            type="submit"
            v-if="!forms_input.id"
          >
            Add input invoice
          </button>
          <button
            type="submit"
            v-else
          >
            Edit input invoice
          </button>
        </Form>
        </div>
   </AppModal>
    <AppModal v-model="dialog2">
        <div class="input_output">
            <h1 v-if="!forms_output.id">Add output invoice</h1>
            <h1 v-else>Edit output invoice</h1>
            <Form @submit="sendOutput">
             <label for="supplier" v-if="!forms_output.id">Select client</label>
             <Field
                rules="required"
                :modelValue="forms_output.client"
                v-slot="{ errors }"
                name="Supplier"
                v-if="!forms_output.id"
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
             <label for="product_name" v-else>Status</label>
             <Field
               v-if="forms_output.id"
                rules="required"
                :modelValue="forms_output.status"
                v-slot="{ errors }"
                name="Product Name"
                
              >
            <input class="form__input" type="text" id="product_name" placeholder="Product Name" v-model="forms_output.status">
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
            v-if="!forms_output.id"
          >
            Add output invoice
          </button>
          <button
            type="submit"
            v-else
          >
            Edit output invoice
          </button>
        </Form>
        </div>
   </AppModal>
   <AppModal v-model="dialog3">
    <section v-if="title === 'output-invoice'" class="delete_GB">
        <h1>Are you sure you want to deletes ?</h1>
        <aside class="delete_GB__action">
            <button class="btn1" @click="dialog3 = false">cancel</button>
            <button class="btn2" @click="deleteInvoice">delete</button>
        </aside>
    </section>
    <section v-else-if="title === 'input-invoice'" class="delete_GB">
        <h1>Are you sure you want to delete ?</h1>
        <aside class="delete_GB__action">
            <button class="btn1" @click="dialog3 = false">cancel</button>
            <button class="btn2" @click="deleteInvoice">delete</button>
        </aside>
    </section>
   </AppModal>
</template>
<script setup>
import {ref, defineExpose,watch} from 'vue'
import AppModal from "@/components/ui/app-modal.vue";
import http from '@/plugins/axios';
import { Field, Form } from "vee-validate";
import Notification from '@/plugins/Notification';
import store from '@/store';
import { useRouter } from 'vue-router';
const router = useRouter()
const dialog = ref(false);
const dialog2 = ref(false);
const dialog3 = ref(false);
const title = ref()
const ID = ref()
const forms_input = ref({
    id: null,
    supplier: null,
    description: ""
})
const forms_output = ref({
    id:null,
    client: null,
    description: "",
    status: ''
})
const openModalInput = (item,value) => {
    if(item && item.id) forms_input.value = {...item}
    title.value = value
    dialog.value = true
}
const openModalOutput = (item,value) => {
    if(item && item.id) forms_output.value = item
    title.value = value
    dialog2.value = true
}
watch(dialog,(value) => {
      if (!value) {
        forms_input.value.id = null 
        forms_input.value.supplier = null 
        forms_input.value.description = ''
      }
})
watch(dialog2,(value) => {
      if (!value) {
        forms_output.value.id = null 
        forms_output.value.client = null 
        forms_output.value.description = ''
        forms_output.value.status = ''
      }
})

const deleteInvoices =(id, value)=>{
  title.value = value
  ID.value = id
  dialog3.value = true
}
async function sendInput() {
 try {
  if(!forms_input.value.id){
    await http.post('/api/warehouse/input-invoice/', {
        supplier: forms_input.value.supplier,
        description: forms_input.value.description
       }).then(res=>{
        if(res.status === 201){
          router.push({name: 'invoice_input_item', params:{id: res.data.id}})
        }
    })
  }else await http.put(`/api/warehouse/${title.value}/${forms_input.value.id}/`,{
    // supplier: forms_input.value.supplier,
    description: forms_input.value.description
  }).then(res=>{
    if(res.status === 200){
          location.reload()
    }
  })
    dialog.value = false
    if(!forms_input.value.id){
    Notification({ text: "Invoice added !!!" },{type: 'success'})
  }else{
    Notification({ text: "Invoice updated !!!" },{type: 'warning'})
  }
 } catch(err) {
   console.log(err);
    Notification({ text: "Something wrong !!!" },{type: 'danger'}
   )
 }
}
async function sendOutput() {
 try {
  if(!forms_output.value.id){
    await http.post('/api/warehouse/output-invoice/', {
       client: forms_output.value.client,
       description: forms_output.value.description
      }).then(res=>{
        if(res.status === 201){
          router.push({name: 'invoice_output_item', params:{id: res.data.id}})
        }
      })
      dialog2.value = false
  }else await http.put(`/api/warehouse/${title.value}/${forms_output.value.id}/`,{
    status: forms_output.value.status,
    description: forms_output.value.description
  }).then(res=>{
    if(res.status === 201){
          location.reload()
    }
    console.log(res.status)
  })
  dialog2.value = false
  if(!forms_output.value.id){
    Notification({ text: "Invoice added !!!" },{type: 'success'})
  }else{
    Notification({ text: "Invoice updated !!!" },{type: 'warning'})
  }
 } catch(err) {
   console.log(err);
    Notification({ text: "Something wrong !!!" },{type: 'danger'}
   )
 }
}
async function deleteInvoice (){
  try{
    await Notification({ text: "Invoce deleted !!!" },{type: 'danger'})
     http.delete(`/api/warehouse/${title.value}/${ID.value}`).then(res=>{
      if(res.status === 204){
        location.reload()
      }
      dialog3.value = false
    })
  }catch(err){
    console.log(err)
    Notification({ text: "Something wrong !!!" },{type: 'danger'}
   )
  }
}
defineExpose({openModalInput,openModalOutput,deleteInvoices})
</script>

<style scoped lang="scss">
$blue-color: #435ebe;
$input_bg: #edf2f7;
$white-color: #fff;
$blue-color2: #57caeb;
$red-color: #ff7976;
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
.delete_GB{
    width: 100%;
    padding: 30px;
    h1{
        font-size: 30px;
        text-align: center;
        letter-spacing: 1px;
    }
    .delete_GB__action{
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
   .delete_GB{
    padding: 20px;
    h1{
        font-size: 22px;
        letter-spacing: 0.5px;
    }
    .delete_GB__action{
        margin-top: 20px;
        gap: 15px;
        %btn{
          padding: 10px 30px;
          border-radius: 3px;
          font-size: 16px;
        }
    }
}
}
</style>