<template>
	<v-container
	  class="landing-page d-flex flex-row align-center justify-between text-left"
	  style="min-height: 100vh; display: flex; flex-direction: row; justify-content: space-between; align-items: center; position: relative; overflow: hidden;"
	>
	  <div class="content-left z-1">
		<h1 class="display-1 text-deep-purple large">THE</h1>
		<h1 class="display-2 text-deep-purple large">APOLLO SYSTEM</h1>
		<p class="description">
		  Explore the latest innovations in space exploration, view detailed launch data, and track upcoming SpaceX missions in real-time. With the power of GraphQL, you can easily access precise information about rockets, launches, and more!
		</p>
		<v-btn color="deep-purple lighten-2" large to="/launches"  target="_blank">
		  Start with Launches
		</v-btn>
	  </div>
  
	  <v-img
		src="spaceship.png"
		alt="Spaceship Image"
		class="background-image"
		contain
		position="center center"
	  ></v-img>
	</v-container>
  </template>
  
  <script lang="ts" setup>
  </script>
  
  <style scoped>
  .landing-page {
    position: relative;
    overflow: hidden;
  }

  .content-left {
    z-index: 1;
    max-width: 50%;
    padding-right: 20px; 
  }

  .background-image {
    position: absolute;
    top: -50px;
    right: 0;
    bottom: 0;
    z-index: 0;
    width: 80%; 
    height: 100%;
  }

  .landing-page .v-img {
    height: 100%;
  }

  h1 {
    font-size: 3rem; 
    font-weight: bold;
    line-height: 1.1;
  }

  h2 {
    font-size: 2.5rem; 
    font-weight: normal;
    margin-bottom: 20px;
  }

  .description {
    font-size: 1.10rem;
    font-weight: 300;
    color: #555;
    margin-bottom: 30px;
    line-height: 1.6;
    max-width: 100%;
    text-align: justify; 
  }

  .elegant-btn {
    font-size: 1.25rem; 
    padding: 20px 40px; 
    border-radius: 50px; 
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  }

  .elegant-btn:hover {
    background-color: #673ab7; 
    transform: scale(1.05); 
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2); 
  }

  h1, h2, .description, .elegant-btn {
    z-index: 1;
  }

  .display-2 {
    font-size: 3rem; 
    font-weight: bold;
    line-height: 1.1;
    white-space: normal; 
    overflow: visible; 
  }


  @media (max-width: 768px) {
    .landing-page {
      flex-direction: column; 
      text-align: center; 
    }

    .content-left {
      max-width: 100%; 
      padding: 20px; 
    }

    h1 {
      font-size: 2rem; 
    }

    h2 {
      font-size: 1.75rem; 
    }

    .description {
      font-size: 1rem; 
      max-width: 100%; 
    }

    .elegant-btn {
      font-size: 1rem; 
      padding: 15px 30px; 
    }

    .background-image {
      width: 100%; 
      top: -200px; 
    }

   
    .display-2 {
      font-size: 2.25rem; 
    }
  }
</style>

  
  