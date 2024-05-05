import type { IResultObject } from '@/types/IResultObject'
import type { IKeyboardInfo } from '@/types/Keyboard'
import { useAuthStore } from '@/stores/auth'
import httpCLient, { getDecodedAccessToken } from '@/http-client'
import AccountService from './AccountService'

export default class KeyboardService {
    private constructor() {}
    private static httpClient = httpCLient

    static async getAll(): Promise<IResultObject<IKeyboardInfo[]>> {
        try {
            const response = await KeyboardService.httpClient.get<IKeyboardInfo[]>(
                'v1/Keyboard/AllKeyboards'
            )

            if (response.status >= 200 && response.status < 300) {
                return {
                    data: response.data
                }
            } else {
                return {
                    errors: ['An error occurred: ' + response.statusText]
                }
            }
        } catch (error: any) {
            if (error.response) {
                return {
                    errors: [error.response.status + ' ' + error.response.data.error]
                }
            } else {
                return {
                    errors: ['An error occurred: ' + error.message]
                }
            }
        }
    }

    static async getSpecific(id: string): Promise<IResultObject<IKeyboardInfo>> {
        try {
            const response = await KeyboardService.httpClient.get<IKeyboardInfo>(
                `v1/Keyboard/GetKeyboard/${id}`
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

    static async AddKeyboard(
        Name: string,
        Description: string,
        Price: number,
        ItemCode: string
    ): Promise<IResultObject<IKeyboardInfo>> {
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
            Name: Name,
            Description: Description,
            Price: Price,
            ItemCode: ItemCode
        }
        try {
            const response = await KeyboardService.httpClient.post<IKeyboardInfo>(
                'v1/Keyboard/AddKeyboard',
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

    static async DeleteKeyboard(id: string): Promise<IResultObject<IKeyboardInfo>> {
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
            const response = await KeyboardService.httpClient.delete<IKeyboardInfo>(
                `v1/Keyboard/Deletekeyboard/${id}`,
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

    static async UpdateKeyboard(
        id: string,
        Name: string,
        Description: string,
        Price: number,
        ItemCode: string
    ): Promise<IResultObject<IKeyboardInfo>> {
        const UpdateData = {
            Id: id,
            Name: Name,
            Description: Description,
            Price: Price,
            ItemCode: ItemCode
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
            const response = await KeyboardService.httpClient.patch<IKeyboardInfo>(
                'v1/Keyboard/UpdateKeyboard',
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
