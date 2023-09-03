<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $filters.localizeFilter('Create') }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
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
          {{ $filters.localizeFilter('Create') }}
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
  name: "CategoryCreate",
  data: () => ({
    v$: useVuelidate(),
    title: '',
    limit: 100
  }),
  validations: {
    title: {required},
    limit: {required, minValue: minValue(100)}
  },
  mounted() {
    window.M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      this.v$.$validate() // checks all inputs

      if (this.v$.$error) {
        // this.v$.touch();
        return;
      }
      const categoryData = {
        title: this.title,
        limit: this.limit
      }
      try {
        const category = await this.$store.dispatch('createCategory', categoryData);
        // Збрасуємо стейт форми (шоб вона очистилась після додавання
        this.v$.$reset();
        this.title = '';
        this.limit = 100;

        this.$message(localizeFilter('Category_Add'));
        this.$emit('created', category);
        // eslint-disable-next-line no-empty
      } catch (e) { }
    }
  }
}
</script>

<style scoped>

</style>