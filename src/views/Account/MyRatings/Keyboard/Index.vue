<script setup lang="ts">
import KeyboardRatingService from '@/services/KeyboardRatingService'
import type { IKeyboardRatingInfo } from '@/types/KeyboardRating'
import { ref } from 'vue'
import Loading from '@/components/Loading.vue'

let isLoading = ref(true)
let keyboardRatings = ref<IKeyboardRatingInfo[]>([])


const fetchBuilds = async () => {
    try {
        const response = await KeyboardRatingService.getMyRatings()

        if (response.data) {
            keyboardRatings.value = response.data
        }
    } catch (error) {
        console.error('Error fetching keyboard builds:', error)
    } finally {
        isLoading.value = false
    }
}

fetchBuilds()

</script>

<template>
  <div v-if="isLoading"><Loading /></div>
  <div v-else class="overflow-x-auto min-w-full">
    <span class="flex items-center">
    <span class="pr-6">My keyboard ratings</span>
    <span class="h-px flex-1 bg-black"></span>
    </span>
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead class="text-left">
        <tr>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Keyboard name</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Comment</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Rating</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Posted at</th>
          <th class="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="keyboardRating in keyboardRatings" :key="keyboardRating.id">
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            {{ keyboardRating.keyboard!.name }}
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ keyboardRating.comment }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ keyboardRating.rating }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ keyboardRating.postedAtDt }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-right">
            <div class="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
              <router-link
                :to="`Edit/${keyboardRating.id}`"
                class="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative"
              >
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                Edit
              </router-link>
              <router-link
                :to="`Delete/${keyboardRating.id}`"
                class="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-red-500 shadow-sm focus:relative"
              >
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
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                Delete
              </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>