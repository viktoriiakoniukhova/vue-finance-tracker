<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localizeFilter('Sidebar_Categories') }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">

        <CategoryCreate @created="addCategory"/>
<!--        Додамо атрибут key для перемалювання компонента (випадаюче меню при зміні параметрів категорії, щоб змінювались і в списку)-->
        <CategoryEdit
            v-if="categories.length"
            :categories="this.categories"
            :key="categories.length + updateCount"
            @updated="updateCategory"
        />
        <p v-else class="center">
          {{ $filters.localizeFilter('Categories_None') }}
        </p>

      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";

export default {
  // eslint-disable-next-line
  name: "Categories",
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  methods: {
    addCategory(category) {
      this.categories.push(category);
    },
    updateCategory(category) {
      //Оновлюємо випадаюче меню при зміні параметрів категорії, щоб змінювались і в списку
      const i = this.categories.findIndex(cat => cat.id === category.id);
      this.categories[i].title = category.title;
      this.categories[i].limit = category.limit;
      this.updateCount++;
    }
  },
  components: {
    CategoryCreate,
    CategoryEdit
  }
}
</script>

<style scoped>

</style>