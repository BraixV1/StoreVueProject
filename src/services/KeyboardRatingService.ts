import httpCLient, { getDecodedAccessToken } from '@/http-client'
import { useAuthStore } from '@/stores/auth'
import type { IResultObject } from '@/types/IResultObject'
import type { IKeyboardRatingInfo } from '@/types/KeyboardRating'
import AccountService from './AccountService'

export default class KeyboardRatingService {
    constructor() {}

    private static httpClient = httpCLient

    static async getAll(): Promise<IResultObject<IKeyboardRatingInfo[]>> {
        try {
            const response =
                await KeyboardRatingService.httpClient.get<IKeyboardRatingInfo[]>(
                    'v1/KeyboardRating/AllKeyboardRatings'
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

    static async getSpecific(id: string): Promise<IResultObject<IKeyboardRatingInfo>> {
        try {
            const response = await KeyboardRatingService.httpClient.get<IKeyboardRatingInfo>(
                `v1/KeyboardRating/GetKeyboardRating/${id}`
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

    static async getUserRatings(id: string): Promise<IResultObject<IKeyboardRatingInfo[]>> {
        try {
            const response = await KeyboardRatingService.httpClient.get<IKeyboardRatingInfo[]>(
                `v1/KeyboardRating/GetUserKeyboardRatings/${id}`
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

    static async getMyRatings(): Promise<IResultObject<IKeyboardRatingInfo[]>> {
      const authstore = useAuthStore()
      if (authstore.jwt == null) {
        return { errors: ['Unauthorised request'] }
      }
      const decodedToken = getDecodedAccessToken(authstore.jwt!)
      const currentTime = new Date();
      const expDate = new Date(decodedToken.exp!)
      if (expDate.getTime() < currentTime.getTime()) {
          await AccountService.RefreshJWt()
      }
        try {
            const response = await KeyboardRatingService.httpClient.get<IKeyboardRatingInfo[]>(
                `v1/KeyboardRating/GetUserOwnKeyboardRatings`,
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

    static async Add(
        Comment: string,
        PartId: string,
        Rating: number
    ): Promise<IResultObject<IKeyboardRatingInfo>> {
      const authstore = useAuthStore()
      if (authstore.jwt == null) {
        return { errors: ['Unauthorised request'] }
      }
      const decodedToken = getDecodedAccessToken(authstore.jwt!)
      const currentTime = new Date();
      const expDate = new Date(decodedToken.exp!)
      if (expDate.getTime() < currentTime.getTime()) {
          await AccountService.RefreshJWt()
      }

        const UpdateData = {
            KeyboardId: PartId,
            Comment: Comment,
            Rating: Rating
        }
        try {
            const response = await KeyboardRatingService.httpClient.post<IKeyboardRatingInfo>(
                'v1/KeyboardRating/AddKeyboardRating',
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

    static async Delete(id: string): Promise<IResultObject<IKeyboardRatingInfo>> {
        try {
            const authstore = useAuthStore()
            const decodedToken = getDecodedAccessToken(authstore.jwt!)
            const currentTime = new Date();
            const expDate = new Date(decodedToken.exp!)
            if (expDate.getTime() < currentTime.getTime()) {
                await AccountService.RefreshJWt()
            }
            if (authstore.jwt == null) {
                return { errors: ['Unauthorised request'] }
            }
            const response = await KeyboardRatingService.httpClient.delete<IKeyboardRatingInfo>(
                `v1/KeyboardRating/DeletekeyboardRating/${id}`,
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
    ): Promise<IResultObject<IKeyboardRatingInfo>> {
      const authstore = useAuthStore()
      if (authstore.jwt == null) {
        return { errors: ['Unauthorised request'] }
      }
      const decodedToken = getDecodedAccessToken(authstore.jwt!)
      const currentTime = new Date();
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
            const response = await KeyboardRatingService.httpClient.patch<IKeyboardRatingInfo>(
                'v1/KeyboardRating/UpdateKeyboardRating',
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
