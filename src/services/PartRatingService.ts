import httpCLient, { getDecodedAccessToken } from '@/http-client'
import { useAuthStore } from '@/stores/auth'
import type { IResultObject } from '@/types/IResultObject'
import type { IPartRatingInfo } from '@/types/PartRating'
import AccountService from './AccountService'

export default class PartRatingService {
    constructor() {}

    private static httpClient = httpCLient

    static async getAll(): Promise<IResultObject<IPartRatingInfo[]>> {
        try {
            const response =
                await PartRatingService.httpClient.get<IPartRatingInfo[]>('AllPartRatings')

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

    static async getSpecific(id: string): Promise<IResultObject<IPartRatingInfo>> {
        try {
            const response = await PartRatingService.httpClient.get<IPartRatingInfo>(
                `v1/PartRating/GetPartRating/${id}`
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

    static async getMyOwn(): Promise<IResultObject<IPartRatingInfo[]>> {
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
            const response = await PartRatingService.httpClient.get<IPartRatingInfo[]>(
                'v1/PartRating/GetUserOwnPartRatings',
                { headers: { Authorization: `Bearer ${authstore.jwt}` } }
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

    static async Add(
        Comment: string,
        PartId: string,
        Rating: number
    ): Promise<IResultObject<IPartRatingInfo>> {
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
            PartId: PartId,
            Comment: Comment,
            Rating: Rating
        }
        try {
            const response = await PartRatingService.httpClient.post<IPartRatingInfo>(
                'v1/PartRating/AddPartRating',
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

    static async Delete(id: string): Promise<IResultObject<IPartRatingInfo>> {
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
            const response = await PartRatingService.httpClient.delete<IPartRatingInfo>(
                `v1/PartRating/DeletePartRating/${id}`,
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
        Rating: number,
        Comment: string
    ): Promise<IResultObject<IPartRatingInfo>> {
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
            Comment: Comment,
            Rating: Rating
        }
        try {
            const response = await PartRatingService.httpClient.patch<IPartRatingInfo>(
                'v1/PartRating/UpdatePartRating',
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
