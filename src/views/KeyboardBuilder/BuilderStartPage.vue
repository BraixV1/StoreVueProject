<script setup lang="ts">
import KeyboardBuildService from '@/services/KeyboardBuildService';
import { useAuthStore } from '../../stores/auth';
import { useBuildStore } from '@/stores/keyboardBuild';
import { ref } from 'vue';
import router from '@/router';


const buildStore = useBuildStore();
const buildName = ref("");
const errors = ref<string[]>([]);

const doAdd = async () => {
    const res = await KeyboardBuildService.Add(buildName.value,"");
    if (res.data){
        buildStore.buildId = res.data.id;
        router.push('BuilderPage');
    }
    if (res.errors){
        errors.value = res.errors
    }
    
}

</script>

<template>
    <div class="px-3 flex items-center justify-center h-screen w-screen">
        <div v-if="errors.length > 0" role="alert" class="rounded border-s-4 border-red-500 bg-red-50 p-4">
          <div class="flex items-center gap-2 text-red-800">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
              <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/>
            </svg>
            <strong class="block font-medium"> Something went wrong </strong>
          </div>
          <p class="mt-2 text-sm text-red-700">
            {{ errors.join(',') }}
          </p>
        </div>
        <label
            for="Keyboard build name"
            class="w-1/3 h-20 font-bold relative block rounded-md border border-gray-200 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600"
        >
            <input
                v-model="buildName"
                type="text"
                id="Keyboard build name"
                class="text-4xl peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                placeholder="Keyboard build name"
            />
            <span
                class="absolute top-0 left-2.5 -translate-y-1/2 bg-white p-0.5 text-xl text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-4xl peer-focus:top-0 peer-focus:text-xl"
            >
                Keyboard build name
            </span>
        </label>
        <button
            @click.prevent="doAdd"
            class=" inline-block rounded-full border border-indigo-600 bg-indigo-600 p-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            
        >
            <span class="sr-only"> Start building </span>

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
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
            </svg>
        </button>
    </div>
</template>
