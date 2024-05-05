<script setup lang="ts">
import PartService from '@/services/PartService';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import type { IOrderItemInfo } from '@/types/OrderItem';
import { useShoppingCartStore } from '@/stores/shoppingCart';
import CommentForParts from '../Comment section/CommentForParts.vue';
import type { IPartRatingInfo } from '@/types/PartRating';

const shoppingCart = useShoppingCartStore();

let PartId = ref("");
let Name = ref("");
let PartCode = ref("");
let quantity = ref(0)
let price = ref(0);
let isLoading = ref(true);
let route = useRoute()
let Ratings = ref<IPartRatingInfo[]>([]);

const Fetch = async () => {
    PartId.value = route.params.id;
    try {
        const res = await PartService.getSpecific(PartId.value);
        if (res.data) {
            Name.value = res.data.partName;
            price.value = res.data.price;
            quantity.value = res.data.quantity,
            PartCode.value = res.data.partCode
            Ratings.value = res.data.partCommentsCollection
        }
    } catch (error) {
        console.error('Error fetching keyboards:', error);
    } finally {
        isLoading.value = false;
    }
    
}

const AddToCart = () => {
    // Initialize orderItem with an object
    let orderItem: IOrderItemInfo = {
        keyboard: null,
        id: undefined,
        quantity: 1,
        price: 0,
        addedToBasket: new Date,
        partId: PartId.value,
        part: {
            id: PartId.value,
            partName: Name.value,
            quantity: quantity.value,
            partCode: PartCode.value,
            price: price.value
        },
        keyboardId: null,
        orderId: undefined,
        order: undefined
    };
    shoppingCart.CartItems.push(orderItem);
}

Fetch();

</script>


<template>
    <div class="bg-gray-100 dark:bg-gray-800 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row -mx-4">
            <div class="md:flex-1 px-4">
                <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img class="w-full h-full object-cover" src="https://m.media-amazon.com/images/I/51i02mZTBRS._AC_SL1500_.jpg" alt="Product Image">
                </div>
                <div class="flex -mx-2 mb-4">
                    <div class="w-1/2 px-2">
                        <button @click.prevent="AddToCart" class="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                    </div>
                    <div class="w-1/2 px-2">
                        <button class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
                    </div>
                </div>
            </div>
            <div class="md:flex-1 px-4">
                <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">Product Name</h2>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {{ Name }}
                </p>
                <div class="flex mb-4">
                    <div class="mr-4">
                        <span class="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                        <span class="text-gray-600 dark:text-gray-300">${{ price + "/" + quantity }}</span>
                    </div>
                    <div>
                        <span class="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                        <span class="text-gray-600 dark:text-gray-300">In Stock</span>
                    </div>
                </div>
            </div>
        </div>
        <CommentForParts :ratings="Ratings!" :partId="PartId"/>
    </div>
</div>

</template>


