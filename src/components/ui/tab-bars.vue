<template>
  <div class="warehouse__invoice-head">
        <div class="warehouse__invoice-selection" v-for="item in props.TabList" :key="item.id">
        <div :class="props.activeTab === item.label ? 'warehouse__invoice-select' : 'warehouse__invoice-select1'" @click="props.changeTabs">
            <p>{{item.name}}</p>
            <span></span>
        </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    activeTab:{
        type: String
    },
    TabList:{
        type:Array
    },
    changeTabs:{
        type:Function
    }
})
</script>

<style scoped lang="scss">
$blue-color: #435EBE;
.warehouse__invoice-head{
        width: 500px;
        background-color: #fff;
        display: grid;
        grid-template-columns: auto auto;
        justify-content: space-around;
        align-items: center;
        border-radius: 8px;
        .warehouse__invoice-selection{
            width: 250px;
            %warehouse__invoice-global{
            cursor: pointer;
            width: 100%;
            font-size: 18px;
            letter-spacing: 0.5px;
            padding: 15px 0px;
            display: flex;
            justify-content: center;
            position: relative;
            border-radius: 8px;
            span{
                display: none;
            }
            &:hover span{
                display: block;
                position: absolute;
                width: 100%;
                height: 3px;
                bottom: 0;
            }
            }
            .warehouse__invoice-select{
            @extend %warehouse__invoice-global;
            background-color: $blue-color;
            color: #fff;
            &:hover span{
                background-color: #fff;
            }
         }
         .warehouse__invoice-select1{
            @extend %warehouse__invoice-global;
            background-color: #fff;
            color: $blue-color;
            &:hover span{
                background-color: $blue-color;
            }
            &:hover{
                color: $blue-color;
            }
         }
        }
    }
</style>