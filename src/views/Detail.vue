<template>
  <div>
    <Loader v-if="loading" />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">
          {{ $filters.localizeFilter('Sidebar_History') }}
        </router-link>
        <a class="breadcrumb" @click.prevent>
          {{ record.typeText }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[record.typeClass]">
            <div class="card-content white-text">
              <p>
                {{ $filters.localizeFilter('Description') }}:
                {{ record.description }}
              </p>
              <p>
                {{ $filters.localizeFilter('Amount') }}:
                {{ $filters.currencyFilter(record.amount) }}
              </p>
              <p>
                {{ $filters.localizeFilter('Category') }}:
                {{record.categoryName}}
              </p>

              <small>
                {{ $filters.localizeFilter('Date') }}:
                {{ $filters.dateFilter(record.date, 'datetime') }}
              </small>
            </div>
          </div>
        </div>
      </div>`
    </div>

    <p v-else class="center">
      {{ $filters.localizeFilter('Record_None') }}
    </p>
  </div>
</template>

<script>
import {useRoute} from "vue-router/dist/vue-router";
import Loader from "@/components/app/Loader";
import localizeFilter from "@/filters/localize.filter";

export default {
  // eslint-disable-next-line
  name: "DetailRecord",
  components: {Loader},
  data: () => ({
    loading: true,
    record: null
  }),
  async mounted() {
    const route = useRoute();
    const id = route.params.id; // read parameter id (it is reactive)

    const record = await this.$store.dispatch('fetchRecordByID', id);
    const category = await this.$store.dispatch('fetchCategoryByID', record.categoryID);

    const incomeText = localizeFilter('Income');
    const outcomeText = localizeFilter('Outcome');

    this.record = {
      ...record,
      categoryName: category.title,
      typeClass: record.type === 'income' ? 'green' : 'red',
      typeText: record.type === 'income' ? incomeText : outcomeText,
    }

    this.loading = false;
  }
}
</script>

<style scoped>

</style>