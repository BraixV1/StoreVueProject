import type { IResultObject } from "@/types/IResultObject";
import type { IkeyboardBuildInfo } from "@/types/KeyboardBuild";
import httpCLient, { getDecodedAccessToken } from "@/http-client";
import { useAuthStore } from "@/stores/auth";
import AccountService from "./AccountService";



export default class KeyboardBuildService {
    constructor() {
    }



    private static httpClient = httpCLient

    static async getAll(): Promise<IResultObject<IkeyboardBuildInfo[]>> {

        try {

            const response = await KeyboardBuildService.httpClient.get<IkeyboardBuildInfo[]>('v1/KeyboardBuild/AllKeyboardBuilds');

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


    static async getSpecific(id: string): Promise<IResultObject<IkeyboardBuildInfo>> {
        try {
            const response = await KeyboardBuildService.httpClient.get<IkeyboardBuildInfo>(`v1/KeyboardBuild/GetKeyboardBuild/${id}`);
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

    static async getUserBuilds(): Promise<IResultObject<IkeyboardBuildInfo[]>> {
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
            const response = await KeyboardBuildService.httpClient.get<IkeyboardBuildInfo[]>(`v1/KeyboardBuild/GetUserKeyboardBuilds`, {headers: {'Authorization' : `Bearer ${authstore.jwt}`} } );
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


    static async Add(BuildName: string, Description: string): Promise<IResultObject<IkeyboardBuildInfo>>{
        const UpdateData = {
            BuildName: BuildName,
            Description: Description
        }
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
            const response = await KeyboardBuildService.httpClient.post<IkeyboardBuildInfo>('v1/KeyboardBuild/AddKeyboardBuild', UpdateData ,{headers: {'Authorization' : `Bearer ${authstore.jwt}`} });
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

    static async Delete(id: string): Promise<IResultObject<IkeyboardBuildInfo>> {
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
            const response = await KeyboardBuildService.httpClient.delete<IkeyboardBuildInfo>(`v1/KeyboardBuild/DeleteKeyboardBuild/${id}`, {headers: {'Authorization' : `Bearer ${authstore.jwt}`} });
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

    static async Update(id: string, BuildName: string, Description: string): Promise<IResultObject<IkeyboardBuildInfo>> {

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
            BuildName: BuildName,
            Description: Description
        }
        try {
            const response = await KeyboardBuildService.httpClient.patch<IkeyboardBuildInfo>('v1/KeyboardBuild/UpdateKeyboardBuild', UpdateData, {headers: {'Authorization' : `Bearer ${authstore.jwt}`} });
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