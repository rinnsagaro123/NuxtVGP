<template>
  <v-container>
    <h2>Favorite Rockets</h2>

    <v-list v-if="favoriteRockets.length > 0">
      <v-list-item v-for="favorite in favoriteRockets" :key="favorite.id">
        <v-list-item-content>
          <v-list-item-title>{{ favorite.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ favorite.description }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-alert v-else color="transparent" border="1" class="pa-3">
      No favorite rockets available.
    </v-alert>

    <nuxt-link to="/rockets">
      <v-btn color="#673AB7" class="mt-4">Go Back to Rockets</v-btn>
    </nuxt-link>
  </v-container>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '~/stores/favorites';

const store = useFavoritesStore();
const favoriteRockets = store.getFavoriteRockets;
</script>
