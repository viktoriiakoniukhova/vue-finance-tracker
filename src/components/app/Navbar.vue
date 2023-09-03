<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('clicker')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ $filters.dateFilter(this.date) }}</span>
      </div>
      <ul class="right hide-on-small-and-down">
        <li>
          <a
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
          >
            {{userName}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>
                {{ $filters.localizeFilter('ProfileTitle') }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>
                {{ $filters.localizeFilter('Navbar_Exit') }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  // eslint-disable-next-line
  name: "Navbar",
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  }),
  mounted() {
    this.dropdown = window.M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    });
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000)
  },
  beforeUnmount() {
    clearInterval(this.interval);
    if(this.dropdown && this.dropdown.isUnmounted) {
      this.dropdown.unmount();
    }
  },
  computed: {
    userName() {
      return this.$store.getters.info.name;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/login?message=logout');
    }
  }
}

</script>

<style scoped>

</style>