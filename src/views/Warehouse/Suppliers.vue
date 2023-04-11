<template>
    <section class="groups_brands">
        <suppliers ref="supplier"/>
        <div class="groups_brands__item">
          <div class="groups_brands__table">
            <appTable :headers="headers" :body="$store?.state.suppliers">
              <template #body_action="{item}" v-if="role !== 'director'">
                <span class="edit" @click="openModalEdit(item)"><i class="fa-solid fa-pen-to-square"></i></span>
                <span class="delete" @click="deleteModal(item)"><i class="fa-solid fa-trash-can"></i></span>
          </template>
            </appTable>
            <!-- <div class="pagination">
           <VPagination
            v-model="params.page"
            :pages="params.last_page"
            :range-size="1"
            active-color="#EAF5FF"
            @update:modelValue="getItem"
          />
        </div> -->
          </div>
          <aside class="groups_brands_act">
            <button @click="openModal" v-if="role !== 'director'">Create</button>
          </aside>
        </div>
    </section>
  </template>
  
  <script setup>
  import {computed, onMounted, ref} from 'vue'
  import VPagination from "@hennge/vue3-pagination";
  import appTable from '@/components/ui/app-table.vue';
  import suppliers from '@/components/pages/suppliers.vue';
  import store from '@/store';
  
const params = ref({
    page: 1,
    per_page: 10,
    last_page: null,
});
const role = sessionStorage.getItem("role")
const supplier = ref()
const headers = ref([
    {title: "№", value:"id"},
    {title: "Name", value:"title"},
    {title: "Address", value:"address"},
    {title: "Credit", value:"credit"},
    {title: "Action", value:"action"},
  ])
  const deleteModal = (item) =>{
    supplier.value.openDeleteModal(item)
  }
  const openModal =() =>{
    supplier.value.openModal()
  }
  const openModalEdit =(item) =>{
    supplier.value.openModal(item)
  }
  </script>
  
  <style lang="scss" scoped> 
  $blue-color: #435ebe;
  $blue-color2: #57caeb;
  $input_bg: #edf2f7;
  $white-color: #fff;
  $red-color: #ff7976;
  .groups_brands{
    width: 100%;
    padding: 10px;
    .groups_brands__item{
      width: 100%;
      margin-top: 20px;
      overflow-x: scroll;
      .groups_brands__table{
        width: 100%;
        .delete_btn{
          padding: 4px 8px;
          border: none;
          border-radius: 3px;
          background-color: $red-color;
          color: $white-color;
          font-size: 14px;
          cursor: pointer;
        }
        %action{
        font-size: 18px;
        cursor: pointer;
        margin: 0px 5px;
    }
    .edit{
      @extend %action;
      color: $blue-color2;
    }
    .delete{
      @extend %action;
      color: $red-color;
    }
      }
      .groups_brands_act{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        button{
          padding: 10px 20px;
          color: $white-color;
          background-color: $blue-color2;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          margin-left: 10px;
          letter-spacing: 0.8px;
        }
      }
    }
  }
  </style>