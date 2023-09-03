<template>
  <Loader v-if="loading"/>
  <div v-else class="app-main-layout">

    <Navbar @clicker="isOpen = !isOpen"/>

    <Sidebar :isOpen="isOpen" :key="locale"/>

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import messages from "@/utils/messages";
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "MainLayout",
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    //Якщо в store немає жодної інформації про користувача, то діспатчимо fetchInfo (робимо асинхронний запит на отримання даних користувача)
    if(!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
    }
    this.loading = false;
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    }
  },
  //Зміни в computed трекаємо за допомогою watch властивості (об'єкт)
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code]||localizeFilter('Error_Common'));
    }
  },
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style scoped>

</style>