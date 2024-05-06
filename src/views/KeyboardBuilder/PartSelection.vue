<script setup lang="ts">
import SideBar from '@/components/AdminSideBar.vue'
import { useAuthStore } from '@/stores/auth'
import { computed, ref } from 'vue'
import router from '@/router'
import type { IPartInfo } from '@/types/Part'
import PartService from '@/services/PartService'
import Loading from '@/components/Loading.vue'
import { useBuildStore } from '@/stores/keyboardBuild'
import PartInBuildService from '@/services/PartInBuildService'

let isLoading = ref(true)
let parts = ref<IPartInfo[]>([])
let filterParam = ref('all')
let searchQuery = ref('')
let buildStore = useBuildStore();

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

const AddToBuild = async (partId: string) => {
    try {
        const response = await PartInBuildService.Add(partId, buildStore.buildId!)
        
        if (response.data) {
            router.push('BuilderPage')
        }
    }
    catch (error) {
        console.log('Error adding to part: ', error);
    }
}

fetchParts()

const filteredParts = computed(() => {
    switch (filterParam.value) {
        case 'pname':
            return parts.value.filter((partItem) =>
                partItem.partName.toLowerCase().includes(searchQuery.value.toLowerCase())
            )
        case 'price':
            return parts.value.filter((partItem) =>
                partItem.price.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
            )
        case 'qty':
            return parts.value.filter((partItem) =>
                partItem.quantity.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
            )
        default:
            return parts.value.filter(
                (partItem) =>
                    partItem.partCode.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                    partItem.partName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                    partItem.price
                        .toString()
                        .toLowerCase()
                        .includes(searchQuery.value.toLowerCase()) ||
                    partItem.quantity
                        .toString()
                        .toLowerCase()
                        .includes(searchQuery.value.toLowerCase())
            )
    }
})
</script>

<template>
    <div v-if="isLoading"><Loading /></div>
    <div v-else class="overflow-x-auto min-w-full">
        <div class="pb-2 flex flex-col md:flex-row gap-3">
            <div class="flex">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search..."
                    class="w-full md:w-80 px-3 h-10 rounded-l border-2 border-indigo-600 focus:outline-none focus:border-indigo-500"
                />
                <button
                    type="submit"
                    class="bg-indigo-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
                >
                    Search
                </button>
            </div>
            <select
                v-model="filterParam"
                class="w-flex h-10 border-2 border-indigo-500 focus:outline-none focus:border-indigo-500 text-indigo-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
            >
                <option value="all">All</option>
                <option value="pname">part name</option>
                <option value="price">price</option>
                <option value="qty">quantity</option>
            </select>
        </div>
        
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead class="text-left">
                <tr>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Part name</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Price</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Quanitity</th>
                    <th class="px-4 py-2"></th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                <tr v-for="part in filteredParts" :key="part.id">
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ part.partName }}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ part.price }}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ part.quantity }}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-right">
                        <div class="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                            <button
                                @click.prevent="AddToBuild(part.id)"
                                class="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                                
                            >
                                Add to build
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
