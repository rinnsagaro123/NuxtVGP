import { ref, computed } from 'vue'

export const useRocketFilter = (rockets: any[]) => {
  const selectedYear = ref<number | null>(null)
  const selectedSortOrder = ref<'asc' | 'desc'>('desc') 

  const filteredRockets = computed(() => {
    let filtered = rockets

    if (selectedYear.value) {
      filtered = filtered.filter(launch => {
        const launchYear = new Date(launch.launch_date_utc).getFullYear()
        return launchYear === selectedYear.value
      })
    }

    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.launch_date_utc)
      const dateB = new Date(b.launch_date_utc)
      return selectedSortOrder.value === 'asc' ? dateA - dateB : dateB - dateA
    })

    return filtered
  })

  const setSelectedYear = (year: number | null) => {
    selectedYear.value = year
  }

  const setSelectedSortOrder = (order: 'asc' | 'desc') => {
    selectedSortOrder.value = order
  }

  return {
    selectedYear,
    selectedSortOrder,
    filteredRockets,
    setSelectedYear,
    setSelectedSortOrder
  }
}

