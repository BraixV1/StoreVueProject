import type { IResultObject } from "@/types/IResultObject";
import type { IKeyboardPartInfo } from '../types/KeyboardPart';
import httpCLient, { getDecodedAccessToken } from "@/http-client";
import { useAuthStore } from "@/stores/auth";
import AccountService from "./AccountService";



export default class KeyboardPartService {
    constructor() {
    }



    private static httpClient = httpCLient

    static async getAll(): Promise<IResultObject<IKeyboardPartInfo[]>> {

        try {

            const response = await KeyboardPartService.httpClient.get<IKeyboardPartInfo[]>('v1/KeyboardPart/AllKeyboardParts');

            if (response.status < 300) {
                return {
                    data: response.data
                };
            } else {
                return {
                    errors: [response.status.toString() + " " + response.statusText]
                };
            }

        }
        catch (error: any) {
            if (error.response) {
                return {
                    errors: [error.response.data.status + " " + error.response.data.error]
                };
            } else {
                return {
                    errors: ["An error occurred: " + error.message]
                };
            }
        }
    }


    static async getSpecific(id: string): Promise<IResultObject<IKeyboardPartInfo>> {
        try {
            const response = await KeyboardPartService.httpClient.get<IKeyboardPartInfo>(`v1/KeyboardPart/GetKeyboardPart/${id}`);
        if (response.status < 300) {
                return {
                    data: response.data
                };
            }
            else {
                return {
                    errors: ["An error occurred: " + Error]
                };
            }
        } catch (error: any) {
            if (error.response) {
                return {
                    errors: [error.response.data.status + " " + error.response.data.error]
                };
            } else {
                return {
                    errors: ["An error occurred: " + error.message]
                };
            }
        }
    }

    static async AddKeyboardPart(keyboardId: string, partId: string): Promise<IResultObject<IKeyboardPartInfo>>{
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
            keyboardId: keyboardId,
            partId: partId,
        }
        try {
            const response = await KeyboardPartService.httpClient.post<IKeyboardPartInfo>('v1/KeyboardPart/AddKeyboardPart', UpdateData ,{headers: {'Authorization' : `Bearer ${authstore.jwt}`} });
        if (response.status < 300) {
                return {
                    data: response.data
                };
            }
            else {
                return {
                    errors: ["An error occurred: " + Error]
                };
            }
        } catch (error: any) {
            if (error.response) {
                return {
                    errors: [error.response.data.status + " " + error.response.data.error]
                };
            } else {
                return {
                    errors: ["An error occurred: " + error.message]
                };
            }
        }
    }

    static async DeleteKeyboardPart(id: string): Promise<IResultObject<IKeyboardPartInfo>> {
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
            const response = await KeyboardPartService.httpClient.delete<IKeyboardPartInfo>(`v1/KeyboardPart/DeleteKeyboardPart/${id}`, {headers: {'Authorization' : `Bearer ${authstore.jwt}`} });
        if (response.status < 300) {
                return {
                    data: response.data
                };
            }
            else {
                return {
                    errors: ["An error occurred: " + Error]
                };
            }
        } catch (error: any) {
            if (error.response) {
                return {
                    errors: [error.response.data.status + " " + error.response.data.error]
                };
            } else {
                return {
                    errors: ["An error occurred: " + error.message]
                };
            }
        }
    }

    static async UpdateKeyboardPart(id: string, keyboardId: string, partId: string): Promise<IResultObject<IKeyboardPartInfo>> {
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
            keyboardId: keyboardId,
            partId: partId,
        }
        try {
            const response = await KeyboardPartService.httpClient.patch<IKeyboardPartInfo>('v1/KeyboardPart/UpdateKeyboardPart', UpdateData, {headers: {'Authorization' : `Bearer ${authstore.jwt}`} });
        if (response.status < 300) {
                return {
                    data: response.data
                };
            }
            else {
                return {
                    errors: ["An error occurred: " + Error]
                };
            }
        } catch (error: any) {
            if (error.response) {
                return {
                    errors: [error.response.data.status + " " + error.response.data.error]
                };
            } else {
                return {
                    errors: ["An error occurred: " + error.message]
                };
            }
        }
    }


}