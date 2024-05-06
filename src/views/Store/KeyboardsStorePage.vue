<script setup lang="ts">
import KeyboardsPage from '@/components/Shopping/KeyboardsPage.vue'
import KeyboardService from '@/services/KeyboardService'
import type { IKeyboardInfo } from '@/types/Keyboard'
import Loading from '@/components/Loading.vue'
import { computed, ref } from 'vue'

let keyboards = ref<IKeyboardInfo[]>([])
let isLoading = ref(true)
let searchQuery = ref("");

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

const filteredKeyboard = computed(() => {
    return keyboards.value.filter((keyboardItem) => keyboardItem.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
})

</script>

<template>
    <div v-if="isLoading"><Loading /></div>
    <div v-else class="">
        <div class="relative w-min-max">
            <label for="Search" class="sr-only"> Search </label>

            <input
                v-model="searchQuery"
                type="text"
                id="Search"
                placeholder="Search for..."
                class="w-full rounded-md border-indigo-200 py-2.5 pe-10 shadow-sm sm:text-sm"
            />

            <span class="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button type="button" class="text-gray-600 hover:text-gray-700">
                    <span class="sr-only">Search</span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-4 w-4"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </span>
        </div>
        <KeyboardsPage :keyboards="filteredKeyboard" />
    </div>
    
</template>
