import httpCLient, { getDecodedAccessToken } from '@/http-client'
import { useAuthStore } from '@/stores/auth'
import { EOrderStatus } from '@/types/Helpers/EOrderStatus'
import type { IResultObject } from '@/types/IResultObject'
import type { IOrderInfo } from '@/types/Order'
import type { IOrderItemInfo } from '@/types/OrderItem'
import AccountService from './AccountService'

export default class OrderService {
    constructor() {}

    private static httpClient = httpCLient

    static convertOrderStatus(numericValue: number): EOrderStatus {
        switch (numericValue) {
            case 0:
                return EOrderStatus.Pending
            case 1:
                return EOrderStatus.Done
            case 2:
                return EOrderStatus.Canceled
            default:
                console.warn(`Unknown order status value: ${numericValue}`)
                return EOrderStatus.Pending
        }
    }

    static async getAll(): Promise<IResultObject<IOrderInfo[]>> {
        const authstore = useAuthStore()
        if (authstore.jwt == null) {
            return { errors: ['Unauthorised request'] }
        }
        const decodedToken = getDecodedAccessToken(authstore.jwt!)
        const currentTime = new Date()
        const expDate = new Date(decodedToken.exp!)
        if (expDate.getTime() < currentTime.getTime()) {
            await AccountService.RefreshJWt()
        }
        try {
            const response = await OrderService.httpClient.get<IOrderInfo[]>('v1/Order/AllOrders', {
                headers: { Authorization: `Bearer ${authstore.jwt}` }
            })

            if (response.status < 300) {
                // const orderData = response.data
                // orderData.forEach((order) => {
                //     order.orderStatus = this.convertOrderStatus(order.orderStatus)
                // })
                return {
                    data: response.data
                }
            } else {
                return {
                    errors: [response.status.toString() + ' ' + response.statusText]
                }
            }
        } catch (error: any) {
            if (error.response) {
                return {
                    errors: [error.response.data.status + ' ' + error.response.data.error]
                }
            } else {
                return {
                    errors: ['An error occurred: ' + error.message]
                }
            }
        }
    }

    static async getSpecific(id: string): Promise<IResultObject<IOrderInfo>> {
        const authstore = useAuthStore()
        if (authstore.jwt == null) {
            return { errors: ['Unauthorised request'] }
        }
        const decodedToken = getDecodedAccessToken(authstore.jwt!)
        const currentTime = new Date()
        const expDate = new Date(decodedToken.exp!)
        if (expDate.getTime() < currentTime.getTime()) {
            await AccountService.RefreshJWt()
        }

        try {
            const response = await OrderService.httpClient.get<IOrderInfo>(`v1/Order/GetOrder/${id}`, {
                headers: { Authorization: `Bearer ${authstore.jwt}` }
            })
            if (response.status < 300) {
                const orderData = response.data
                // orderData.orderStatus = this.convertOrderStatus(orderData.orderStatus)
                return {
                    data: orderData
                }
            } else {
                return {
                    errors: ['An error occurred: ' + Error]
                }
            }
        } catch (error: any) {
            if (error.response) {
                return {
                    errors: [error.response.data.status + ' ' + error.response.data.error]
                }
            } else {
                return {
                    errors: ['An error occurred: ' + error.message]
                }
            }
        }
    }

    static async getUserOrders(): Promise<IResultObject<IOrderInfo[]>> {
        const authstore = useAuthStore()
        if (authstore.jwt == null) {
            return { errors: ['Unauthorised request'] }
        }
        const decodedToken = getDecodedAccessToken(authstore.jwt!)
        const currentTime = new Date()
        const expDate = new Date(decodedToken.exp!)
        if (expDate.getTime() < currentTime.getTime()) {
            await AccountService.RefreshJWt()
        }

        try {
            const response = await OrderService.httpClient.get<IOrderInfo[]>('v1/Order/GetUserOrders', {
                headers: { Authorization: `Bearer ${authstore.jwt}` }
            })

            if (response.status < 300) {
                // const orderData = response.data
                // orderData.forEach((order) => {
                //     order.orderStatus = this.convertOrderStatus(order.orderStatus)
                // })
                return {
                    data: response.data
                }
            } else {
                return {
                    errors: [response.status.toString() + ' ' + response.statusText]
                }
            }
        } catch (error: any) {
            if (error.response) {
                return {
                    errors: [error.response.data.status + ' ' + error.response.data.error]
                }
            } else {
                return {
                    errors: ['An error occurred: ' + error.message]
                }
            }
        }
    }

