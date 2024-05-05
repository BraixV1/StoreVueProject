<script setup lang="ts">
import { useShoppingCartStore } from '../../stores/shoppingCart';

const cartStore = useShoppingCartStore();

if (cartStore.CartItems == null) {
  cartStore.CartItems = [];

}

const deleteItem = (index: number) => {
  cartStore.CartItems.splice(index, 1);
  cartStore.CartItems = [...cartStore.CartItems];
}

const QuantityCheck = (quantity: number) => {
  if (quantity < 1) {
    return 1
  }
  else {
    return quantity;
  }
}

</script>


<template>    
    <div
      class="relative w-screen max-w-sm border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
      aria-modal="true"
      role="dialog"
      tabindex="-1"
    >
      <button @click.prevent="cartStore.Opened = false" class="absolute end-4 top-4 text-gray-600 transition hover:scale-110">
        <span class="sr-only">Close cart</span>
    
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-5 w-5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    
      <div class="mt-4 space-y-6">
        <ul class="space-y-4">
          <li v-for="item, index in cartStore.CartItems" :key="index" class="flex items-center gap-4">
            <img
              src="https://images.pexels.com/photos/13728043/pexels-photo-13728043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              class="size-16 rounded object-cover"
            />
    
            <div>
              <h3 v-if="item.keyboard" class="text-sm text-gray-900">{{ item.keyboard.name }}</h3>
              <h3 v-else class="text-sm text-gray-900">{{ item.part!.partName }}</h3>
    
              <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
                <div>
                </div>
    
                <div>
                </div>
              </dl>
            </div>
    
            <div class="flex flex-1 items-center justify-end gap-2">
              <form>
                <label for="Line1Qty" class="sr-only"> {{ item.quantity }} </label>
    
                <input
                  v-model="item.quantity"
                  v-on:change="QuantityCheck(item.quantity)"
                  type="number"
                  min="1"
                  value="1"
                  id="Line1Qty"
                  class="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                />
              </form>
    
              <button @click.prevent="deleteItem(index)" class="text-gray-600 transition hover:text-red-600">
                <span class="sr-only">Remove item</span>
    
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
              </button>
            </div>
          </li>
        </ul>
        <div class="space-y-4 text-center">
          <a
            href="#"
            class="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
          >
            View my cart ({{ cartStore.CartItems.length }})
          </a>
    
          <router-link
            to="/Checkout"
            class="block rounded bg-indigo-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
          >
            Checkout
        </router-link>
    
          <button
            @click.prevent="cartStore.Opened = false"
            class="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
          >
            Continue shopping
          </button>
        </div>
      </div>
    </div>
</template>