<template>
    <AppModal v-model="dialog">
      <div class="modal">
        <h3 v-if="!forms.id">Add Product</h3>
        <h3 v-else>{{ props.title_text }}</h3>
        <Form @submit="send">
          <div class="modal__form-img">
            <img :src="forms.image" alt="user">
            <div class="modal__form-change-img">
              <label for="file">Change image</label>
              <input type="file" ref="file" id="file" @change="handleChange($event)">
            </div>
          </div>
             <label for="first_name">First Name</label>
             <Field
                rules="required"
                :modelValue="forms.first_name"
                v-slot="{ errors }"
                name="First Name"
              >
            <input class="form__input" type="text" id="first_name" placeholder="First Name" v-model="forms.first_name">
            <p class="login__input-error" v-if="errors && errors.length">
               {{ errors[0] }}
             </p>
              </Field>
             <label for="last_name">Last Name</label>
             <Field
                rules="required"
                :modelValue="forms.last_name"
                v-slot="{ errors }"
                name="Last Name"
              >
            <input class="form__input" type="text" id="last_name" placeholder="Last Name" v-model="forms.last_name">
            <p class="login__input-error" v-if="errors && errors.length">
               {{ errors[0] }}
             </p>
              </Field>
             <label for="email">Email</label>
             <Field
                rules="required"
                :modelValue="forms.email"
                v-slot="{ errors }"
                name="Email"
              >
            <input class="form__input" type="text" id="email" placeholder="Email" v-model="forms.email">
            <p class="login__input-error" v-if="errors && errors.length">
               {{ errors[0] }}
             </p>
              </Field>
             <label for="phone_number">Phone number</label>
             <Field
                rules="required"
                :modelValue="forms.email"
                v-slot="{ errors }"
                name="Phone number"
              >
            <input class="form__input" type="text" id="phone_number" placeholder="Phone number" v-model="forms.phone_number">
            <p class="login__input-error" v-if="errors && errors.length">
               {{ errors[0] }}
             </p>
              </Field>
          <button
            type="submit"
            v-if="!forms.id"
          >
            Add Product
          </button>
          <button
            type="submit"
             v-else
          >
            {{ props.title_text }}
          </button>
        </Form>
      </div>
   </AppModal>
</template>
<script setup>
import {ref, defineExpose} from 'vue'
import { Field, Form } from "vee-validate";
import AppModal from "@/components/ui/app-modal.vue";
import Notification from '@/plugins/Notification';
import http from '@/plugins/axios';
const emits = defineEmits(['getEmployers'])
const form = ref({})
const dialog = ref(false)
const file = ref(null)
const image = ref(null)
const forms = ref({
 first_name: "",
 last_name: "",
 image: "",
 phone_number: "",
 email: "",
});
const handleChange =(event)=>{
  image.value = event.target.files[0]
}
const props = defineProps({
  title_text:{
    type: String
  }
})
const openModal = (value) => {
   if(value && value.id) forms.value = {...value}
   dialog.value = true
}
async function send(event) {
  const form = new FormData()
  form.append("first_name", forms.value.first_name)
  form.append("last_name", forms.value.last_name)
  form.append("phone_number", forms.value.phone_number)
  form.append("email", forms.value.email)
  form.append("image", image.value)
 try {
   if(forms.value.id) {
       await http.put('/api/user/me/', form,{
        headers:{
          'content-type': 'multipart/form-data'
        }
       }).then(res=>{
        if(res.status === 200){
          location.reload()
        }
       })
   }
  Notification({ text: "Everything is okay !!!" },{type: 'success'})
   dialog.value = false
 } catch(err) {
   console.log(err);
    Notification({ text: "Something wrong !!!" },{type: 'danger'}
   )
 }
}
defineExpose({openModal})
</script>

<style scoped lang="scss">
$blue-color: #435ebe;
$input_bg: #edf2f7;
$hover-color: #f0f1f5;
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
      margin: 20px 0px;
      display: flex;
      flex-direction: column;
      .modal__form-img{
        width: 100%;
        display: flex;
        justify-content: center;
        cursor: pointer;
        .modal__form-change-img{
          display: none;
        }
        &:hover .modal__form-change-img{
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
      .form__input {
        width: 100%;
        font-weight: 400;
        font-size: 14px;
        height: 45px;
        padding-left: 15px;
        color: #272a2c;
        background: $input_bg;
        border-radius: 5px;
        outline: none;
        margin-right: 5px;
        border: none;
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