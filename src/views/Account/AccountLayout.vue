<script setup lang="ts">
import SideBar from '@/components/ProfileSideBar.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';


const authStore = useAuthStore();

if (authStore.email == null) {
  
  router.push('/login');
}


</script>



<template>
    <div class="flex">
    <div class='w-1/6'>
        <SideBar />
    </div>
    <div class="flex-1 flex p-4 justify-center">
        <RouterView />
    </div>
    <div class="w-1/6"></div>
    </div>
</template>