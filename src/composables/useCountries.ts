import { useQuery } from '@tanstack/vue-query'
import { GraphQLClient, gql } from 'graphql-request'
import { computed, watchEffect, type Ref } from 'vue'

const endpoint = 'https://countries.trevorblades.com/'
// const endpoint = 'xxx'
const client = new GraphQLClient(endpoint)

const query = gql`
  query GetCountries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      code
      name
      currency
    }
  }
`

export function useCountries(searchRegex: Ref<string>) {
  const variables = computed(() =>
    searchRegex.value
      ? { filter: { name: { regex: searchRegex.value } } }
      : {}
  )

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['countries'],
    queryFn: () => client.request(query, variables.value).then(res => res.countries),
    enabled: false,
    staleTime: 1000 * 60,
  })

  watchEffect(() => {
    refetch()
  })

  const countries = computed(() => data.value ?? [])

  return {
    countries,
    isFetching,
    refetch,
  }
}
