<script setup lang="ts">
import router from '@/router'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import PartService from '@/services/PartService'
import type { IPartInfo } from '@/types/Part'
import PartRatingService from '@/services/PartRatingService'


let route = useRoute()

let Comment = ref('')
let Rating = ref(0);
let isLoading = ref(true)
let parts = ref<IPartInfo[]>([]);
let partId = ref("");

let errors = ref<string[]>([])

const doAdd = async () => {
    try {
        const res = await PartRatingService.Add(
            Comment.value,
            partId.value,
            Rating.value,
        )
        if (res.data) {
            router.push('Index')
        }
    } catch (error) {
        console.error('Error adding keyboard rating:', error)
    }
}

const Fetch = async () => {
    try {
        const res = await PartService.getAll()
        if (res.data) {
          parts.value = res.data
        }
    } catch (error) {
        console.error('Error fetching Parts:', error)
    } finally {
        isLoading.value = false
    }
}

Fetch()
</script>

<template>
    <div class="flex">
        <div class="flex-1 flex justify-left pl-10">
            <div
                v-if="errors.length > 0"
                role="alert"
                class="rounded border-s-4 border-red-500 bg-red-50 p-4"
            >
                <div class="flex items-center gap-2 text-red-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="h-5 w-5"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <strong class="block font-medium"> Something went wrong </strong>
                </div>
                <p class="mt-2 text-sm text-red-700">
                    {{ errors.join(',') }}
                </p>
            </div>
            <form class="space-y-6">
                <div>
                    <label class="block text-sm font-medium leading-6 text-gray-900"
                        >Comment</label
                    >
                    <div class="mt-2">
                        <input
                            v-model="Comment"
                            required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium leading-6 text-gray-900"
                        >Rating</label
                    >
                    <div class="mt-2">
                        <input
                            v-model="Rating"
                            required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                  <label for="partSelect" class="block text-sm font-medium text-gray-900">Keyboards</label>
                  <select v-model="partId" id="partSelect" class="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm">
                    <option value="">Please select</option>
                    <option v-for="part in parts" :key="part.id" :value="part.id">{{ part.partName }}</option>
                  </select>
                </div>
                <div>
                    <button
                        type="button"
                        @click.prevent="doAdd"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add part rating
                    </button>
                </div>
                <router-link class="underline" to="Index">Back to the Dashboard</router-link>
            </form>
        </div>
        <div class="w-1/6"></div>
    </div>
</template>
