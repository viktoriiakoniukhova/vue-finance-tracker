<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <router-link
        v-for="link in links"
        :key="link.url"
        active-class="active"
        :to="link.url"
        custom v-slot="{ href, navigate, isExactActive }"
    >
      <li :class="[isExactActive && 'active']">
        <a :href="href" @click="navigate" class="waves-effect waves-orange pointer">{{ link.title }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";

export default {
// eslint-disable-next-line
  name: "Sidebar",
  props: {
    isOpen: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    links: [
      {title: localizeFilter('Sidebar_Bill'), url: "/", exact: true},
      {title: localizeFilter('Sidebar_History'), url: "/history"},
      {title: localizeFilter('Sidebar_Planning'), url: "/planning"},
      {title: localizeFilter('Sidebar_NewRecord'), url: "/record"},
      {title: localizeFilter('Sidebar_Categories'), url: "/categories"}
    ]
  })
}
</script>

<style scoped>

</style>