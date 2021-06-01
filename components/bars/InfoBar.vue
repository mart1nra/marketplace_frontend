<template>
  <v-system-bar
    height="33px"
    absolute
    dark
    app
    :class="$vuetify.breakpoint.lgAndUp ? 'px-200' : 'px-4'"
  >
    <Socials />
    <v-spacer></v-spacer>
    <div>
      <v-icon size="15">mdi-phone</v-icon>
      <span class="text-caption">Atención personal: <span class="font-weight-bold text-caption">0800-1923-7777</span></span>
    </div>
  </v-system-bar>
</template>

<script>
export default {}
</script>

<style></style>
