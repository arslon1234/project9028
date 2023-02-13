<template>
  <div class="profile">
    <form-modal ref="profile_modal" :title_text="title_text"/>
    <changeRole ref="change_role"/>
    <changePassword ref="change_password"/>
        <!-- <router-link to="/login" class="profile__back">
            <span><i class="fa-solid fa-left-long"></i></span>
            <span>Back</span>
        </router-link> -->
    <div class="profile__items">
        <div class="profile__item1">
            <div class="profile__item1-img">
                <img :src="$store?.state?.me?.image" alt="">
            </div>
            <p>{{ $store?.state?.me?.first_name }} {{ $store?.state?.me?.last_name }}</p>
            <button class="profile__item1-edit" @click="openModalEdit($store?.state?.me)">Edit profile</button>
        </div>
        <div class="profile__item2">
        <p>
            <span>Phone number</span>
            <i class="fa-solid fa-right-long"></i>
            <span> {{ $store?.state?.me?.phone_number }}</span>
        </p>
        <p>
            <span>Email</span>
            <i class="fa-solid fa-right-long"></i>
            <span> {{ $store?.state?.me?.email }}</span>
        </p>
        <p>
            <span>Username</span>
            <i class="fa-solid fa-right-long"></i>
            <span> {{ $store?.state?.me?.username }}</span>
        </p>
        <p>
            <span>Roles</span>
            <i class="fa-solid fa-right-long"></i>
            <span v-for="item in $store?.state?.me?.roles" :key="item"> {{ item }}</span>
        </p>
        <p>
            <span >Current role</span>
            <i class="fa-solid fa-right-long"></i>
            <span> {{ $store?.state?.me?.current_role }}</span>
            <button class="profile__item-change_role" @click="open_change_modal_role">change</button>
        </p>
        <button class="profile__item2-change-p" @click="open_change_modal_password">Change password</button>
        </div>
    </div>
  </div>
</template>

<script setup>
import store from '@/store';
import {ref} from 'vue'
import FormModal from '../../components/pages/edit-profile.vue'
import changeRole from '../../components/pages/change-role.vue'
import changePassword from '@/components/pages/change-password.vue';
import {onMounted } from 'vue'
const profile_modal = ref();
const change_role = ref()
const change_password = ref()
const title_text = "Edit Profile"
const openModal = () => {
    profile_modal.value.openModal()
}
const open_change_modal_role = () => {
    change_role.value.open_change_modal()
}
const open_change_modal_password = () => {
    change_password.value.open_change_modal_password()
}
const openModalEdit =(item) =>{
    profile_modal.value.openModal(item)
}
</script>

<style scoped lang="scss">
$white-color: #fff;
$blue-color: #435EBE;
$green-color: #e7e732;
.profile{
    padding: 10px;
    margin: 10px;
    .profile__modal{
        h3{
            font-size: 23px;
            margin: 15px 0px;
            font-weight: 500;
            text-align: center;
        }
    }
    .profile__back{
        width: 100px;
        margin-top: 15px;
        border: none;
        background-color: $blue-color;
        color: $white-color;
        padding: 10px 20px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: center;
        cursor: pointer;
        i{
            transition: all 0.3s linear;
        }
        &:hover i{
            transform: translateX(-5px);
        }
    }
    .profile__items{
        width: 100%;
        height: 100%;
        background-color: $white-color;
        margin-top: 25px;
        border-radius: 10px;
        padding: 50px 15px;
        display: flex;
        gap: 40px;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        .profile__item1{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            p{
                font-size: 22px;
                font-weight: 500;
            }
            .profile__item1-img{
                width: 240px;
                height: 240px;
                cursor: pointer;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }
            }
            .profile__item1-edit{
                width: 100%;
                padding: 10px 0px;
                border: none;
                background-color: $blue-color;
                color: $white-color;
                border-radius: 5px;
                font-size: 17px;
                cursor: pointer;
            }
        }
        .profile__item2{
            p{
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            font-size: 18px;
            padding: 5px 0px;
            font-weight: 500;
            i{
                font-size: 14px;
                transition: all 0.3s linear;
            }
            &:hover i{
                transform: translateX(5px);
                color: $blue-color;
            }
            .profile__item-change_role{
                padding: 5px 10px;
                border: none;
                background-color: $blue-color;
                color: $white-color;
                font-size: 16px;
                border-radius: 5px;
                cursor: pointer;
            }
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
        .profile__item2-change-p{
            margin-top: 20px;
            width: 100%;
            padding: 10px 0px;
            background-color: $green-color;
            color: #000;
            border-radius: 5px;
            border: none;
            font-size: 17px;
            cursor: pointer;
        }
        }
        .profile__items-action{
            margin-top: 30px;
        }
    }

}

</style>