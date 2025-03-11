<template>
  <v-app>
    <Sidebar :drawer.sync="drawer" />
    <v-main>
      <Topbar @toggle-drawer="drawer = !drawer" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import Topbar from './components/Topbar.vue';

export default {
  components: {
    Sidebar,
    Topbar,
  },
  data() {
    return {
      drawer: true,
    };
  },
};
</script>
