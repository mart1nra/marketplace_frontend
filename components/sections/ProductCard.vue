<template>
  <v-card
    class="pa-4 ff-poppins elevation-cs"
    height="175"
    :class="$vuetify.theme.dark ? 'bg-blue-dark-cs' : 'bg-blue-cs'"
    to="/product/1"
  >
    <div class="d-flex justify-space-between">
      <div class="d-grid" :class="$vuetify.breakpoint.lgAndUp ? 'pa-4' : ''">
        <div class="font-weight-thin">Smart Deals</div>
        <span class="primary--text font-weight-bold">Save 50$</span>
        <span class="font-weight-medium">on Samsung Galaxy S20 Pro</span>

        <div class="shop-now primary--text py-4">
          Shop Now
          <v-icon right color="primary">mdi-arrow-right</v-icon>
        </div>
      </div>
      <v-avatar
        class="pa-3"
        :class="$vuetify.breakpoint.lgAndUp ? 'py-4' : ''"
        size="125"
        tile
      >
        <v-img
          width="100%"
          height="100%"
          :src="require('~/assets/img/phone.jpg')"
          contain
        ></v-img>
      </v-avatar>
    </div>
  </v-card>
</template>

<script>
export default {}
</script>

<style></style>
