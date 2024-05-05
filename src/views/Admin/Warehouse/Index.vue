<script setup lang="ts">
import { computed, ref } from 'vue'
import Loading from '@/components/Loading.vue'
import WarehouseService from '@/services/WarehouseService'
import type { IWarehouseInfo } from '@/types/Warehouse'

let isLoading = ref(true) // Define isLoading as a ref
let Warehouses = ref<IWarehouseInfo[]>([])
let searchQuery = ref("");

const fetchKeyboards = async () => {
  try {
    const response = await WarehouseService.getAll()

    if (response.data) {
      Warehouses.value = response.data
    }
  } catch (error) {
    console.error('Error fetching keyboards:', error)
  } finally {
    isLoading.value = false // Set isLoading to false regardless of success or failure
  }
}

fetchKeyboards()

const filteredWarehouses = computed( () => {
  return Warehouses.value.filter(wh => 
    wh.warehouseName.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<template>
  <div v-if="isLoading"><Loading /></div>
  <div v-else class="overflow-x-auto min-w-full">
    <div class="pb-2 flex flex-col md:flex-row gap-3">
      <div class="flex">
          <input v-model="searchQuery" type="text" placeholder="Search..."
        class="w-full md:w-80 px-3 h-10 rounded-l border-2 border-indigo-600 focus:outline-none focus:border-indigo-500"
        >
          <button type="submit" class="bg-indigo-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1">Search</button>
      </div>
    </div>
    <router-link
      class="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
      to="Create"
    >
      <span class="absolute -start-full transition-all group-hover:start-4">
        <svg
          class="size-5 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </span>
      <span class="text-sm font-medium transition-all group-hover:ms-4"> Add new Warehouse </span>
    </router-link>
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead class="text-left">
        <tr>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Warehouse Name</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            different Items in that warehouse
          </th>
          <th class="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="warehouse in filteredWarehouses" :key="warehouse.id">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-700">
            {{ warehouse.warehouseName }}
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            {{ warehouse.warehousePartsCollection.length }}
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-right">
            <div class="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
              <router-link
                :to="`Edit/${warehouse.id}`"
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
                :to="`/Keyboard/Details/${warehouse.id}`"
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
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                View
              </router-link>
              <router-link
                :to="`Delete/${warehouse.id}`"
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
RouterLinkRouterLinkRouterLinkRouterLinkRouterLinkRouterLinkRouterLinkRouterLinkididpartCategoriesidididididididididRouterLinkRouterLinkRouterLinkRouterLinkRouterLinkRouterLinkRouterLinkRouterLinkididpartCategoriesididididididididid
