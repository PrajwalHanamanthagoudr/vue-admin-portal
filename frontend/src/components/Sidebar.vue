<template>
  <v-navigation-drawer width="250" app permanent v-model="drawerState"
    :location="$vuetify.display.mobile ? 'left' : undefined">
    <!-- Logo and Title -->
    <v-list-item class="px-3">
      <div class="d-flex align-center ga-1 pa-2">
        <v-icon color="#287F71" class="text-h4">mdi-chart-box</v-icon>
        <v-list-item-title class="text-h6 font-weight-bold" style="color: #287F71;">Consist</v-list-item-title>
      </div>
    </v-list-item>

    <!-- Main Menu -->
    <v-list dense class="pa-2">
      <v-subheader class="ml-6" style="color: #97A3B6;">MAIN MENU</v-subheader>
      <v-list-item v-for="(item, index) in menuItems" :key="index" link class="px-3 hoverable-item"
        :class="{ active: item.active }" @click="selectMenuItem(item, index)">
        <div class="d-flex align-center ga-1 pa-2">
          <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </div>
      </v-list-item>
    </v-list>

    <!-- Additional Options -->
    <v-divider class="ma-5" />
    <v-list dense class="pa-2">
      <v-list-item v-for="(item, index) in additionalItems" :key="index" link class="px-3" style="color: #97A3B6;">
        <div class="d-flex align-center ga-1 pa-2">
          <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </div>
      </v-list-item>
    </v-list>

    <!-- Upgrade Section -->
    <v-card class="mt-auto mx-3 pa-3" elevation="2" style="background-color: #287F71; color: white;">
      <v-card-text class="d-flex flex-column align-start" style="height: 100%;">
        <p class="text-body-2 mb-4">Get detailed analytics for help you, upgrade pro</p>
        <v-btn size="small" style="color: #287F71; border-radius: 10px;">Upgrade Now</v-btn>
      </v-card-text>
    </v-card>
    <br>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    drawerState: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.$emit("update:drawer", value);
      },
    },
  },
  data() {
    return {
      menuItems: [
        { title: "Overview", icon: "mdi-view-dashboard-outline", path: "/" },
        { title: "Performance", icon: "mdi-chart-bell-curve-cumulative", path: "/performance" },
        { title: "Campaigns", icon: "mdi-note-text-outline", path: "/campaigns" },
        { title: "Orders", icon: "mdi-cart-outline", path: "/orders" },
        { title: "Products", icon: "mdi-cube-outline", path: "/products" },
        { title: "Message", icon: "mdi-message-text-outline", path: "/message" },
        { title: "Sales Platform", icon: "mdi-cellphone", path: "/sales-platform" },
      ],
      additionalItems: [
        { title: "Demo Mode", icon: "mdi-flask-round-bottom-empty-outline" },
        { title: "Feedback", icon: "mdi-message-outline" },
        { title: "Help and Docs", icon: "mdi-help-circle-outline" },
      ],
    };
  },
  mounted() {
    this.setActiveMenuItem();
  },
  methods: {
    // Set the active menu item based on the current route
    setActiveMenuItem() {
      const currentPath = this.$route.path;
      this.menuItems.forEach((item) => {
        item.active = item.path === currentPath;
      });
    },
    selectMenuItem(item, index) {
      this.menuItems.forEach((menuItem, i) => (menuItem.active = i === index));
      this.$router.push(item.path);
    },
  },
  watch: {
    // Watch for route changes and update the active state
    '$route.path'(newPath) {
      this.setActiveMenuItem();
    },
  },
};
</script>

<style scoped>
.active {
  background-color: #287F71 !important;
  border-radius: 10px !important;
  color: white !important;
}

.hoverable-item {
  color: #97A3B6;
}

.hoverable-item:hover {
  color: #EB862A !important;
  border-radius: 10px !important;
}
</style>
