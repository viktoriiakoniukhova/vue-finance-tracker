<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from "@/utils/messages";
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "EmptyLayout",
  //Якщо щось змінюється в getter-ах, в нас оновлюється computed властивість (об'єкт)
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  //Зміни в computed трекаємо за допомогою watch властивості (об'єкт)
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code]||localizeFilter('Error_Common'));
    }
  }
}
</script>

<style scoped>

</style>