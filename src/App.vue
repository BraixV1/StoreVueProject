<script setup lang="ts">
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

</script>

<template>

    <Header />

        <main>
            <section class="min-h-screen">
              <router-view />
            </section>
        </main>

    <Footer class="z-1" />
</template>

<style scoped></style>
