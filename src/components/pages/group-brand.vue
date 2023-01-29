<template>
    <AppModal v-model="dialog" :width="'40%'">
        <section class="group_brand" v-if="title === 'groups'">
            <h1>Groups</h1>
            <Form @submit="add_group">
             <label for="group_name">Group Name</label>
             <Field
                rules="required"
                :modelValue="form.group"
                v-slot="{ errors }"
                name="Group Name"
              >
            <input class="form__input" type="text" id="group_name" placeholder="Group Name" v-model="form.group">
            <p class="login__input-error" v-if="errors && errors.length">
               {{ errors[0] }}
             </p>
              </Field>
          <button
            type="submit"
          >
            Add groups
          </button>
        </Form>
        </section>
        <section class="group_brand" v-if="title === 'brands'">
            <h1>Brands</h1>
            <Form @submit="add_brand">
             <label for="brand_name">Brand Name</label>
             <Field
                rules="required"
                :modelValue="form.brand"
                v-slot="{ errors }"
                name="Brand Name"
              >
            <input class="form__input" type="text" id="brand_name" placeholder="Brand Name" v-model="form.brand">
            <p class="login__input-error" v-if="errors && errors.length">
               {{ errors[0] }}
             </p>
              </Field>
          <button
            type="submit"
          >
            Add brands
          </button>
        </Form>
        </section>
   </AppModal>
   <AppModal v-model="dialog2" :width="'40%'">
    <section v-if="title === 'group'" class="delete_GB">
        <h1>Are you sure you want to delete ?</h1>
        <aside class="delete_GB__action">
            <button class="btn1" @click="dialog2 = false">cancel</button>
            <button class="btn2" @click="delete_group_brand">delete</button>
        </aside>
    </section>
    <section v-else-if="title === 'brand'" class="delete_GB">
        <h1>Are you sure you want to delete ?</h1>
        <aside class="delete_GB__action">
            <button class="btn1" @click="dialog2 = false">cancel</button>
            <button class="btn2" @click="delete_group_brand">delete</button>
        </aside>
    </section>
   </AppModal>
</template>
<script setup>
import {ref, defineExpose} from 'vue'
import AppModal from "@/components/ui/app-modal.vue";
import http from '@/plugins/axios';
import { Field, Form } from "vee-validate";
import Notification from '@/plugins/Notification';
import store from '@/store';
const dialog = ref(false)
const dialog2 = ref(false)
const ID = ref()
const title = ref()
const form = ref({
    group: "",
    brand:""
})
const create_group_brand = (value) => {
   title.value = value
   dialog.value = true
}
const deleteBrand = (id, values) =>{
    title.value = values
    ID.value = id
    dialog2.value = true
}
async function add_group() {
 try {
       await http.post('/api/warehouse/group/', {
        title: form.value.group
       }).then(res=>{
            location.reload()
       })
    dialog.value = false
 } catch(err) {
    Notification({ text: "Something wrong !!!" },{type: 'danger'}
   )
 }
}
async function add_brand() {
 try {
       await http.post('/api/warehouse/brand/', {
        title: form.value.brand
       }).then(res=>{
            location.reload()
       })
    dialog.value = false
 } catch(err) {
    Notification({ text: "Something wrong !!!" },{type: 'danger'}
   )
 }
}
async function delete_group_brand(){
    try{
        await http.delete(`/api/warehouse/${title.value}/${ID.value}`)
        location.reload()
        dialog2.value = false
    }catch{
        Notification({ text: "Something wrong !!!" },{type: 'danger'})
    }
}
defineExpose({create_group_brand,deleteBrand})
</script>

<style scoped lang="scss">
$blue-color: #435ebe;
$input_bg: #edf2f7;
$white-color: #fff;
$blue-color2: #57caeb;
$red-color: #ff7976;
.group_brand{
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h1{
        font-size: 20px;
        letter-spacing: 0.8px;
        margin-bottom: 10px;
    }
    Form{
        width: 70%;
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
</style>