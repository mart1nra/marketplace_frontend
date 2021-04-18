<template>
  <v-system-bar
    height="33px"
    absolute
    app
    :class="$vuetify.breakpoint.lgAndUp ? 'px-200' : 'px-4'"
  >
    <Socials />
    <v-spacer></v-spacer>
    <div>
      <v-icon>mdi-phone</v-icon>
      <span>Call us: <span class="font-weight-bold">0800 - 1923</span></span>
    </div>
  </v-system-bar>
</template>

<script>
export default {}
</script>

<style></style>
