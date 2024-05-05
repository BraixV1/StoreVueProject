<script setup lang="ts">
</script>


<template>
    <section class="h-screen flex justify-center items-center">
      <div class="border border-blue-300 bg-gray-300 shadow rounded-md p-4 max-w-sm w-full">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-gray-400 h-10 w-10"></div>
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-gray-400 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-gray-400 rounded col-span-2"></div>
                <div class="h-2 bg-gray-400 rounded col-span-1"></div>
              </div>
              <div class="h-2 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>