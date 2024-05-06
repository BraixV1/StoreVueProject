<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { useBuildStore } from '@/stores/keyboardBuild';

const authStore = useAuthStore()
const BuildId = useBuildStore()

if (!authStore.isAuthenticated) {
    router.push('/login')
}

if (BuildId.buildId == null){
    router.push('BuilderStartPage')
}

</script>

<template>
    <div class="flex">
        <div class="w-1/6">
        </div>
        <div class="flex-1 flex p-4 justify-center">
            <RouterView />
        </div>
        <div class="w-1/6"></div>
    </div>
</template>
