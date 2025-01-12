<template>
    <v-container>
      <h2>
        <v-icon icon="mdi-rocket" />
        Rockets
      </h2>
      <h5>List of Rockets</h5>
  
      <!-- Rocket List Table -->
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Description</th>
            <th class="text-left">First Flight Date</th>
            <th class="text-left">Height</th>
            <th class="text-left">Diameter</th>
            <th class="text-left">Mass</th>
            <th class="text-left">Stages</th>
            <th class="text-left">Favorites</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rocket in rockets" :key="rocket.id">
            <td>{{ rocket.name }}</td>
            <td>{{ rocket.description }}</td>
            <td>{{ rocket.first_flight }}</td>
            <td>{{ rocket.height.meters }} meters ({{ rocket.height.feet }} feet)</td>
            <td>{{ rocket.diameter.meters }} meters ({{ rocket.diameter.feet }} feet)</td>
            <td>{{ rocket.mass.kg }} kg ({{ rocket.mass.lb }} lb)</td>
            <td>{{ rocket.stages }}</td>
            <td>
              <v-btn @click="toggleFavorite(rocket)">
                {{ isFavorite(rocket) ? 'Remove from Favorites' : 'Add to Favorites' }}
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </template>
  
  <script lang="ts" setup>
  import { computed } from 'vue';
  import { useFavoritesStore } from '~/stores/favorites';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  
  const store = useFavoritesStore();
  

  const query = gql`
    query getRockets {
      rockets {
        id
        name
        description
        first_flight
        height {
          feet
          meters
        }
        diameter {
          feet
          meters
        }
        mass {
          kg
          lb
        }
        stages
      }
    }
  `;
  
  const { data } = useAsyncQuery<{
    rockets: {
      id: string;
      name: string;
      description: string;
      first_flight: string;
      height: {
        feet: number;
        meters: number;
      };
      diameter: {
        feet: number;
        meters: number;
      };
      mass: {
        kg: number;
        lb: number;
      };
      stages: number;
    }[];
  }>(query);
  
  const rockets = computed(() => data.value?.rockets ?? []);
  
  const favoriteRockets = computed(() => store.favoriteRockets);
  
  function isFavorite(rocket: { id: string }) {
    return favoriteRockets.value.some((fav) => fav.id === rocket.id);
  }
  
  function toggleFavorite(rocket: { id: string; name: string; description: string }) {
    if (isFavorite(rocket)) {
      store.removeFavorite(rocket.id);
    } else {
      store.addFavorite({
        id: rocket.id,
        name: rocket.name,
        description: rocket.description,
      });
    }
    router.push('/favorites');
  }

  </script>
  
