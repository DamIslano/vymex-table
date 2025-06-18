<script setup lang="ts">
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { ref, watch, computed } from 'vue'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
} from '@/components/ui/combobox'
import { Button } from '@/components/ui/button' 
import { useCountries } from '@/composables/useCountries'
import type { Country } from '@/types'
import { cn } from '@/lib/utils'

const search = ref('')
const selected = ref<Country | null>(null)

const { countries, refetch } = useCountries(search)

watch(search, () => {
  refetch()
})

const filtered = computed(() =>
  countries.value.filter((c: any) =>
    new RegExp(search.value, 'i').test(c.name)
  )
)
</script>

<template>
  <Combobox v-model="selected" by="code">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        	<Button variant="outline" class="justify-between">
          	{{ selected?.name ?? 'Select country' }}
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList class="max-w-sm w-full rounded-md bg-white mt-1 max-h-60 overflow-auto py-1 text-sm">
      <ComboboxInput
        v-model="search"
        placeholder="Search country..."
        :display-value="(country: Country | null) => country?.name ?? ''"
        class="w-full rounded-md py-2 pl-3 pr-10 text-sm text-gray-900"
      />

      <ComboboxEmpty v-if="filtered.length === 0" class="py-2 px-4 text-gray-500 select-none cursor-default">
        No countries found.
      </ComboboxEmpty>

      <ComboboxGroup v-else>
        <ComboboxItem
          v-for="country in filtered"
          :key="country.code"
          :value="country"
          class="relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-gray-100"
        >
          {{ country.name }}
          <ComboboxItemIndicator>
            <Check :class="cn('ml-auto h-4 w-4')" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
