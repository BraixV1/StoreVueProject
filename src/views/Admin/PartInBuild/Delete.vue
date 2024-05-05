<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

import PartInBuildService from '@/services/PartInBuildService';

let route = useRoute(); 

let partInBuildId = ref('');
let errors = ref<string[]>([]);

const DoDelete = async () => {

    partInBuildId.value = route.params.id;

    const res = await PartInBuildService.Delete(partInBuildId.value)

    if (res.data) {
        router.back();
    } else {
        errors.value = res.errors!;
    }
}
</script>





<template>
    <div v-if="errors.length > 0" role="alert" class="rounded border-s-4 border-red-500 bg-red-50 p-4">
        <div class="flex items-center gap-2 text-red-800">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
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
    <div class="rounded-lg bg-white p-8 shadow-2xl">
        <h2 class="text-lg font-bold">Are you sure you want to delete that?</h2>

        <p class="mt-2 text-sm text-gray-500">
            Deleting this is irreversable
        </p>

        <div class="mt-4 flex gap-2">
            <button
            @click.prevent="DoDelete"
            type="button" class="rounded bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
            Yes, I'm sure
            </button>

            <button @click.prevent="router.back()" type="button" className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
            No, go back
            </button>
        </div>
    </div>
</template>