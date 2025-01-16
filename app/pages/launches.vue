<template>
  <v-container>
    <h1>SpaceX Launches</h1>

    <!-- Loading Spinner -->
    <div v-if="loading" class="d-flex justify-center align-center" style="height: 100vh;">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>

    <!-- Content -->
    <div v-else>
      <v-container>
        <v-row>
          <v-col cols="12" sm="4" md="4">
            <v-text-field
              v-model="searchTerm"
              label="Search Launches"
              prepend-inner-icon="mdi-magnify"
              append-inner-icon="mdi-close-circle"
              dense
              class="mb-4"
              @click:append-inner="clearSearchTerm"
              @input="setSearchTerm(searchTerm)"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="selectedYear"
              :items="yearOptions"
              label="Filter by Year"
              @change="setSelectedYear"
              dense
              outlined
            ></v-select>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="selectedSortOrder"
              :items="['asc', 'desc']"
              label="Sort by Launch Date"
              @change="setSelectedSortOrder"
              dense
              outlined
            ></v-select>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-row>
          <v-col
            v-for="(launch, index) in paginatedLaunches"
            :key="launch.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card outlined class="elevation-6">
              <template v-if="launch.links?.flickr_images?.[0]">
                <v-img
                  :src="launch.links.flickr_images[0]"
                  height="200px"
                  contain
                ></v-img>
              </template>
              <template v-else>
                <div
                  style="display: flex; justify-content: center; align-items: center; height: 200px; background-color: #f0f0f0; color: #888; font-size: 14px;"
                >
                  No Image Available
                </div>
              </template>
              <v-card-title class="text-h6">
                {{ launch.mission_name || 'No mission name' }}
              </v-card-title>

              <v-card-subtitle>
                Launch Date: {{ new Date(launch.launch_date_utc).toLocaleDateString() }}
              </v-card-subtitle>

              <v-card-text>
                <p>
                  <strong>Launch Site:</strong> {{ launch.launch_site?.site_name_long || 'No site information' }}
                </p>
                <p>
                  <strong>Rocket:</strong> {{ launch.rocket?.rocket_name || 'No rocket information' }}
                </p>
                <p>
                  <strong>Details:</strong>
                  <span v-if="!expandedCards[index]">
                    {{ truncatedDescription(launch.details) }}
                    <span @click="toggleDetails(index)" class="see-more-link">See More</span>
                  </span>
                  <span v-else>
                    {{ launch.details || placeholderDetails }}
                    <span @click="toggleDetails(index)" class="see-more-link">See Less</span>
                  </span>
                </p>
              </v-card-text>

              <v-card-actions>
                <nuxt-link
                  :to="`/rocket/${launch.rocket?.rocket?.id}`"
                  v-if="launch.rocket?.rocket?.id"
                >
                <v-btn text small color="#673AB7">View Rocket Details</v-btn>
                </nuxt-link>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Pagination Controls -->
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="5"
        @input="paginate"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { useLaunchFilter } from '~/composables/useLaunchFilter'

const query = gql`
  query getLaunches {
    launches {
      id
      mission_name
      launch_date_utc
      launch_site {
        site_name_long
      }
      links {
        flickr_images
      }
      rocket {
        rocket {
          id
        }
        rocket_name
      }
      details
    }
  }
`

const { data, error, loading } = useAsyncQuery<{
  launches: {
    id: string
    mission_name: string
    launch_date_utc: string
    launch_site: {
      site_name_long: string | null
    } | null
    links: {
      flickr_images: string | null
    }
    rocket: {
      rocket: {
        id: string
      }
      rocket_name: string | null
    } | null
    details?: string | null
  }[] 
}>(query)

const launches = computed(() => data.value?.launches ?? [])
const { selectedYear, selectedSortOrder, filteredLaunches, setSelectedYear, setSelectedSortOrder, setSearchTerm, clearSearchTerm } = useLaunchFilter(launches.value)

const yearOptions = computed(() => {
  const years = launches.value.map(launch => new Date(launch.launch_date_utc).getFullYear())
  return [...new Set(years)].sort((a, b) => b - a)
})

const expandedCards = ref<boolean[]>([])

const placeholderDetails = 'No details available. More information about this launch will be updated soon.'

const currentPage = ref(1)
const perPage = 6
const totalPages = computed(() => Math.ceil(filteredLaunches.value.length / perPage))

const paginatedLaunches = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredLaunches.value.slice(start, start + perPage)
})

function truncatedDescription(description: string | null): string {
  if (!description) return placeholderDetails.slice(0, 100)
  return description.length > 100 ? `${description.slice(0, 100)}...` : description
}

function toggleDetails(index: number): void {
  expandedCards.value[index] = !expandedCards.value[index]
}

function paginate(page: number): void {
  currentPage.value = page
}
</script>

<style scoped>
.v-card-text {
  transition: height 0.3s ease, overflow 0.3s ease;
}
.v-btn.small {
  font-size: 12px;
  padding: 2px 6px;
  min-height: 24px;
  min-width: 24px;
  border-radius: 12px;
}
.see-more-link {
  color: #673AB7;
  cursor: pointer;
  text-decoration: none;
}
.see-more-link:hover {
  text-decoration: underline;
}
</style>
