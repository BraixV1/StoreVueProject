<script setup lang="ts">
import router from '@/router';
import KeyboardBuildService from '@/services/KeyboardBuildService';
import PartInBuildService from '@/services/PartInBuildService';
import PartService from '@/services/PartService';
import type { IkeyboardBuildInfo } from '@/types/KeyboardBuild';
import type { IPartInfo } from '@/types/Part';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

let route = useRoute(); 

let isLoading = ref(true);
let partInBuildId = ref('');
let buildId = ref('');
let PartId = ref('');
let Builds = ref<IkeyboardBuildInfo[]>([]);
let Parts = ref<IPartInfo[]>([]);

let errors = ref<string[]>([]);

const fetch = async () => {
    partInBuildId.value = route.params.id;
    const resPart = await PartService.getAll();
    const resKeyboardBuild = await KeyboardBuildService.getAll();
    const PartInBuildResponse = await PartInBuildService.getSpecific(partInBuildId.value)
    if (resKeyboardBuild.data){
        Builds.value = resKeyboardBuild.data;
    }
    if (resPart.data) {
        Parts.value = resPart.data;
    }
    if (PartInBuildResponse.data) {
        PartId.value = PartInBuildResponse.data.partId;
        buildId.value = PartInBuildResponse.data.keyboardBuildId;
    }
    isLoading.value = false
}

const doUpdate = async () => {
    const res = await PartInBuildService.Update(partInBuildId.value, buildId.value, PartId.value);
    if (res.data){
        errors.value = []
        router.push('../Index');
    }
    errors.value = res.errors!;
}
fetch();
</script>

<template>
    <div v-if="isLoading"><Loading /></div>
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
    <form class="space-y-6">
      <div>
        <label for="keyboardSelect" class="block text-sm font-medium text-gray-900">Keyboard builds</label>
        <select v-model="buildId" id="keyboardSelect" class="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm">
          <option value="">Please select</option>
          <option v-for="build in Builds" :key="build.id" :value="build.id">{{ build.buildName }}</option>
        </select>
      </div>
      <div>
        <label for="partSelect" class="block text-sm font-medium text-gray-900">Parts</label>
        <select v-model="PartId" id="partSelect" class="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm">
          <option value="">Please select</option>
          <option v-for="part in Parts" :key="part.id" :value="part.id">{{ part.partName }}</option>
        </select>
      </div>
      
      <div>
        <button @click.prevent="doUpdate" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update keyboard part</button>
      </div>
      <router-link class="underline" to="../Index">Back to the Dashboard</router-link>
    </form>
  </template>