<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localizeFilter('ProfileTitle')}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model.trim="name"
            :class="{invalid: v$.name.$error}"
        >
        <label for="description">{{ $filters.localizeFilter('ProfileName') }}</label>
        <small
            v-if="v$.name.$error"
            class="helper-text invalid">{{ v$.name.$errors[0].$message }}</small>
      </div>

      <!-- Switch -->
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isLocaleUA">
          <span class="lever"></span>
          Українська
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ $filters.localizeFilter('UpdateButton') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required, minLength } from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core/dist/index.esm";
import localizeFilter from "@/filters/localize.filter";

export default {
  // eslint-disable-next-line
  name: "Profile",
  data: () => ({
    v$: useVuelidate(),
    name: '',
    isLocaleUA: true
  }),
  mounted() {
    this.name = this.$store.getters.info.name;
    this.isLocaleUA = this.$store.getters.info.locale === 'uk-UA'
    setTimeout(() => {
      window.M.updateTextFields();
    }, 0);
  },
  methods: {
    async submitHandler() {
      this.v$.$validate() // checks all inputs

      if (this.v$.$error) {
        // this.v$.touch();
        return ;
      }

      try {
        await this.$store.dispatch('updateInfo', {
          name: this.name,
          locale: this.isLocaleUA ? 'uk-UA' : 'en-US'
        });
        this.$message(localizeFilter('Data_Updated'));
        // eslint-disable-next-line no-empty
      } catch (e) {}

    }
  },
  validations: {
    name: {required, minLength: minLength(6)}
  }
}
</script>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>