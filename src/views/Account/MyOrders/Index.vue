<script setup lang="ts">
import OrderService from '@/services/OrderService'
import type { IOrderInfo } from '@/types/Order'
import { EOrderStatus } from '@/types/Helpers/EOrderStatus'
import OrderPending from '@/components/OrderStatus/OrderPending.vue'
import OrderCanceled from '@/components/OrderStatus/OrderCanceled.vue'
import OrderDone from '@/components/OrderStatus/OrderComplete.vue'
import { ref } from 'vue'

let isLoading = ref(true)
let orders = ref<IOrderInfo[]>([])



const fetchOrders = async () => {
    try {
        const response = await OrderService.getUserOrders()

        if (response.data) {
            orders.value = response.data
        }
    } catch (error) {
        console.error('Error fetching orders:', error)
    } finally {
        isLoading.value = false
    }
}

fetchOrders()

const calculateTotalCost = (order: IOrderInfo): number => {
    if (!order.orderItemsCollection) return 0
    return order.orderItemsCollection.reduce((total, item) => total + (item.price ?? 0), 0)
}
</script>

<template>
    <div>
    <span class="flex items-center">
        <span class="pr-6">My orders</span>
        <span class="h-px flex-1 bg-black"></span>
    </span>
    <details
        class="group [&_summary::-webkit-details-marker]:hidden overflow-x-auto min-w-ful"
        v-for="order in orders"
        :key="order.id"
    >

        <summary class="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <table >
                <tr>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        #{{ order.orderNumber }}
                    </th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {{ order.orderDate }}
                    </th>

                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        ${{ calculateTotalCost(order) }}
                    </th>
                    <td
                        v-if="order.orderStatus == EOrderStatus.Done"
                        class="whitespace-nowrap px-4 py-2 text-gray-700"
                    >
                    <OrderDone />
                    </td>
                    <td
                        v-if="order.orderStatus == EOrderStatus.Canceled"
                        class="whitespace-nowrap px-4 py-2 text-gray-700"
                    >
                    <OrderCanceled />
                    </td>
                    <td
                        v-if="order.orderStatus == EOrderStatus.Pending"
                        class="whitespace-nowrap px-4 py-2 text-gray-700"
                    >
                    <OrderPending/>
                    </td>
                </tr>
            </table>
            <span class="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
        </summary>
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border-indigo-500 border-t-2">
            <thead class="text-left">
                <tr>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Item name</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">quantity</th>
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        total price
                    </th>
                    <th class="px-4 py-2"></th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                <tr v-for="orderItem in order.orderItemsCollection" :key="orderItem.id">
                    <td v-if="orderItem.part" class="whitespace-nowrap px-4 py-2 text-gray-700">
                        {{ orderItem.part.partName }}
                    </td>
                    <td v-if="orderItem.keyboard" class="whitespace-nowrap px-4 py-2 text-gray-700">
                        {{ orderItem.keyboard.name }}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                        {{ orderItem.quantity }}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                        ${{ orderItem.price }}
                    </td>
                </tr>
            </tbody>
        </table>
    </details>
</div>
</template>
