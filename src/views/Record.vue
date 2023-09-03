<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localizeFilter('Sidebar_NewRecord') }}</h3>
    </div>

    <Loader v-if="loading"/>

    <p v-else-if="!categories.length" class="center">
      {{ $filters.localizeFilter('Categories_None') }}
      <router-link to="/categories">
        {{ $filters.localizeFilter('Category_Create') }}
      </router-link>
    </p>

    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field" >
        <select ref="select" v-model="categoryByDefault">
          <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
          >{{ category.title }}</option>
        </select>
        <label>{{ $filters.localizeFilter('Category_Dropdown') }}</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>{{ $filters.localizeFilter('Income') }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>{{ $filters.localizeFilter('Outcome') }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: v$.amount.$error}"
        >
        <label for="amount">{{ $filters.localizeFilter('Amount') }}</label>
        <span
            v-if="v$.amount.$error"
            class="helper-text invalid">{{  v$.amount.$errors[0].$message }}</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{invalid: v$.description.$error}"
        >
        <label for="description">{{ $filters.localizeFilter('Description') }}</label>
        <span
            v-if="v$.description.$error"
            class="helper-text invalid">{{  v$.description.$errors[0].$message }}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ $filters.localizeFilter('Create') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import {required, minValue, minLength} from '@vuelidate/validators'
import {useVuelidate} from '@vuelidate/core'
import localizeFilter from "@/filters/localize.filter";
export default {
  // eslint-disable-next-line
  name: "Record",
  components: {Loader},
  data: () => ({
    categories: [],
    select: null,
    categoryByDefault: null,
    loading: true,
    type: 'outcome',
    amount: 1,
    description: '',
    v$: useVuelidate(),
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;

    if(this.categories.length) {
      this.categoryByDefault = this.categories[0].id;
    }

    setTimeout(() => {
      window.M.FormSelect.init(this.$refs.select);
      window.M.updateTextFields();
    }, 0);
  },
  unmounted() {
    if(this.select && this.select.unmount){
      this.select.destroy();
    }
  },
  computed: {
    canCreateRecord() {
      if(this.type === 'income') {
        return true;
      }
      return this.$store.getters.info.bill >= this.amount;
    }
  },
  methods: {
    async submitHandler() {
      this.v$.$validate() // checks all inputs

      if (this.v$.$error) {
        // this.v$.touch();
        return;
      }

      //Перевірка чи достатньо коштів на рахунку
      if(this.canCreateRecord) {
        try {
          const recordData = {
            categoryID: this.categoryByDefault,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          };
          await this.$store.dispatch('createRecord', recordData);

          const bill = this.type === 'income'
              ? this.$store.getters.info.bill + this.amount
              : this.$store.getters.info.bill - this.amount

          await this.$store.dispatch('updateInfo', {bill});
          this.$message(localizeFilter('Record_Created'));

          this.v$.$reset();
          this.amount = 1;
          this.description = '';
          // eslint-disable-next-line no-empty
        } catch (e) { }
      } else {
        this.$message(`${localizeFilter('NotEnoughMoney')} (${this.amount - this.$store.getters.info.bill})`);
      }

    }
  },
  validations: {
    amount: {required, minValue: minValue(1)},
    description: {required, minLength: minLength(1)}
  }
}
</script>

<style scoped>

</style>