<template>
  <section class="single_product">
    <productModal ref="product_list"/>
    <img :src="single_product?.image" alt="product">
    <div>
        <p class="single_product-name">{{ single_product?.title }}</p>
        <div class="single_product-features">
            <p>
                <span>Group: </span>
                <span> {{ single_product?.group?.title }}</span>
            </p>
            <p>
                <span>Brand: </span>
                <span> {{ single_product?.brand?.title }}</span>
            </p>
            <p>
                <span>Price: </span>
                <span> {{ single_product?.current_selling_price }}</span>
            </p>
            <p>
                <span>Code: </span>
                <span> {{ single_product?.code }}</span>
            </p>
            <p>
                <span>Description</span>
            </p>
            <h5>{{ single_product?.description }}</h5>
        </div>
        <div class="single_product-act">
            <button @click="openModalEdit(single_product)">Edit</button>
            <button @click="openModalDelete(single_product)">Delete</button>
        </div>
    </div>
  </section>
</template>

<script setup>
import {ref} from 'vue'
import http from '@/plugins/axios';
import { onMounted } from 'vue';
import productModal from '../../components/pages/product-modal.vue'
const url = window.location.href.split("/");
const single_product = ref({})
const product_list = ref()
const getSingleProduct =()=>{
    http.get(`/api/warehouse/product/${url[4]}`).then(res=>{
        console.log(res.data)
        single_product.value = res.data
    })
}
const openModalEdit =(item) =>{
  product_list.value.openModal(item)
}
const openModalDelete =(item) =>{
  product_list.value.openDeleteModal(item)
}
onMounted(()=>{
    getSingleProduct()
})
</script>

<style scoped lang="scss">
$blue-color: #435EBE;
$red-color: #ff7976;
.single_product{
    padding: 30px;
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 25px;
    img{
        width: 500px;
        height: 500px;
        border-radius: 15px;
    }
    .single_product-name{
        font-size: 30px;
        letter-spacing: 1px;
    }
    .single_product-features{
        margin-top: 30px;
        p {
            font-size: 18px;
            margin: 12px 0px;
            span:nth-child(1){
            color: $blue-color;
            }
            span:nth-child(2){
            color: #4c4c4c;
            }
        }
        h5{
            font-weight: 400;
            font-size: 15px;
            color: #656565;
            letter-spacing: 0.8px;
        }
    }
    .single_product-act{
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: 40px 40px;
        gap: 10px;
        margin-top: 60px;
        %btn{
            border: none;
            border-radius: 5px;
            color: #fff;
            font-size: 18px;
            cursor: pointer;
            letter-spacing: 0.8px;
        }
        button{
            &:nth-child(1){
                @extend %btn;
                background-color: $blue-color;
          }
            &:nth-child(2){
                @extend %btn;
                background-color: $red-color;
          }
        }
       
    }
}
</style>