    static async Add(
        OrderNumber: number,
        OrderItemsCollection?: IOrderItemInfo[]
    ): Promise<IResultObject<IOrderInfo>> {
        const UpdateData = {
            OrderNumber: OrderNumber,
            OrderItemsCollection: OrderItemsCollection
        }
        const authstore = useAuthStore()
        if (authstore.jwt == null) {
            return { errors: ['Unauthorised request'] }
        }
        const decodedToken = getDecodedAccessToken(authstore.jwt!)
        const currentTime = new Date()
        const expDate = new Date(decodedToken.exp!)
        if (expDate.getTime() < currentTime.getTime()) {
            await AccountService.RefreshJWt()
        }
        try {
            console.log(JSON.stringify(UpdateData))
            const response = await OrderService.httpClient.post<IOrderInfo>(
                'v1/Order/AddOrder',
                UpdateData,
                {
                    headers: { Authorization: `Bearer ${authstore.jwt}` }
                }
            )
            if (response.status < 300) {
                return {
                    data: response.data
                }
            } else {
                return {
                    errors: ['An error occurred: ' + Error]
                }
            }
        } catch (error: any) {
            if (error.response) {
                return {
                    errors: [error.response.data.status + ' ' + error.response.data.error]
                }
            } else {
                return {
                    errors: ['An error occurred: ' + error.message]
                }
            }
        }
    }

    static async Update(Orderid: string, status: number) {
        const UpdateData = {
            id: Orderid,
            orderStatus: status
        }
        const authstore = useAuthStore()
        if (authstore.jwt == null) {
            return { errors: ['Unauthorised request'] }
        }
        const decodedToken = getDecodedAccessToken(authstore.jwt!)
        const currentTime = new Date()
        const expDate = new Date(decodedToken.exp!)
        if (expDate.getTime() < currentTime.getTime()) {
            await AccountService.RefreshJWt()
        }
        try {
            const response = await OrderService.httpClient.patch<IOrderInfo>(
                `v1/Order/UpdateOrderStatus`,
                UpdateData,
                {
                    headers: { Authorization: `Bearer ${authstore.jwt}` }
                }
            )
            if (response.status < 300) {
                return {
                    data: response.data
                }
            } else {
                return {
                    errors: ['An error occurred: ' + Error]
                }
            }
        } catch (error: any) {
            if (error.response) {
                return {
                    errors: [error.response.data.status + ' ' + error.response.data.error]
                }
            } else {
                return {
                    errors: ['An error occurred: ' + error.message]
                }
            }
        }
    }

    static async Delete(id: string): Promise<IResultObject<IOrderInfo>> {
        const authstore = useAuthStore()
        if (authstore.jwt == null) {
            return { errors: ['Unauthorised request'] }
        }
        const decodedToken = getDecodedAccessToken(authstore.jwt!)
        const currentTime = new Date()
        const expDate = new Date(decodedToken.exp!)
        if (expDate.getTime() < currentTime.getTime()) {
            await AccountService.RefreshJWt()
        }
        try {
            const response = await OrderService.httpClient.delete<IOrderInfo>(`v1/Order/DeleteOrder/${id}`, {
                headers: { Authorization: `Bearer ${authstore.jwt}` }
            })
            if (response.status < 300) {
                return {
                    data: response.data
                }
            } else {
                return {
                    errors: ['An error occurred: ' + Error]
                }
            }
        } catch (error: any) {
            if (error.response) {
                return {
                    errors: [error.response.data.status + ' ' + error.response.data.error]
                }
            } else {
                return {
                    errors: ['An error occurred: ' + error.message]
                }
            }
        }
    }
}
