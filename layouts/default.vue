<template>
  <v-app>
    <InfoBar></InfoBar>
    <v-divider></v-divider>
    <AppBar></AppBar>
    <FabHelpCard v-if="!isProfile"></FabHelpCard>
    <v-main>
      <ProfileDrawer v-if="isProfile"></ProfileDrawer>
      <nuxt />
    </v-main>

    <BottomNavigation v-if="isProfile"></BottomNavigation>
  </v-app>
</template>

<script>
export default {
  computed: {
    isProfile() {
      var profile = this.$route.path.includes('/profile')
      return profile
    },
  },
}
</script>
