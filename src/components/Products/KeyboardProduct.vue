<script setup lang="ts">
import KeyboardService from '@/services/KeyboardService'
import { useShoppingCartStore } from '@/stores/shoppingCart'
import type { IKeyboardPartInfo } from '@/types/KeyboardPart'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import  type{ IOrderItemInfo } from '../../types/OrderItem'
import CommentForKeyboards from '../Comment section/CommentForKeyboards.vue'
import Loading from '../Loading.vue'
import type { IKeyboardRatingInfo } from '@/types/KeyboardRating'

const shoppingCart = useShoppingCartStore()
let route = useRoute()

let Name = ref('')
let description = ref('')
let Keyboardprice = ref(0)
let ItemCode = ref('')
let keyboardId = ref('')
let isLoading = ref(true)
let keyboardParts = ref<IKeyboardPartInfo[]>()
let Ratings = ref<IKeyboardRatingInfo[]>()

const Fetch = async () => {
    keyboardId.value = route.params.id.toString();
    try {
        const res = await KeyboardService.getSpecific(keyboardId.value)
        if (res.data) {
            Name.value = res.data.name;
            Keyboardprice.value = res.data.price;
            ItemCode.value = res.data.itemCode;
            description.value = res.data.description
            keyboardParts.value = res.data.keyboardPartsCollection
            Ratings.value = res.data.keyboardRatingsCollection
        }
    } catch (error) {
        console.error('Error fetching keyboards:', error)
    } finally {
        isLoading.value = false
    }
}

const AddToCart = () => {
    // Initialize orderItem with an object
    let orderItem: IOrderItemInfo = {
        keyboard: {
            id: keyboardId.value,
            name: Name.value,
            itemCode: ItemCode.value,
            description: description.value,
            price: Keyboardprice.value
        },
        id: undefined,
        quantity: 1,
        price: 0,
        addedToBasket: new Date(),
        partId: null,
        part: null,
        keyboardId: keyboardId.value,
        orderId: undefined,
        order: undefined
    }
    shoppingCart.CartItems.push(orderItem)
}

Fetch()
</script>

<template>
    <div v-if="isLoading"> <Loading/></div>
    <div v-else class="bg-gray-100 dark:bg-gray-800 py-8 1-10">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row -mx-4">
                <div class="md:flex-1 px-4">
                    <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                        <img
                            class="w-full h-full object-cover"
                            src="https://images.pexels.com/photos/13728043/pexels-photo-13728043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Product Image"
                        />
                    </div>
                    <div class="flex -mx-2 mb-4">
                        <div class="w-1/2 px-2">
                            <button
                                @click.prevent="AddToCart"
                                class="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                Add to Cart
                            </button>
                        </div>
                        <div class="w-1/2 px-2">
                            <button
                                class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                                Add to Wishlist
                            </button>
                        </div>
                    </div>
                </div>
                <div class="md:flex-1 px-4">
                    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                        Product Name
                    </h2>
                    <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {{ Name }}
                    </p>
                    <div class="flex mb-4">
                        <div class="mr-4">
                            <span class="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                            <span class="text-gray-600 dark:text-gray-300"
                                >${{ Keyboardprice }}</span
                            >
                        </div>
                        <div>
                            <span class="font-bold text-gray-700 dark:text-gray-300"
                                >Availability:</span
                            >
                            <span class="text-gray-600 dark:text-gray-300">In Stock</span>
                        </div>
                    </div>

                    <div class="mb-4">
                        <span class="font-bold text-gray-700 dark:text-gray-300"
                            >Product Description:</span
                        >
                        <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                            {{ description }}
                        </p>
                    </div>
                    <div>
                        <span class="font-bold text-gray-700 dark:text-gray-300">Parts</span>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y-2 divide-gray-200 text-sm">
                                <thead class="text-left">
                                    <tr>
                                        <th
                                            class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                                        >
                                            Name
                                        </th>
                                    </tr>
                                </thead>

                                <tbody class="divide-y divide-gray-200">
                                    <tr v-for="part in keyboardParts" :key="part.id">
                                        <td
                                            class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                                        >
                                            {{ part.part?.partName }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <CommentForKeyboards :ratings="Ratings!" :keyboard-id="keyboardId" />
        </div>
    </div>
</template>
