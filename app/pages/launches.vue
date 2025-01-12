<template>
  <v-container>
    <h1>SpaceX Launches</h1>

    <div>
      <v-container>
        <v-row>
          <!-- Search Input -->
          <v-col cols="12" sm="4" md="4">
            <v-text-field
              v-model="searchTerm"
              label="Search Launches"
              prepend-icon="mdi-magnify"
              clearable
              dense
              class="mb-4"
              @input="setSearchTerm(searchTerm)"
            ></v-text-field>
          </v-col>

          <!-- Year Filter -->
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

          <!-- Sort Order Dropdown -->
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

      <v-responsive>
        <v-data-table
          :items="filteredLaunches"
          :headers="tableHeaders"
          :items-per-page="10"
          class="mt-5"
          dense
        >
          <template #item.number="{ index }">
            {{ index + 1 }}
          </template>
          <template #item.launch_site="{ item }">
            {{ item.launch_site?.site_name_long || 'No site information available' }}
          </template>
          <template #item.rocket="{ item }">
            <nuxt-link :to="`/rocket/${item.rocket?.rocket?.id}`">
              {{ item.rocket?.rocket_name || 'No rocket information available' }}
            </nuxt-link>
          </template>
          <template #item.details="{ item }">
            {{ item.details || 'No details available' }}
          </template>
        </v-data-table>
      </v-responsive>
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

const { data, error } = useAsyncQuery<{
  launches: {
    id: string
    mission_name: string
    launch_date_utc: string
    launch_site: {
      site_name_long: string | null
    } | null
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
const { selectedYear, selectedSortOrder, filteredLaunches, setSelectedYear, setSelectedSortOrder, setSearchTerm } = useLaunchFilter(launches.value)

const tableHeaders = [
  { title: '#', key: 'number', width: 50 },
  { title: 'Mission Name', key: 'mission_name' },
  { title: 'Launch Date', key: 'launch_date_utc' },
  { title: 'Launch Site', key: 'launch_site' },
  { title: 'Rocket', key: 'rocket' },
  { title: 'Details', key: 'details' },
]

const yearOptions = computed(() => {
  const years = launches.value.map(launch => new Date(launch.launch_date_utc).getFullYear())
  return [...new Set(years)].sort((a, b) => b - a)
})
</script>
