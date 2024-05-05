import { useAuthStore } from '@/stores/auth'
import type { IResultObject } from '@/types/IResultObject'
import type { IPartInBuildInfo } from '@/types/PartInBuild'
import AccountService from './AccountService'
import httpCLient, { getDecodedAccessToken } from '@/http-client'

export default class PartInBuildService {
    constructor() {}

    private static httpClient = httpCLient

    static async getAll(): Promise<IResultObject<IPartInBuildInfo[]>> {
        try {
            const response =
                await PartInBuildService.httpClient.get<IPartInBuildInfo[]>('v1/PartInBuild/AllBuildParts')

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

    static async getSpecific(id: string): Promise<IResultObject<IPartInBuildInfo>> {
        try {
            const response = await PartInBuildService.httpClient.get<IPartInBuildInfo>(
                `v1/PartInBuild/GetBuildPart/${id}`
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
        PartId: string,
        KeyboardBuildId: string
    ): Promise<IResultObject<IPartInBuildInfo>> {
        const authstore = useAuthStore()
        const UpdateData = {
            partId: PartId,
            keyboardBuildId: KeyboardBuildId
        }
        const decodedToken = getDecodedAccessToken(authstore.jwt!)
        const currentTime = new Date()
        const expDate = new Date(decodedToken.exp!)
        if (expDate.getTime() < currentTime.getTime()) {
            await AccountService.RefreshJWt()
        }
        if (authstore.jwt == null) {
            return { errors: ['Unauthorised request'] }
        }
        try {
            const response = await PartInBuildService.httpClient.post<IPartInBuildInfo>(
                'v1/PartInBuild/AddBuildPart',
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

    static async Delete(id: string): Promise<IResultObject<IPartInBuildInfo>> {
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
            const response = await PartInBuildService.httpClient.delete<IPartInBuildInfo>(
                `v1/PartInBuild/DeletePartInBuild/${id}`,
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
        KeyboardBuildId: string,
        PartId: string
    ): Promise<IResultObject<IPartInBuildInfo>> {
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
            id: id,
            KeyboardBuildId: KeyboardBuildId,
            PartId: PartId
        }
        try {
            const response = await PartInBuildService.httpClient.patch<IPartInBuildInfo>(
                'v1/PartInBuild/UpdatePartInBuild',
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
