<script setup lang="ts">
import AccountService from '@/services/AccountService';
import { ref } from 'vue';
import router from '../../router/index';



let loginEmail = ref('');
let loginPassword = ref('');


let errors = ref<string[]>([]);

const doLogin = async () => {
    const res = await AccountService.login(loginEmail.value, loginPassword.value);

    if (res.data) {
        router.back();
    } else {
        errors.value = res.errors!;
    }
    
}

</script>

<template>
    <div>
        <main>
          <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
              <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
              <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div v-if="errors.length > 0" role="alert" class="rounded border-s-4 border-red-500 bg-red-50 p-4">
                <div class="flex items-center gap-2 text-red-800">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                    <path
                      fill-rule="evenodd"
                      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
              
                  <strong class="block font-medium"> Something went wrong </strong>
                </div>
              
                <p class="mt-2 text-sm text-red-700">
                  {{ errors.join(',') }}
                </p>
            </div>
              <form class="space-y-6" action="#" method="POST">
                <div>
                  <label htmlFor="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                  <div class="mt-2">
                    <input 
                      value={email}
                      v-model="loginEmail"
                      id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
    
                <div>
                  <div class="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="text-sm">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div>
                  </div>
                  <div class="mt-2">
                    <input 
                      v-model="loginPassword"
                      id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
    
                <div>
                  <button type="button" @click.prevent="doLogin" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
              </form>
              <p class="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <router-link to="Register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</router-link>
              </p>
            </div>
          </div>
        </main>
      </div>

</template>

