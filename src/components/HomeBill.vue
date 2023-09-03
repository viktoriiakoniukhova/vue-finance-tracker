<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ $filters.localizeFilter('Currency_Bill') }}</span>
        <p
            v-for="cur in currencies"
            :key="cur"
            class="currency-line">
          <span>
            {{$filters.currencyFilter(getCurrency(cur), cur)}}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "HomeBill",
  props: ['rates'],
  data: () => ({
    currencies: ['UAH', 'USD', 'EUR']
  }),
  methods: {
    getCurrency(currency) {
      return this.$store.getters.info.bill * this.rates[currency];
      // return Math.floor(this.$store.getters.info.bill * this.rates[currency]);
    }
  }
}
</script>

<style scoped>

</style>