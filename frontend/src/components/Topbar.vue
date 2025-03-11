<template>
  <v-app-bar app elevate-on-scroll elevation="0" color="white" style="border-bottom: 1px solid gainsboro;">
    <v-container class="d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <!-- Menu toggle button -->
        <v-btn icon @click="$emit('toggle-drawer')">
          <v-icon color="#97A3B6">mdi-menu</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="#97A3B6">mdi-magnify</v-icon>
        </v-btn>
        <input type="text" placeholder="Search anything here..." style="outline: none; color: #97A3B6; border: none;">
      </div>

      <div class="d-flex align-center">
        <!-- Icons for desktop view -->
        <template v-for="icon in icons" :key="icon">
          <v-btn icon class="d-none d-md-flex">
            <v-icon color="#97A3B6">{{ icon }}</v-icon>
          </v-btn>
        </template>

        <!-- Three dots menu for mobile view -->
        <v-btn icon class="d-flex d-md-none">
          <v-icon color="#97A3B6">mdi-dots-vertical</v-icon>
        </v-btn>

        <v-divider vertical style="height: 26px; margin: 15px 5px; border-color: #87888a; border-width: 1px;" />
        <v-btn icon style="margin-right: -15px;">
          <v-avatar size="32" color="#EB862A">
            <v-icon color="white">mdi-emoticon-happy-outline</v-icon>
          </v-avatar>
        </v-btn>
        <v-btn icon>
          <v-icon color="#97A3B6">mdi-chevron-down</v-icon>
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "Topbar",
  data() {
    return {
      icons: ["mdi-tray-arrow-down", "mdi-airplane-takeoff", "mdi-cog-outline"],
    };
  },
};
</script>
