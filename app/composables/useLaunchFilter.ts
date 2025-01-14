import { computed, ref } from 'vue'

export function useLaunchFilter(launches: any[]) {
  const selectedYear = ref('')
  const selectedSortOrder = ref('desc')
  const searchTerm = ref('')

  const filteredLaunches = computed(() => {
    const sortedLaunches = [...launches]

    const filteredByYear = selectedYear.value
      ? sortedLaunches.filter((launch) =>
          new Date(launch.launch_date_utc).getFullYear() === Number(selectedYear.value)
        )
      : sortedLaunches

    const filteredBySearch = filteredByYear.filter((launch) =>
      launch.mission_name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )

    return filteredBySearch.sort((a, b) => {
      const dateA = new Date(a.launch_date_utc).getTime()
      const dateB = new Date(b.launch_date_utc).getTime()

      if (selectedSortOrder.value === 'desc') {
        return dateB - dateA
      }
      return dateA - dateB
    })
  })

  const setSelectedYear = (year: string) => {
    selectedYear.value = year
  }

  const setSelectedSortOrder = (sortOrder: string) => {
    selectedSortOrder.value = sortOrder
  }

  const setSearchTerm = (term: string) => {
    searchTerm.value = term 
  }

  const clearSearchTerm = () => {
    searchTerm.value = '' 
  }

  return {
    selectedYear,
    selectedSortOrder,
    searchTerm,
    filteredLaunches,
    setSelectedYear,
    setSelectedSortOrder,
    setSearchTerm,
    clearSearchTerm,
  }
}
