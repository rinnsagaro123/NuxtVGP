<template>
  <v-app>
    <v-main>
      <NuxtPage />
      <Countdown />
    </v-main>
    <Navbar />
    <Footer />
  </v-app>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
import Countdown from '~/components/Countdown.vue'  
</script>
