import type { IUserInfo } from '@/types/IUserInfo'
import type { IResultObject } from '@/types/IResultObject'
import httpCLient from '@/http-client'
import { useAuthStore } from '@/stores/auth';

export default class AccountService {
  private constructor() {
    
  }

  private static httpClient = httpCLient

  static async login(email: string, pwd: string): Promise<IResultObject<IUserInfo>> {
    const loginData = {
      email: email,
      password: pwd
    }
    try {
      const response = await AccountService.httpClient.post<IUserInfo>('v1/Authentication/Login', loginData)
      const userData = useAuthStore();
      if (response.status < 300) {
        userData.email = response.data.email;
        userData.firstName = response.data.firstName;
        userData.lastName = response.data.lastName;
        userData.jwt = response.data.jwt;
        userData.refreshToken = response.data.refreshToken;
        userData.roles = response.data.roles;
        userData.id = response.data.userId;
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

  static async register(
    email: string,
    pwd: string,
    firstName: string,
    lastName: string
  ): Promise<IResultObject<IUserInfo>> {
    const RegisterData = {
      email: email,
      password: pwd,
      firstName: firstName,
      lastName: lastName
    }
    try {
      const response = await AccountService.httpClient.post<IUserInfo>('v1/Authentication/Register', RegisterData)
      const userData = useAuthStore();

      if (response.status < 300) {
        userData.email = response.data.email;
        userData.firstName = response.data.firstName;
        userData.lastName = response.data.lastName;
        userData.jwt = response.data.jwt;
        userData.refreshToken = response.data.refreshToken;
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

  static async RefreshJWt(): Promise<IResultObject<IUserInfo>> {
    const userData = useAuthStore();
    if (!userData.jwt || !userData.refreshToken) {
      return { errors: ['JWT or RefreshToken is missing'] };
    }
    const TokenRefreshInfo = {
      Jwt: userData.jwt,
      RefreshToken: userData.refreshToken
    }
    try {
      const response = await AccountService.httpClient.patch<IUserInfo>(
        'v1/Authentication/RefreshJwt',
        TokenRefreshInfo,
        { headers: { Authorization: `Bearer ${userData.jwt}` } }
      )

      if (response.status < 300) {
        userData.jwt = response.data.jwt;
        userData.refreshToken = response.data.refreshToken;
        return {
          data: response.data
        }
      } else {
        userData.clearAuthData();
        return {
          errors: ['An error occurred: ' + Error]
        }
      }
    } catch (error: any) {
      userData.clearAuthData();
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

  static async Logout(): Promise<IResultObject<void>> {
    const authStore = useAuthStore();
    const logoutInfo = {
      RefreshToken: authStore.refreshToken
    }
    try {
      const response = await AccountService.httpClient.patch<IUserInfo>('v1/Authentication/LogOut', logoutInfo, {
        headers: { Authorization: `Bearer ${authStore.jwt}` }
      })
      console.log(response.status)

      if (response.status < 300) {
        authStore.clearAuthData()
        return {}
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
