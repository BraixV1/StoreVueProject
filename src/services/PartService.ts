import type { IResultObject } from '@/types/IResultObject'
import type { IPartInfo } from '../types/Part'
import httpCLient, { getDecodedAccessToken } from '@/http-client'
import { useAuthStore } from '@/stores/auth'
import AccountService from './AccountService'

export default class PartService {
    private constructor() {}

    private static httpClient = httpCLient

    static async getAll(): Promise<IResultObject<IPartInfo[]>> {
        try {
            const response = await PartService.httpClient.get<IPartInfo[]>('v1/Part/AllParts')

            if (response.status >= 200 && response.status < 300) {
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

    static async getSpecific(id: string): Promise<IResultObject<IPartInfo>> {
        try {
            const response = await PartService.httpClient.get<IPartInfo>(`v1/Part/GetPart/${id}`)
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

    static async AddPart(
        Name: string,
        PartCode: string,
        Price: number,
        Quantity: number
    ): Promise<IResultObject<IPartInfo>> {
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
            PartName: Name,
            PartCode: PartCode,
            Price: Price,
            Quantity: Quantity
        }
        try {
            const response = await PartService.httpClient.post<IPartInfo>('v1/Part/AddPart', UpdateData, {
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

    static async DeletePart(id: string): Promise<IResultObject<IPartInfo>> {
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
            const response = await PartService.httpClient.delete<IPartInfo>(`v1/Part/DeletePart/${id}`, {
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

    static async UpdatePart(
        id: string,
        Name: string,
        PartCode: string,
        Price: number,
        Quantity: number
    ): Promise<IResultObject<IPartInfo>> {
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
            Id: id,
            PartName: Name,
            PartCode: PartCode,
            Price: Price,
            Quantity: Quantity
        }
        try {
            const response = await PartService.httpClient.patch<IPartInfo>(
                'v1/Part/UpdatePart',
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
