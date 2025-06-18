<template>
  <div class="p-4">
    <div class="mx-auto max-w-[1280px]">
      <div class="grid grid-cols-[280px_1fr] gap-4 items-start">
        <div class="overflow-auto border border-white">
          <SearchBox v-model="search" />
        </div>
        <div class="overflow-auto border border-white">
          <CountriesTable :countries="countries" :is-loading="isFetching" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCountries } from '@/composables/useCountries'
import SearchBox from '@/components/SearchBox.vue'
import CountriesTable from '@/components/CountriesTable.vue'

const search = ref('')
const { countries, isFetching } = useCountries(search)
</script>