<script setup lang="ts">
import router from '@/router'
import KeyboardService from '@/services/KeyboardService'
import PartService from '@/services/PartService'
import WarehousePartService from '@/services/WarehousePartService'
import WarehouseService from '@/services/WarehouseService'
import type { IKeyboardInfo } from '@/types/Keyboard'
import type { IPartInfo } from '@/types/Part'
import type { IWarehouseInfo } from '@/types/Warehouse'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

let route = useRoute()

let warehousePartId = ref('')
let KeyboardId = ref<string | null>(null)
let warehouseId = ref("")
let PartId = ref<string | null>(null)
let quantity = ref(1)
let Keyboards = ref<IKeyboardInfo[]>([])
let Parts = ref<IPartInfo[]>([])
let Warehouses = ref<IWarehouseInfo[]>([])
let showPart = ref(true)

let errors = ref<string[]>([])

const fetch = async () => {
    warehousePartId.value = route.params.id.toString()
    const resPart = await PartService.getAll()
    const resKeyboard = await KeyboardService.getAll()
    const resWarehouses = await WarehouseService.getAll();
    const resWarehousePart = await WarehousePartService.getSpecific(warehousePartId.value)
    if (resKeyboard.data) {
        Keyboards.value = resKeyboard.data
    }
    if (resPart.data) {
        Parts.value = resPart.data
    }
    if (resWarehouses.data) {
        Warehouses.value = resWarehouses.data;
    }
    if (resWarehousePart.data) {
        PartId.value = resWarehousePart.data.partId
        KeyboardId.value = resWarehousePart.data.keyboardId
        warehouseId.value = resWarehousePart.data.wareHouseId
    }
    if (PartId.value == null) {turnOnKeyboard()}
}

const doUpdate = async () => {
    const res = await WarehousePartService.Update(
        warehousePartId.value,
        warehouseId.value,
        KeyboardId.value,
        quantity.value,
        PartId.value,
    )
    if (res.data) {
        errors.value = []
        router.push('../Index')
    }
    errors.value = res.errors!
}

const manageMinus = () => {
  if (quantity.value <= 1) quantity.value = 1;
  else {
    quantity.value --;
  }
}

const turnOnKeyboard = () => {
  showPart.value = false;
  PartId.value = '';
}

const turnOnPart = () => {
  showPart.value = true;
  KeyboardId.value = '';
}

fetch()
</script>

<template>
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
      <div v-if="!showPart">
          <label for="keyboardSelect" class="block text-sm font-medium text-gray-900"
              >Keyboards</label
          >
          <select
              v-model="KeyboardId"
              id="keyboardSelect"
              class="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
          >
              <option value="">Please select</option>
              <option v-for="keyboard in Keyboards" :key="keyboard.id" :value="keyboard.id">
                  {{ keyboard.name }}
              </option>
          </select>
      </div>
      <div v-else>
          <label for="partSelect" class="block text-sm font-medium text-gray-900">Parts</label>
          <select
              v-model="PartId"
              id="partSelect"
              class="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
          >
              <option value="">Please select</option>
              <option v-for="part in Parts" :key="part.id" :value="part.id">
                  {{ part.partName }}
              </option>
          </select>
      </div>
      <div>
          <label for="partSelect" class="block text-sm font-medium text-gray-900">Parts</label>
          <select
              v-model="warehouseId"
              id="partSelect"
              class="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
          >
              <option value="">Please select</option>
              <option v-for="warehouse in Warehouses" :key="warehouse.id" :value="warehouse.id">
                  {{ warehouse.warehouseName }}
              </option>
          </select>
      </div>
      <div>
          <label for="Quantity" class="sr-only"> Quantity </label>

          <div class="flex items-center gap-1">
              <button
                  @click.prevent="manageMinus"
                  type="button"
                  class="size-10 leading-10 text-gray-600 transition hover:opacity-75"
              >
                  &minus;
              </button>

              <input
                  v-model="quantity"
                  type="number"
                  id="Quantity"
                  value="1"
                  class="h-10 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
              />

              <button
                  @click="quantity += 1"
                  type="button"
                  class="size-10 leading-10 text-gray-600 transition hover:opacity-75"
              >
                  &plus;
              </button>
          </div>
      </div>
      <div>
          <button
              @click.prevent="doUpdate"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
              Update warehouse part
          </button>
      </div>
      <router-link class="underline" to="../Index">Back to the Dashboard</router-link>
  </form>
  <fieldset class="space-y-4 pl-4">
      <legend class="sr-only">Delivery</legend>

      <div>
          <label
              for="DeliveryStandard"
              class="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-indigo-500 has-[:checked]:ring-1 has-[:checked]:ring-indigo-500"
          >
              <div>
                  <p class="text-gray-700">Keyboard field</p>
              </div>

              <input
                  v-model="showPart"
                  @click="turnOnKeyboard"
                  type="radio"
                  name="DeliveryOption"
                  value="false"
                  id="DeliveryStandard"
                  class="size-5 border-gray-300 text-indigo-500"
                  checked
              />
          </label>
      </div>

      <div>
          <label
              for="DeliveryPriority"
              class="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-indigo-500 has-[:checked]:ring-1 has-[:checked]:ring-indigo-500"
          >
              <div>
                  <p class="text-gray-700">Part field</p>
              </div>

              <input
                  v-model="showPart"
                  @click="turnOnPart"
                  type="radio"
                  name="DeliveryOption"
                  value="true"
                  id="DeliveryPriority"
                  class="size-5 border-gray-300 text-indigo-500"
              />
          </label>
      </div>
  </fieldset>
</template>
