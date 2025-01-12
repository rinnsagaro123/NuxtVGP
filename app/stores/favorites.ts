// stores/favorites.ts
import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favoriteRockets: [] as Array<{ id: string; name: string; description: string }>,
  }),

  actions: {
    addFavorite(rocket: { id: string; name: string; description: string }) {
      this.favoriteRockets.push(rocket);
    },

    removeFavorite(id: string) {
      this.favoriteRockets = this.favoriteRockets.filter(rocket => rocket.id !== id);
    },

    clearFavorites() {
      this.favoriteRockets = [];
    },
  },

  getters: {
    getFavoriteRockets() {
      return this.favoriteRockets;
    },
  },
});
