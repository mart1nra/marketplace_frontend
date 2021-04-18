<template>
  <div>
    <v-sheet
      class="w-100 white--text d-flex align-center justify-center flex-column mt-6"
      height="270"
    >
      <div class="d-flex align-center justify-center my-6 flex-column">
        <h1 class="mb-4 text-center">Subscribe to our Newsletter</h1>

        <div class="d-flex align-center justify-center my-3">
          <v-text-field
            placeholder="Email Address"
            :style="$vuetify.breakpoint.mdAndUp ? 'max-width: 400px' : ''"
            solo
            dense
            rounded
            hide-details
          ></v-text-field>
          <v-btn rounded class="ml-2" color="primary">Sign up</v-btn>
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.v-sheet {
  background-image: url('~assets/img/sub.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
