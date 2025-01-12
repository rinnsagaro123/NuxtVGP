<template>
	<v-container>
	  <h2>
		<v-icon icon="mdi-rocket" />
		SpaceApollo Project
	  </h2>
	  <h5>Explore Rockets and Launches Powered by SpaceX GraphQL API</h5>
	  
  
  
	  <h3 class="my-5">
		SpaceX Ships
		<v-chip color="orange">Data from SpaceX GraphQL</v-chip>
	  </h3>
	  <p>There are {{ ships?.length || 0 }} ships available:</p>
	  <v-table>
		<thead>
		  <tr>
			<th class="text-left">Name</th>
			<th class="text-left">Active Status</th>
		  </tr>
		</thead>
		<tbody>
		  <tr v-for="ship in ships" :key="ship.id">
			<td>{{ ship.name }}</td>
			<td>
			  <v-chip :color="ship.active ? 'green' : 'red'">
				{{ ship.active ? 'Active' : 'Inactive' }}
			  </v-chip>
			</td>
		  </tr>
		</tbody>
	  </v-table>
	  <!-- <v-btn color="deep-purple lighten-2" to="/">Back to Home</v-btn> -->
	</v-container>
	
  </template>
  
  <script lang="ts" setup>
 
  const query = gql`
	query getShips {
	  ships {
		id
		name
		active
	  }
	}
  `

  const { data } = useAsyncQuery<{
	ships: {
	  id: string
	  name: string
	  active: boolean
	}[]
  }>(query)
  
  const ships = computed(() => data.value?.ships ?? [])
  </script>
  

  