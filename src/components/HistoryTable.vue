<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{ $filters.localizeFilter('Amount') }}</th>
      <th>{{ $filters.localizeFilter('Date') }}</th>
      <th>{{ $filters.localizeFilter('Category') }}</th>
      <th>{{ $filters.localizeFilter('Type') }}</th>
      <th>{{ $filters.localizeFilter('Open') }}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, index) in records" :key="record.id">
      <td>{{ index + 1 }}</td>
      <td>{{ $filters.currencyFilter(record.amount) }}</td>
      <td>{{ $filters.dateFilter(record.date) }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span
            class="white-text badge"
            :class="[record.typeClass]"
        >{{ record.typeText }}</span>
      </td>
      <td>
        <button
            class="btn-small btn"
            @click="$router.push(`/detail/${record.id}`)"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "HistoryTable",
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>

<style scoped>

</style>