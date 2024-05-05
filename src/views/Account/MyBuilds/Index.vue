<script setup lang="ts">
import router from '@/router'
import KeyboardBuildService from '@/services/KeyboardBuildService'
import { useBuildStore } from '@/stores/keyboardBuild'
import type { IkeyboardBuildInfo } from '@/types/KeyboardBuild'
import { ref } from 'vue'

let isLoading = ref(true)
let buildStore = useBuildStore()
let builds = ref<IkeyboardBuildInfo[]>([])


const fetchBuilds = async () => {
    try {
        const response = await KeyboardBuildService.getUserBuilds()

        if (response.data) {
            builds.value = response.data
        }
    } catch (error) {
        console.error('Error fetching keyboard builds:', error)
    } finally {
        isLoading.value = false
    }
}

const StartEditing = (name: string) => {
    console.log("Reached here");
    buildStore.buildId = name
    router.push('/KeyboardBuilder/BuilderPage')
}

fetchBuilds()
</script>

<template>
    <ul class="overflow-x-auto min-w-full">
        <span class="flex items-center">
            <span class="pr-6">My builds</span>
            <span class="h-px flex-1 bg-black"></span>
        </span>
        <details
            class="group [&_summary::-webkit-details-marker]:hidden"
            v-for="build in builds"
            :key="build.id"
        >
            <button
                @click.prevent="StartEditing(build.id)"
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
            </button>
            <summary
                class="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
                <table>
                    <tr>
                        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            {{ build.buildName }}
                        </th>
                    </tr>
                    <tr>
                        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                    </tr>
                </table>

                <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </span>
            </summary>
            <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead class="text-left">
                    <tr>
                        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Item name
                        </th>
                        <th class="px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="part in build.buildParts" :key="part.id">
                        <td v-if="part.part" class="whitespace-nowrap px-4 py-2 text-gray-700">
                            {{ part.part.partName }}
                        </td>
                        <td class="whitespace-nowrap px-4 py-2 text-right">
                            <div
                                class="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1"
                            >
                                <router-link
                                    :to="`Delete/${part.id}`"
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
        </details>
    </ul>
</template>
