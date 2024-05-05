<script setup lang="ts">
import router from '@/router';
import PartService from '@/services/PartService';
import { ref } from 'vue';
import { useRoute } from 'vue-router';




let PartId = ref("");
let Name = ref("");
let PartCode = ref("");
let quantity = ref(0)
let price = ref(0);
let isLoading = ref(true);
let route = useRoute()

let errors = ref<string[]>([]);

const doUpdate = async () => {
    const res = await PartService.UpdatePart(PartId.value, Name.value, PartCode.value, price.value, quantity.value);
    if (res.data){
        router.back();
    }
    errors.value = res.errors!;
}

const Fetch = async () => {
    PartId.value = route.params.id.toString();
    try {
        const res = await PartService.getSpecific(PartId.value);
        if (res.data) {
            Name.value = res.data.partName;
            price.value = res.data.price;
            quantity.value = res.data.quantity,
            PartCode.value = res.data.partCode
        }
    } catch (error) {
        console.error('Error fetching keyboards:', error);
    } finally {
        isLoading.value = false;
    }
    
}

Fetch();

</script>




<template> 
        <div className="flex">
            <div className="flex-1 flex justify-left pl-10">
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
                <form className='space-y-6'>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Part Name</label>
                        <div className="mt-2">
                            <input 
                                v-model="Name"
                                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Part code</label>
                        <div className="mt-2">
                            <input
                                v-model="PartCode"
                                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                        <div className="mt-2">
                            <input 
                                type='number'
                                value={price}
                                v-model="price"
                                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">quantity</label>
                        <div className="mt-2">
                            <input 
                                value={itemCode}
                                v-model="quantity"
                                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                      <button type="button" @click.prevent="doUpdate" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add new keyboard</button>
                    </div>
                    <router-link class="underline" to="../Index">Back to the Dashboard</router-link>
                </form>
    
            </div>
            <div className="w-1/6 "></div>
        </div>
    </template>