<template>
  <v-container>
    <h1>SpaceX Launches</h1>

    <div>
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
  <v-row class="my-4 justify-end align-center">
    <v-col cols="auto" class="d-flex align-center">
      <span> Items per Page:  </span>
      <v-select
        v-model="itemsPerPage"
        :items="[10, 25, 50, 100, 'All']"
        @change="setItemsPerPage"
        dense
        outlined
        hide-details
        style="max-width: 150px; font-size: 10px;"
      ></v-select>
    </v-col>

    <v-col cols="auto" class="d-flex align-center">
      <span style="font-size: 15px; margin-right: 16px;">
        {{ paginationSummary }}
      </span>
    </v-col>

    <v-col cols="auto" class="d-flex align-center">
      <v-btn @click="goToStart" :disabled="pagination.page === 1" text small>
        <span class="mdi mdi-chevron-double-left small-icon"></span> <!-- |< -->
      </v-btn>
      <v-btn @click="goToPrev" :disabled="pagination.page === 1" text small>
        <span class="mdi mdi-chevron-left small-icon"></span> <!-- < -->
      </v-btn>
      <v-btn @click="goToNext" :disabled="pagination.page === totalPages" text small>
        <span class="mdi mdi-chevron-right small-icon"></span> <!-- > -->
      </v-btn>
      <v-btn @click="goToEnd" :disabled="pagination.page === totalPages" text small>
        <span class="mdi mdi-chevron-double-right small-icon"></span> <!-- >| -->
      </v-btn>
    </v-col>




  </v-row>
</v-container>
      <v-responsive>
        <v-data-table
          :items="paginatedLaunches"
          :headers="tableHeaders"
          :items-per-page="itemsPerPage === 'All' ? filteredLaunches.length : itemsPerPage"
          class="mt-5"
          dense
        >
          <template #item.number="{ index }">
            {{ (pagination.page - 1) * (itemsPerPage === 'All' ? filteredLaunches.length : itemsPerPage) + index + 1 }}
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
const { selectedYear, selectedSortOrder, filteredLaunches, setSelectedYear, setSelectedSortOrder, setSearchTerm, clearSearchTerm } = useLaunchFilter(launches.value)

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

const itemsPerPage = ref('All')  // Default: Show all
const pagination = ref({ page: 1 })

const totalPages = computed(() => {
  const count = filteredLaunches.value.length
  return Math.ceil(count / (itemsPerPage.value === 'All' ? count : itemsPerPage.value))
})

const paginationSummary = computed(() => {
  const totalItems = filteredLaunches.value.length
  const startItem = (pagination.value.page - 1) * (itemsPerPage.value === 'All' ? totalItems : itemsPerPage.value) + 1
  const endItem = Math.min(startItem + (itemsPerPage.value === 'All' ? totalItems : itemsPerPage.value) - 1, totalItems)

  return `${startItem}-${endItem} of ${totalItems}`
})

const paginatedLaunches = computed(() => {
  const startIndex = (pagination.value.page - 1) * (itemsPerPage.value === 'All' ? filteredLaunches.value.length : itemsPerPage.value)
  const endIndex = startIndex + (itemsPerPage.value === 'All' ? filteredLaunches.value.length : itemsPerPage.value)
  return filteredLaunches.value.slice(startIndex, endIndex)
})

function setItemsPerPage(value: number | 'All') {
  itemsPerPage.value = value
  pagination.value.page = 1
}

function goToStart() {
  pagination.value.page = 1
}

function goToPrev() {
  if (pagination.value.page > 1) pagination.value.page -= 1
}

function goToNext() {
  if (pagination.value.page < totalPages.value) pagination.value.page += 1
}

function goToEnd() {
  pagination.value.page = totalPages.value
}
</script>

<style scoped>
.v-btn.small {
  font-size: 12px; 
  padding: 2px 6px;
  min-height: 24px; 
  min-width: 24px;
  border-radius: 12px; 
}

.small-icon {
  font-size: 16px; 
}


</style>
