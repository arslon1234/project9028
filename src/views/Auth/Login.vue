<template>
  <div class="Login">
    <div class="Login__item">
      <h1>KIRISH</h1>
      <form>
        <label for="login">Username</label>
        <input type="text" id="login" placeholder="Username"/>
        <label for="password">Password</label>
        <div class="Login__form-input">
          <input :type="showPassword ? 'text' : 'password'" id="password" placeholder="Password" />
          <img src="../../assets/eye.svg" @click="ChangePassword" :class="showPassword ? 'Login__hide' : 'Login__show'" alt="eye">
          <img src="../../assets/hide.svg" @click="ChangePassword" :class="showPassword ? 'Login__show' : 'Login__hide'" alt="hide">
        </div>
        <button type="submit" @click="Login">KIRISH</button>
      </form>
    </div>
  </div>
</template>

<script setup>

import {ref} from 'vue'
import { useRouter } from "vue-router";

const showPassword = ref(false)
const router = useRouter();
const ChangePassword =()=>{
  showPassword.value = !showPassword.value
}
const Login=()=>{
  router.push({ name: "warehouse" });
}
</script>

<style lang="scss">
$blue-color: #435EBE;
$input_bg: #edf2f7;
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
  font-style: normal;
}
.Login {
  width: 100%;
  background-color: #f3f7f9;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .Login__item {
    width: 60%;
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
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
    form {
      width: 50%;
      margin: 50px 0px;
      display: flex;
      flex-direction: column;
      .Login__form-input{
        width: 100%;
        display: flex;
        align-items: center;
        background-color: $input_bg;
        %input_act{
          cursor: pointer;
          background-color: transparent;
          margin-right: 10px
        }
        .Login__show{
          @extend %input_act;
          display: block;
        }
        .Login__hide{
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
      label {
        margin: 10px 0px;
        font-weight: 500;
        font-size: 16px;
        color: #2c2728;
      }
      button{
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