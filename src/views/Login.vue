<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ $filters.localizeFilter('MyWallet')}}</span>
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
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{ $filters.localizeFilter('Login') }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ $filters.localizeFilter('No_Account') }}
        <router-link to="/register">
          {{ $filters.localizeFilter('Register') }}
        </router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from '@vuelidate/validators'
import {useVuelidate} from '@vuelidate/core'
import messages from "@/utils/messages";

export default {
  // eslint-disable-next-line
  name: "Login",
  data: () => ({
    v$: useVuelidate(),
    email: '',
    password: ''
  }),
  mounted() {
    if(messages[this.$route.query.message]){
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async submitHandler() {
      this.v$.$validate() // checks all inputs

      if (this.v$.$error) {
        return ;
      }

      const formData = {
        email: this.email,
        password: this.password
      }
      
      try {
        await this.$store.dispatch('login', formData);
        this.$router.push('/');
        // eslint-disable-next-line no-empty
      } catch (e) { }

    }
  },
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  }
}
</script>

<style scoped>

</style>