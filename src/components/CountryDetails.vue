<script setup>
import { useRoute } from 'vue-router';
import { ref, computed, watch, onMounted } from 'vue';
import { fetchCountryByCode } from '@/services/services.js';
import { fetchAllCountries } from '@/services/services.js';

const route = useRoute();
const alpha3Code = computed(() => route.params.alpha3Code);
const alpha2Code = ref('');

const countries = ref([]);
const countryData = ref(null)

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

const country = computed(() => {
  const code3 = String(alpha3Code.value).toUpperCase();
  return countries.find(
    c => c.alpha3Code.toUpperCase() === code3
  );
});

watch(
  () => alpha3Code.value,
  async newCode => {
    loading.value = true
    try {
      const data = await fetchCountryByCode(newCode)
      alpha2Code.value = data.alpha2Code
      countryData.value = data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="loading">Cargando…</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else class="col-7" v-if="countryData">
    <img class="me-3" :src="`https://flagpedia.net/data/flags/icon/72x54/${alpha2Code.toLowerCase()}.png`" />
    <h1>{{ countryData.name.common }}</h1>
    <table class="table">
      <thead></thead>
      <tbody>
        <tr>
          <td style="width: 30%">Capital</td>
          <td>{{ countryData.capital[0] }}</td>
        </tr>
        <tr>
          <td>Area</td>
          <td>
            {{ countryData.area }} km <sup>2</sup>
          </td>
        </tr>
        <tr>
          <td>Borders</td>
          <td>
            <ul>
              <li v-for="border in countryData.borders" :key="border">
                <router-link :to="`/${border}`">{{ border }}</router-link>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
