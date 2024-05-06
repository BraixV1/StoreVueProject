import type { stringOrNull, stringListorNull} from "@/types/types";
import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useAuthStore = defineStore('auth', () => {
  // Ref variables with initial values from local storage
  const jwt = ref<stringOrNull>(JSON.parse(localStorage.getItem('auth.jwt') || 'null'));
  const refreshToken = ref<stringOrNull>(JSON.parse(localStorage.getItem('auth.refreshToken') || 'null'));
  const firstName = ref<stringOrNull>(JSON.parse(localStorage.getItem('auth.firstName') || 'null'));
  const lastName = ref<stringOrNull>(JSON.parse(localStorage.getItem('auth.lastName') || 'null'));
  const roles = ref<stringListorNull>(JSON.parse(localStorage.getItem('auth.roles') || 'null'));
  const email = ref<stringOrNull>(JSON.parse(localStorage.getItem('auth.email') || 'null'));
  const id = ref<stringOrNull>(JSON.parse(localStorage.getItem('auth.id') || 'null'));

  // Computed getter for authentication status
  const isAuthenticated = computed<boolean>(() => !!jwt.value)

  const isAdmin = computed<boolean>( () => !!roles.value?.includes('Admin'))

  watch(
    [jwt, refreshToken, firstName, lastName, roles, email, id],
    ([newJwt, newRefreshToken, newFirstName, newLastName, newRoles, newEmail, newId]) => {
      localStorage.setItem('auth.jwt', JSON.stringify(newJwt))
      localStorage.setItem('auth.refreshToken', JSON.stringify(newRefreshToken))
      localStorage.setItem('auth.firstName', JSON.stringify(newFirstName))
      localStorage.setItem('auth.lastName', JSON.stringify(newLastName))
      localStorage.setItem('auth.roles', JSON.stringify(newRoles));
      localStorage.setItem('auth.email', JSON.stringify(newEmail))
      localStorage.setItem('auth.id', JSON.stringify(newId))
    },
    { deep: true }
  )
  


  // Function to update auth data
  function updateAuthData(newJwt: string, newRefreshToken: string, newUserData: { firstName?: string; lastName?: string; roles?: string[], email?: string, id?: string }) {
    jwt.value = newJwt
    refreshToken.value = newRefreshToken
    firstName.value = newUserData.firstName || firstName.value
    lastName.value = newUserData.lastName || lastName.value
    roles.value = newUserData.roles || roles.value
    email.value = newUserData.email || email.value
    id.value = newUserData.id || id.value
  }

  // Function to clear auth data
  function clearAuthData() {
    jwt.value = null
    refreshToken.value = null
    firstName.value = null
    lastName.value = null
    roles.value = null
    email.value = null
    id.value = null
    localStorage.removeItem('auth.jwt');
    localStorage.removeItem('auth.refreshToken');
    localStorage.removeItem('auth.firstName');
    localStorage.removeItem('auth.lastName');
    localStorage.removeItem('auth.roles');
    localStorage.removeItem('auth.email');
    localStorage.removeItem('auth.id');
  }

  return { jwt, refreshToken, firstName, lastName, roles, email, id, isAuthenticated, isAdmin, updateAuthData, clearAuthData }
})
