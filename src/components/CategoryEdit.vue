<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $filters.localizeFilter('Category_Edit') }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
            >{{ category.title }}</option>
          </select>
          <label>{{ $filters.localizeFilter('Category_Dropdown') }}</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: v$.title.$error}"
          >
          <label for="name">{{ $filters.localizeFilter('Category_Name') }}</label>
          <span
              v-if="v$.title.$error"
              class="helper-text invalid">{{  v$.title.$errors[0].$message }}</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: v$.limit.$error}"
          >
          <label for="limit">{{ $filters.localizeFilter('Category_Limit') }}</label>
          <span
              v-if="v$.limit.$error"
              class="helper-text invalid">{{  v$.limit.$errors[0].$message }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ $filters.localizeFilter('UpdateButton') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from '@vuelidate/validators'
import {useVuelidate} from '@vuelidate/core'
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "CategoryEdit",
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,

    v$: useVuelidate(),
    title: '',
    limit: 100,
    current: null
  }),
  created() {
    //При загрузці сторінки показуєм першу зі списку категорій в випадаючому списку
    const {id, title, limit} = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  watch: {
    //В залежності від обраної категорії міняємо вміст полів в "редагуванні"
    current(categoryID) {
      const {title, limit} = this.categories.find(category => category.id === categoryID);
      this.title = title;
      this.limit = limit
    }
  },
  mounted() {
    window.M.updateTextFields();
    window.M.FormSelect.init(this.$refs.select);
  },
  unmounted() {
    if(this.select && this.select.unmount){
      this.select.destroy();
    }
  },
  methods: {
    async submitHandler() {
      this.v$.$validate() // checks all inputs

      if (this.v$.$error) {
        // this.v$.touch();
        return;
      }
      const categoryData = {
        id: this.current,
        title: this.title,
        limit: this.limit
      }
      try {
        await this.$store.dispatch('updateCategory', categoryData);

        this.$message(localizeFilter('Category_Update'));
        this.$emit('updated', categoryData);
        // eslint-disable-next-line no-empty
      } catch (e) { }
    }
  },
  validations: {
    title: {required},
    limit: {required, minValue: minValue(100)}
  }
}
</script>

<style scoped>

</style>