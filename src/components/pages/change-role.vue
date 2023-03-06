<template>
    <AppModal v-model="dialog1">
        <div class="Login__roles">
        <p>Select your role</p>
      <select v-model="role.selected_role">
        <option disabled selected hidden value="">Select your role</option>
        <option v-for="item in $store?.state?.me?.roles" :key="item.id" :value="item">
          {{ item }}
        </option>
      </select>
      <div class="Login__roles-action">
        <button @click="send">Save</button>
      </div>
    </div>
   </AppModal>
</template>
<script setup>
import {ref, defineExpose} from 'vue'
import AppModal from "@/components/ui/app-modal.vue";
import http from '@/plugins/axios';
import Notification from '@/plugins/Notification';
import store from '@/store';
const dialog1 = ref(false)
const role = ref({
  selected_role:""
})
const open_change_modal = () => {
   dialog1.value = true
}
async function send() {
 try {
       await http.post('/api/user/change-role/', {
        role: role.value.selected_role
       }).then(res=>{
        if(res.status === 200){
            location.reload()
        }
       })
    dialog1.value = false
 } catch(err) {
   console.log(err);
    Notification({ text: "Something wrong !!!" },{type: 'danger'}
   )
 }
}
defineExpose({open_change_modal})
</script>

<style scoped lang="scss">
$blue-color: #435ebe;
.Login__roles{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    p{
      font-size: 30px;
      margin-bottom: 20px;
      word-spacing: 0.5px;
    }
    select{
      width: 100%;
      height: 35px;
      font-size: 16px;
      border-radius: 5px;
    }
    .Login__roles-action{
      width: 100%;
      margin-top: 25px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      button{
        border: none;
        color: #fff;
        background-color: $blue-color;
        padding: 12px 20px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
</style>