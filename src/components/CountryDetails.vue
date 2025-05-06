<script setup>
import { useRoute } from 'vue-router';
import { ref, computed, watch } from 'vue';
import countries from '@/countries.json';

const route = useRoute();
const alpha3Code = computed(() => route.params.alpha3Code);
const alpha2Code = ref('');

const country = computed(() => {
  const code3 = String(alpha3Code.value).toUpperCase();
  return countries.find(
    c => c.alpha3Code.toUpperCase() === code3
  );
});

watch(
  () => alpha3Code.value,
  (newAlpha3) => {
    const code3 = String(newAlpha3).toUpperCase();

    const country = countries.find(
      c => c.alpha3Code.toUpperCase() === code3
    );
    console.log('nuevo alpha3:', newAlpha3);
    console.log('country encontrado:', country);
    alpha2Code.value = country ? country.alpha2Code : '';
  },
  { immediate: true }

)

</script>

<template>



  <div class="col-7">
    <img class="me-3" :src="`https://flagpedia.net/data/flags/icon/72x54/${alpha2Code.toLowerCase()}.png`" />
    <h1>{{ country.name.common }}</h1>
    <table class="table">
      <thead></thead>
      <tbody>
        <tr>
          <td style="width: 30%">Capital</td>
          <td>{{ country.capital[0] }}</td>
        </tr>
        <tr>
          <td>Area</td>
          <td>
            {{ country.area }} km <sup>2</sup>
          </td>
        </tr>
        <tr>
          <td>Borders</td>
          <td>
            <ul>
              <li v-for="border in country.borders" :key="border">
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
