<script setup lang="ts">
</script>



<template>    
    <section
      class="animate-fade-right animate-once animate-duration-800 animate-delay-200 animate-ease-in h-screen max-h-screen/3 overflow-auto relative bg-[url(https://images.pexels.com/photos/841228/pexels-photo-841228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] bg-cover bg-center bg-no-repeat"
    >
      <div
        class="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r"
      ></div>
    
      <div
        class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
      >
        <div class="max-w-xl text-left ltr:sm:text-left">
          <h1 class="text-3xl font-extrabold sm:text-5xl text-white">
            Build your own
    
            <strong class="block font-extrabold text-indigo-700"> Keyboard </strong>
          </h1>
    
          <p class="mt-4 max-w-lg sm:text-xl/relaxed text-white">
            Buy keyboard that fits your needs or build it with our builder sandbox tool
          </p>
    
          <div class="mt-8 flex flex-wrap gap-4 text-center">
            <router-link
              to="/KeyboardBuilder/BuilderStartPage"
              class="block w-full rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring active:bg-indigo-500 sm:w-auto"
            >
              Start Building
            </router-link>
    
            <a
              href="#"
              class="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-indigo-600 shadow hover:text-indigo-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  </template>