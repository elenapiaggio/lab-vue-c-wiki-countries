<script setup>
import countries from '@/countries.json';
</script>

<template>
  <div class="container">
    <div class="row">
      <!-- Countries List (Bootstrap column) -->
      <div class="col-5" style="max-height: 90vh; overflow: scroll">
        <div class="list-group">
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