import type { IOrderItemInfo } from "@/types/OrderItem";
import type { stringOrNull } from "@/types/types";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useShoppingCartStore = defineStore('shoppingCart', () => {
    const CartItems = ref<IOrderItemInfo[]>(JSON.parse(localStorage.getItem('shoppingCart.CartItems') || 'null'));
    const Opened = ref(false);

    const hasCart = computed<boolean>(() => !CartItems.value)

    watch(
        [CartItems], ([newCartItems]) => {
            localStorage.setItem('shoppingCart.CartItems', JSON.stringify(newCartItems))
        },
        { deep: true}
    )

    function updateCartData(newCartItems: IOrderItemInfo[]){
        CartItems.value = newCartItems || newCartItems;
    }

    function clearCartData() {
        CartItems.value = [];
        localStorage.setItems('shoppingCart.CartItems', null)
    }

    return {CartItems, Opened, hasCart, updateCartData, clearCartData}
})