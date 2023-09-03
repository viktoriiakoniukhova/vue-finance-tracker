<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localizeFilter('RecordHistory') }}</h3>
    </div>

    <div class="history-chart">
      <HistoryChart :chartData="chartData"/>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!records.length" class="center">
      {{ $filters.localizeFilter('Records_None') }}
      <router-link to="/record">
        {{ $filters.localizeFilter('Record_Create') }}
      </router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />
      <Paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="previousPage"
          :next-text="nextPage"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
      >
      </Paginate>
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from "@/mixins/pagination.mixin";
import HistoryChart from "@/components/HistoryChart";
import localizeFilter from "@/filters/localize.filter";

export default {
  //eslint-disable-next-line
  name: "History",
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
    chartData: {},
    previousPage: localizeFilter('Previous'),
    nextPage: localizeFilter('Next')
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');

    const categories = await this.$store.dispatch('fetchCategories');

    this.setup(categories);

    this.loading = false;
  },
  methods: {
    setup(categories) {

      const incomeText = localizeFilter('Income');
      const outcomeText = localizeFilter('Outcome');

      this.setupPagination(
          this.records.map((record) => {
            return {
              ...record,
              categoryName: categories.find(category => category.id === record.categoryID).title,
              typeClass: record.type === 'income' ? 'green' : 'red',
              typeText: record.type === 'income' ? incomeText : outcomeText,
            }
          })
      )

      this.chartData = {
        labels: categories.map(category => category.title),
        datasets: [{
          label: 'Витрати за категоріями',
          data: categories.map(category => {
            const spend = this.records
                .filter(r => r.categoryID === category.id)
                .filter(r => r.type === "outcome")
                .reduce((total, record) => {
                  return total + record.amount
                }, 0);

            return spend;
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }
    }
  },
  components: {
    HistoryTable,
    HistoryChart
  }
}
</script>

<style scoped>

</style>