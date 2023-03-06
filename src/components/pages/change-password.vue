<template>
    <AppModal v-model="dialog2">
        <div class="Password">
            <div class="Password__change">
                <h1>Change password</h1>
      <Form @submit="send">
        <label for="old_password">Old password</label>
        <Field
          rules="required"
          :modelValue="form.old_password"
          v-slot="{ errors }"
          name="Old password"
        >
          <div class="Login__form-input">
            <input
            :type="showPassword ? 'text' : 'password'"
            id="old_password"
            v-model="form.old_password"
            placeholder="Old password"
          />
          <img
            src="../../assets/images/eye.svg"
            @click="showPassword = !showPassword"
            :class="showPassword ? 'Login__hide' : 'Login__show'"
            alt="eye"
          />
          <img
            src="../../assets/images/hide.svg"
            @click="showPassword = !showPassword"
            :class="showPassword ? 'Login__show' : 'Login__hide'"
            alt="hide"
          />
          </div>
          <p class="login__input-error" v-if="errors && errors.length">
              {{ errors[0] }}
          </p>
        </Field>
        <label for="new_password">New password</label>
        <Field
          rules="required"
          :modelValue="form.new_password"
          v-slot="{ errors }"
          name="New password"
        >
          <div class="Login__form-input">
            <input
            :type="showPassword2 ? 'text' : 'password'"
            id="new_password"
            v-model="form.new_password"
            placeholder="New password"
          />
          <img
            src="../../assets/images/eye.svg"
            @click="showPassword2 = !showPassword2"
            :class="showPassword2 ? 'Login__hide' : 'Login__show'"
            alt="eye"
          />
          <img
            src="../../assets/images/hide.svg"
            @click="showPassword2 = !showPassword2"
            :class="showPassword2 ? 'Login__show' : 'Login__hide'"
            alt="hide"
          />
          </div>
          <p class="login__input-error" v-if="errors && errors.length">
              {{ errors[0] }}
          </p>
        </Field>
        <label for="confirm_new_password">Confirm new password</label>
        <Field
          rules="required"
          :modelValue="form.confirm_new_password"
          v-slot="{ errors }"
          name="Confirm password"
        >
          <div class="Login__form-input">
            <input
            :type="showPassword3 ? 'text' : 'password'"
            id="confirm_new_password"
            v-model="form.confirm_new_password"
            placeholder="Confirm new password"
          />
          <img
            src="../../assets/images/eye.svg"
            @click="showPassword3 = !showPassword3"
            :class="showPassword3 ? 'Login__hide' : 'Login__show'"
            alt="eye"
          />
          <img
            src="../../assets/images/hide.svg"
            @click="showPassword3 = !showPassword3"
            :class="showPassword3 ? 'Login__show' : 'Login__hide'"
            alt="hide"
          />
          </div>
          <p class="login__input-error" v-if="errors && errors.length">
              {{ errors[0] }}
          </p>
        </Field>
        <button type="submit">Change</button>
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
const dialog2 = ref(false)
const showPassword = ref(false);
const showPassword2 = ref(false);
const showPassword3 = ref(false);
const form = ref({
  old_password: "",
  new_password: "",
  confirm_new_password: ""
})
const open_change_modal_password = () => {
   dialog2.value = true
}
async function send() {
 try {
       await http.post('/api/user/change-password/', {
        old_password: form.value.old_password,
        new_password:form.value.new_password,
        new_password_confirm:form.value.confirm_new_password
       }).then(res=>{
        console.log(res.status)
        if(res.status === 200){
            Notification({ text: "Everything is okay !!!" },{type: "success"})
        }
       })
    dialog2.value = false
 } catch(err) {
   console.log(err);
   Notification({ text: "Something wrong !!!"}, {type: 'danger'})
 }
}
defineExpose({open_change_modal_password})
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
      width: 90%;
      margin: 30px 0px;
      display: flex;
      flex-direction: column;
      .Login__form-input {
        width: 100%;
        display: flex;
        align-items: center;
        background-color: $input_bg;
        border-radius: 5px;
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
      input {
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
  }
}
</style>