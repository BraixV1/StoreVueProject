import httpCLient, { getDecodedAccessToken } from '@/http-client'
import { useAuthStore } from '@/stores/auth'
import type { IResultObject } from '@/types/IResultObject'
import type { IOrderItemInfo } from '@/types/OrderItem'
import type { IPartCategoryInfo } from '@/types/PartCategory'
import AccountService from './AccountService'

export default class OrderItemService {
    constructor() {}

    private static httpClient = httpCLient

    static async getAll(): Promise<IResultObject<IOrderItemInfo[]>> {
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
            const response = await OrderItemService.httpClient.get<IOrderItemInfo[]>(
                'v1/OrderItem/AllOrderItems',
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

    static async getSpecific(id: string): Promise<IResultObject<IOrderItemInfo>> {
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
            const response = await OrderItemService.httpClient.get<IOrderItemInfo>(
                `v1/OrderItem/GetOrderItem/${id}`,
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

    static async Add(
        KeyboardId: string | null,
        PartId: string | null,
        OrderId: string,
        Quantity: number
    ): Promise<IResultObject<IOrderItemInfo>> {
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

        const UpdateData = {
            KeyboardId: KeyboardId,
            partId: PartId,
            orderId: OrderId,
            quantity: Quantity
        }

        // Convert UpdateData to JSON string and log it
        const jsonData = JSON.stringify(UpdateData)
        console.log('JSON being sent:', jsonData)

        try {
            const response = await OrderItemService.httpClient.post<IOrderItemInfo>(
                'v1/OrderItem/AddOrderItem',
                UpdateData,
                { headers: { Authorization: `Bearer ${authstore.jwt}` } }
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

    static async Delete(id: string): Promise<IResultObject<IOrderItemInfo>> {
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
            const response = await OrderItemService.httpClient.delete<IOrderItemInfo>(
                `v1/OrderItem/DeleteOrderItem/${id}`,
                { headers: { Authorization: `Bearer ${authstore.jwt}` } }
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

    static async Update(
        id: string,
        KeyboardId: string | null,
        Quantity: number,
        PartId: string | null
    ): Promise<IResultObject<IPartCategoryInfo>> {
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
        const UpdateData = {
            KeyboardId: KeyboardId,
            id: id,
            partId: PartId,
            quantity: Quantity
        }
        try {
            const response = await OrderItemService.httpClient.patch<IPartCategoryInfo>(
                'v1/OrderItem/UpdateOrderItem',
                UpdateData,
                { headers: { Authorization: `Bearer ${authstore.jwt}` } }
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
}
