<script setup lang="ts">
import router from '@/router';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import OrderService from '@/services/OrderService';
import { EOrderStatus } from '@/types/Helpers/EOrderStatus';


let route = useRoute(); 


let OrderId = ref('');
let isLoading = ref(true);
let Status = ref<EOrderStatus>(EOrderStatus.Pending);
let result = ref(0);

let errors = ref<string[]>([]);

const doUpdate = async () => {
    
    try {
        switch (Status.value){
          case (EOrderStatus.Pending):
            result.value = 0;
            break;
          case (EOrderStatus.Done):
            result.value = 1;
            break;
          case (EOrderStatus.Canceled):
            result.value = 2;
            break;
        }
        const res = await OrderService.Update(OrderId.value, result.value);
        if (res.data){
        router.push('../Index');
    }
    } catch (error) {
    console.error('Error updating Keyboard build:', error);
    }
}

const Fetch = async () => {
    OrderId.value = route.params.id.toString();
    try {
        const res = await OrderService.getSpecific(OrderId.value);
        if (res.data) {
          Status.value;
        }
    } catch (error) {
        console.error('Error fetching Keyboard build:', error);
    } finally {
        isLoading.value = false;
    }
    
}

Fetch();

</script>

<template>
    <div class="flex">
      <div class="flex-1 flex justify-left pl-10">
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
        <form class="space-y-6">
          <div>
            <label for="partSelect" class="block text-sm font-medium text-gray-900">Order Status</label>
            <select v-model="Status" id="partSelect" class="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm">
              <option value="">Please select</option>
              <option v-for="status in EOrderStatus" :key="status" :value="status">{{ status}}</option>
            </select>
          </div>
          <div>
            <button type="button" @click.prevent="doUpdate" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update keyboard build</button>
          </div>
          <router-link class="underline" to="../Index">Back to the Dashboard</router-link>
        </form>
      </div>
      <div class="w-1/6"></div>
    </div>
  </template>