<script lang="ts" setup>
import { useFavoritesStore } from '~/stores/favorites'
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useFavoritesStore()
const route = useRoute();
const rocketId = route.params.id as string;

console.log("Rocket ID (route param):", rocketId);

const query = gql`
  query Rocket($rocketId: ID!) {
    rocket(id: $rocketId) {
      name
      description
      first_flight
      height {
        meters
        feet
      }
      diameter {
        meters
        feet
      }
      mass {
        kg
        lb
      }
      stages
    }
  }
`;

const variables = { rocketId }

const { data } = useAsyncQuery<{
  rocket: {
    name: string;
    description: string;
    first_flight: string;
    height: {
      meters: number;
      feet: number;
    };
    diameter: {
      meters: number;
      feet: number;
    };
    mass: {
      kg: number;
      lb: number;
    };
    stages: number;
  };
}>(query, variables);

// const rocket = computed(() => data.value?.rocket ?? {});
console.log("Result:", data.value);

const rocket = computed(() => { 
  if (data.value && data.value.rocket) { 
    return data.value.rocket; 
  } else { return { name: '', description: '', first_flight: '', height: { meters: 0, feet: 0 }, diameter: { meters: 0, feet: 0 }, mass: { kg: 0, lb: 0 }, stages: 0, }; } });
  
const isFavorite = computed(() => {
  return store.favoriteRockets.some(fav => fav.id === rocket.value.id)
})

function toggleFavorite() {
  if (isFavorite.value) {
    store.removeFavorite(rocket.value.id);
  } else {
    store.addFavorite({
      id: rocket.value.id,
      name: rocket.value.name,
      description: rocket.value.description,
    });
  }

  router.push('/favorites');
}

</script>

<template>
  <v-container>
    <v-btn color="deep-purple lighten-2" @click="toggleFavorite">
      {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
    </v-btn>
    <v-card>
      <v-card-title class="text-h5">{{ rocket.name }}</v-card-title>
      <v-card-subtitle class="text-truncate">
  {{ rocket.description }}
</v-card-subtitle>
      <v-card-text>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>First Flight: {{ rocket.first_flight }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Height: {{ rocket.height.meters }} meters / {{ rocket.height.feet }} feet</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Diameter: {{ rocket.diameter.meters }} meters / {{ rocket.diameter.feet }} feet</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Mass: {{ rocket.mass.kg }} kg / {{ rocket.mass.lb }} lb</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Stages: {{ rocket.stages }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>


<style scoped>
.truncate-description {
  display: -webkit-box;      
  -webkit-box-orient: vertical; 
  overflow: hidden;          
  text-overflow: ellipsis;   
  -webkit-line-clamp: 2;     
  max-width: 100%;           
}
</style>