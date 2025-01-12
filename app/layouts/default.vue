<template>
	<v-app>
	  <v-main>
		<NuxtPage />
	  </v-main>
    <Navbar />
	  <Footer />
	</v-app>
  </template>
  
  <script setup>
  import Navbar from '~/components/Navbar.vue'
  import Footer from '~/components/Footer.vue'
  </script>
  
  <style>
.v-footer {
  height: 50px;
  box-shadow: 0px 16px 40px rgb(0, 0, 0), 0px 8px 20px rgba(149, 117, 205, 0.6); 

  position: relative;
  z-index: 10; 
  background-color: #fff; 
  margin-top: 20px; 
}

.v-footer:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

  </style>
  