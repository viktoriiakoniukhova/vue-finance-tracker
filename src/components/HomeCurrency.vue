<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ $filters.localizeFilter('Currency_Rate') }}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{ $filters.localizeFilter('Currency') }}</th>
            <th>{{ $filters.localizeFilter('Rate') }}</th>
            <th>{{ $filters.localizeFilter('Date') }}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="cur in currencies" :key="cur">
            <td>{{ cur }}</td>
            <td>{{ rates[cur].toFixed(5) }}</td>
            <td>{{ $filters.dateFilter(date) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "HomeCurrency",
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['UAH', 'USD', 'EUR']
  })
}
</script>

<style scoped>

</style>