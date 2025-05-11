<script setup>
import { ref, onMounted } from 'vue'
import { fetchAllCountries } from '@/services/services.js';

const countries = ref([]);
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    countries.value = await fetchAllCountries()
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false;
  }
})
</script>

<template>
  <div class="container">
    <div class="row">
      <!-- Countries List (Bootstrap column) -->
      <div class="col-5" style="max-height: 90vh; overflow: scroll">

        <!-- Spinner mientras carga -->
        <div v-if="loading" class="p-3 text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>

        <!-- Mensaje de error -->
        <div v-else-if="error" class="alert alert-danger m-3">
          Error al cargar países: {{ error.message }}
        </div>

        <div v-else class="list-group">
          <router-link v-for="(country, index) in countries" :key="index" class="list-group-item list-group-item-action"
            :to="`${country.alpha3Code}`">
            <img class="me-3"
              :src="`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`"
              :alt="`Bandera de ${country.name.common}`" />
            {{ country.name.common }}
          </router-link>
        </div>
      </div>

      <div class="col-7">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style></style>