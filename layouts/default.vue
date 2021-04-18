<template>
  <v-app>
    <InfoBar></InfoBar>
    <v-divider></v-divider>
    <AppBar></AppBar>
    <FabHelpCard v-if="!isProfile"></FabHelpCard>
    <v-main>
      <ProfileDrawer v-if="isProfile && signedIn"></ProfileDrawer>
      <nuxt />
    </v-main>

    <BottomNavigation v-if="isProfile && signedIn"></BottomNavigation>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    isProfile() {
      var profile = this.$route.path.includes('/profile')
      return profile
    },
    ...mapState({
        signedIn: state => state.auth.signedIn
    })
  },
}
</script>
