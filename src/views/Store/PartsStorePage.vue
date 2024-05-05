<script setup lang="ts">
import PartService from '@/services/PartService';
import type { IPartInfo } from '@/types/Part';
import PartsStorePage from '@/components/Shopping/PartsStore.vue'
import { ref } from 'vue';
import Loading from '@/components/Loading.vue'


let isLoading = ref(true)
let parts = ref<IPartInfo[]>([])

const fetchParts = async () => {
    try {
        const response = await PartService.getAll()

        if (response.data) {
            parts.value = response.data
        }
    } catch (error) {
        console.error('Error fetching keyboards:', error)
    } finally {
        isLoading.value = false
    }
}

fetchParts()


</script>




<template>
    <div v-if="isLoading"><Loading /></div>
    <PartsStorePage :parts="parts" v-else />
</template>