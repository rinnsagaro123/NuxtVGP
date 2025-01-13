<template>
    <div v-if="countdownVisible" class="countdown-container">
      <div class="countdown">
        <h3 class="countdown-text">Next Launch:</h3>
        <div class="countdown-timer">
          <span>{{ countdown.days }} Days</span>
          <span>{{ countdown.hours }} Hours</span>
          <span>{{ countdown.minutes }} Minutes</span>
          <span>{{ countdown.seconds }} Seconds</span>
        </div>
        <p class="launch-name">Launch: {{ launchName }}</p>
  
        <v-btn
          color="deep-purple lighten-2"
          @click="toggleCountdown"
          class="hide-btn"
        >
          Hide Countdown
        </v-btn>
      </div>
    </div>
  
    <div v-if="!countdownVisible" class="show-btn-container">
      <v-btn
        color="deep-purple lighten-2"
        @click="toggleCountdown"
        class="show-btn"
      >
        <v-icon>mdi-rocket</v-icon>
      </v-btn>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const launchTime = new Date('Mon Jan 13, 2025 23:08:00 GMT+0800') 
  const launchName = 'Starlink Group 12-4'
  
  const countdown = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  
  const countdownVisible = ref(true)
  

  const updateCountdown = () => {
    const now = new Date()
    const timeDifference = launchTime - now
  
    if (timeDifference > 0) {
      countdown.value.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      countdown.value.hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      countdown.value.minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
      countdown.value.seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)
    } else {
      countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
  }
  
  const toggleCountdown = () => {
    countdownVisible.value = !countdownVisible.value
  }
  
  onMounted(() => {
    updateCountdown()
    setInterval(updateCountdown, 1000)
  })
  </script>
  
  <style scoped>
  .countdown-container {
    position: fixed;
    top: 80px; 
    right: 20px; 
    z-index: 1000;
  }
  
  .countdown {
    padding: 10px 15px;
    border-radius: 8px;
    background-color: white;
    color: #673ab7;
    text-align: center;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.2);
  }
  
  .countdown-text {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .countdown-timer {
    font-size: 1.1rem;
    font-weight: 500;
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  
  .time-segment {
    background-color: #673ab7;
    padding: 5px 10px;
    border-radius: 5px;
  }
  
  .launch-name {
    margin-top: 10px;
    font-size: 1rem;
    font-weight: bold;
  }
  
  .hide-btn,
  .show-btn {
    margin-top: 10px;
  }
  
  .hide-btn {
    width: 100%; 
  }
  
  .show-btn-container {
    position: fixed;
    top: 80px; 
    right: 20px;
    z-index: 1001; 
  }
  
  .show-btn {
    width: 100%; 
  }
  </style>
  