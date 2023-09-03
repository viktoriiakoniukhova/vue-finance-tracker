<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localizeFilter('Sidebar_Planning') }}</h3>
      <h4>{{ $filters.currencyFilter(getInfoBill) }}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      {{ $filters.localizeFilter('Categories_None') }}
      <router-link to="/categories">
        {{ $filters.localizeFilter('Category_Create') }}
      </router-link>
    </p>

    <section v-else>
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{ category.title }}:</strong>
          {{ $filters.currencyFilter(category.spend) }} з {{ $filters.currencyFilter(category.limit) }}
        </p>
        <div class="progress">
          <div
              class="determinate"
              :class="[category.progressColor]"
              :style="{width: category.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
  name: "Planning",
  components: {},

  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    getInfoBill() {
      return this.$store.getters.info.bill;
    }
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.categories = categories.map(category => {
      const spend = records
          .filter(r => r.categoryID === category.id)
          .filter(r => r.type === "outcome")
          .reduce((total, record) => {
            return total + record.amount
          }, 0);

      const percent = 100 * spend / category.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor = percent < 60
          ? 'green'
          : percent < 100
              ? 'yellow'
              : 'red';
      return {
        ...category,
        progressPercent,
        progressColor,
        spend
      };
    });

    this.loading = false;
  }
}
</script>

<style scoped>

</style>