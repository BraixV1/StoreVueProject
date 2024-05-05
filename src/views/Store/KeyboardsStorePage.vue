<script setup lang="ts">
import KeyboardsPage from '@/components/Shopping/KeyboardsPage.vue';
import KeyboardService from '@/services/KeyboardService';
import type { IKeyboardInfo } from '@/types/Keyboard';
import Loading from '@/components/Loading.vue'
import { ref } from 'vue';

let keyboards = ref<IKeyboardInfo[]>([]);
let isLoading = ref(true)

const fetchKeyboards = async () => {
    try {
        const response = await KeyboardService.getAll()

        if (response.data) {
            keyboards.value = response.data
        }
    } catch (error) {
        console.error('Error fetching keyboards:', error)
    } finally {
        isLoading.value = false // Set isLoading to false regardless of success or failure
    }
}

fetchKeyboards()


</script>


<template>
    <div v-if="isLoading"><Loading /></div>
    <KeyboardsPage :keyboards="keyboards" v-else />
</template>

