  <template>
    <v-app-bar
      app
      color="white"
      dark
      class="floating-navbar"
      dense
      :style="appBarStyle"
    >
      <v-container
        class="d-flex align-center ml-8"
        fluid
        @click="$router.push('/')"
        style="cursor: pointer;"
      >
        <v-img
          src="/logo2.png"
          max-width="50"
          class="mr-0.5"
          alt="Logo"
        />
        <v-img
          src="/logo4.png"
          max-width="110"
          class="mr-0.5"
          alt="Logo"
        />
      </v-container>

      <v-spacer />

      <!-- Desktop Navigation buttons -->
      <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text to="/" class="white--text lowercase">Home</v-btn>
      <v-btn text to="/ships" class="white--text lowercase">Ships</v-btn>
      <v-btn text to="/rockets" class="white--text lowercase">Rockets</v-btn>
      <v-btn text to="/launches" class="white--text lowercase">Launches</v-btn>
      <v-btn text to="/favorites" class="white--text lowercase">Favorites</v-btn>
    </v-toolbar-items>

      <!-- Mobile Menu Button -->
      <v-toolbar-items class="hidden-md-and-up">
        <v-btn icon @click="drawer = !drawer">
          <v-icon class="white--text">mdi-menu</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app temporary class="violet-sidebar">
      <v-list>
        <v-list-item v-for="(item, index) in menuItems" :key="index" @click="$router.push(item.link)">
          <v-list-item-title class="white--text-mobile">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </template>

  <script setup>
  import { ref } from 'vue';

  const menuItems = ref([
    { title: 'Home', link: '/' },
    { title: 'Ships', link: '/ships' },
    { title: 'Rockets', link: '/rockets' },
    { title: 'Launches', link: '/launches' },
    { title: 'Favorites', link: '/favorites' },
  ]);
  const appBarStyle = ref({
    maxWidth: '100%',
    zIndex: 1006, 
  });


  const drawer = ref(false);
  </script>

  <style scoped>

 .white--text-mobile {
  color: #fff !important;
 }
  .white--text {
    color: #673AB7 !important;
  }

  .violet-sidebar {
    background-color: #673AB7 !important;
  }
  
  .floating-navbar {
    position: relative;
  }

  .lowercase {
    text-transform: capitalize !important;
  } 
  .v-btn.capitalize .v-btn__content {
    text-transform: capitalize !important;
  }
  </style>
