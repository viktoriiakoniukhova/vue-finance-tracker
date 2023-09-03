<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ $filters.localizeFilter('MyWallet') }}</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: v$.email.$error}"
        >
        <label for="email">Email</label>
        <small
            v-if="v$.email.$error"
            class="helper-text invalid">{{  v$.email.$errors[0].$message }}</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: v$.password.$error}"
        >
        <label for="password">{{ $filters.localizeFilter('Password') }}</label>
        <small
            v-if="v$.password.$error"
            class="helper-text invalid">{{  v$.password.$errors[0].$message }}</small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: v$.name.$error}"
        >
        <label for="name">{{ $filters.localizeFilter('ProfileName') }}</label>
        <small
            v-if="v$.name.$error"
            class="helper-text invalid">{{ v$.name.$errors[0].$message }}</small>
      </div>
      <p>
        <label>
          <input
              type="checkbox"
              v-model="checkboxAgree"
          />
          <span>{{ $filters.localizeFilter('CheckboxAgreement') }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{ $filters.localizeFilter('Register') }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ $filters.localizeFilter('Already_Have_Account') }}
        <router-link to="/login">{{ $filters.localizeFilter('Login') }}!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {useVuelidate} from "@vuelidate/core/dist/index.esm";
import {email, minLength, required} from "@vuelidate/validators";

export default {
  // eslint-disable-next-line
  name: "Register",
  data: () => ({
    v$: useVuelidate(),
    email: '',
    password: '',
    name: '',
    checkboxAgree: false
  }),
  methods: {
    async submitHandler() {
      this.v$.$validate() // checks all inputs

      if (this.v$.$error) {
        return ;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch('register', formData);
        this.$router.push('/');
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  },
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)},
    name: {required, minLength: minLength(6)},
    checkboxAgree: {checked: v => v}
  },

}
</script>

<style scoped>

</style>