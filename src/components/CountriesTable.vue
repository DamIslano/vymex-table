<script setup lang="ts">
import {
  createColumnHelper,
  getCoreRowModel,
  useVueTable,
  FlexRender,
} from '@tanstack/vue-table'
import { computed } from 'vue'
import type { Country } from '@/types'

const props = defineProps<{
  countries: Country[]
  isLoading: boolean
}>()

const columnHelper = createColumnHelper<Country>()

const columns = [
  columnHelper.accessor('code', {
    header: 'Code',
    cell: info => info.getValue() || '—',
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue() || '—',
  }),
  columnHelper.accessor('currency', {
    header: 'Currency',
    cell: info => info.getValue() || '—',
  }),
]

const table = useVueTable({
  data: computed(() => props.countries),
  columns,
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <div
    class="overflow-x-auto rounded-md border transition-all duration-300"
    :class="props.countries.length > 1 ? 'h-[500px]' : 'h-[200px]'"
  >
    <table class="min-w-full text-sm text-left table-auto">
      <thead class="bg-gray-100">
        <tr>
          <th
            v-for="header in table.getHeaderGroups()[0].headers"
            :key="header.id"
            class="px-4 py-2"
          >
            <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="props.isLoading">
          <tr v-for="i in 5" :key="'skeleton-' + i" class="border-t animate-pulse">
            <td v-for="j in 3" :key="j" class="px-4 py-2">
              <div class="h-4 bg-gray-200 rounded w-full"></div>
            </td>
          </tr>
        </template>

        <template v-else-if="table.getRowModel().rows.length">
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="border-t"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="px-4 py-2"
            >
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </template>

        <tr v-else>
          <td colspan="3" class="text-center py-2 text-gray-500">
            No data available.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
