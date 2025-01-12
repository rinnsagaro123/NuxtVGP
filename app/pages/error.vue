<template>
  <div v-if="error && error.statusCode === 404">
    <p>Page not found. Redirecting...</p>
  </div>
</template>

<script setup>
import { useRouter } from '#app';
import { useError } from '#app';

const error = useError();
const router = useRouter();

if (error && error.statusCode === 404) {
  setTimeout(() => {
    router.push('/launches');
  }, 2000);
}
</script>
