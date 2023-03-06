<template>
    <AppModal v-model="dialog">
      <div class="modal">
        <h3 v-if="id">Edit Supplier</h3>
        <h3 v-else>Add Supplier</h3>
        <Form @submit="send">
             <label for="product_name">Supplier Name</label>
             <Field
                rules="required"
                :modelValue="forms.title"
                v-slot="{ errors }"
                name="Supplier Name"
              >
            <input class="form__input" type="text" id="product_name" placeholder="Supplier Name" v-model="forms.title">
            <p class="login__input-error" v-if="errors && errors.length">
               {{ errors[0] }}
             </p>
              </Field>
             <label for="desc">Address</label>
             <Field
                rules="required"
                :modelValue="forms.address"
                v-slot="{ errors }"
                name="Address"
              >
            <input class="form__input" type="text" id="product_name" placeholder="Address" v-model="forms.address">
            <p class="login__input-error" v-if="errors && errors.length">
               {{ errors[0] }}
             </p>
             </Field>
             <label for="desc" v-if="!id">Credit</label>
             <Field
                rules="required"
                :modelValue="forms.credit"
                v-slot="{ errors }"
                name="Credit"
                v-if="!id"
              >
            <input class="form__input" type="number" id="product_name" placeholder="Credit" v-model="forms.credit">
            <p class="login__input-error" v-if="errors && errors.length">
               {{ errors[0] }}
             </p>
             </Field>
             <button
            type="submit"
            v-if="id"
          >
            Edit Supplier
          </button>
             <button
            type="submit"
            v-else
          >
            Add Supplier
          </button>
        </Form>
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
import {ref, defineExpose, watch} from 'vue'
import { Field, Form } from "vee-validate";
import AppModal from "@/components/ui/app-modal.vue";
import Notification from '@/plugins/Notification';
import http from '@/plugins/axios';
import { useRouter } from 'vue-router';
import store from '@/store';
const emits = defineEmits(['getEmployers'])
const router = useRouter()
const dialog = ref(false)
const dialog2 = ref(false)
const id = ref(null)
const forms = ref({
 title: "",
 address:"",
 credit:""
});
const openModal = (value) => {
   if(value && value.id) {
    forms.value = {...value}
    id.value = value.id
   }
   dialog.value = true
}
watch(dialog,(value) => {
      if (!value) {
         id.value = null 
         forms.value.title = ''
         forms.value.address = ''
      }
})
const openDeleteModal = (value)=>{
  if(value && value.id) forms.value = value
  id.value = value.id
  dialog2.value = true
}
async function send(event) {
 try {
   if(!id.value) {
       await http.post('/api/warehouse/supplier/',{
        title: forms.value.title,
        address: forms.value.address,
        credit: forms.value.credit
       }).then(res=>{
        if(res.status === 201){
          location.reload()
        }
       })
   }
   else await http.put(`/api/warehouse/supplier/${id.value}/`, {
    title: forms.value.title,
    address: forms.value.address,
    credit: forms.value.credit
   }).then(res=>{
    // if(res.status === 200){
    //     location.reload()
    // }
  })
  dialog.value = false
  if(!id.value){
    Notification({ text: "Supplier added !!!" },{type: 'success'})
  }else{
    Notification({ text: "Supplier updated !!!" },{type: 'warning'})
  }
 } catch(err) {
   console.log(err);
    Notification({ text: "Something wrong !!!" },{type: 'danger'}
   )
 }
}
async function deleteModal () {
  try{
    await Notification({ text: "Supplier deleted !!!" },{type: 'danger'})
     http.delete(`/api/warehouse/supplier/${id.value}`).then(res=>{
      console.log(res)
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
defineExpose({openModal,openDeleteModal})
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
@media (max-width: 576px) {
      Form{
        width: 90%;
      }
      .modal_act{
        margin-top: 20px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
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