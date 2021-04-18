<template>
  <v-card
    color="transparent"
    class="pa-4 ff-poppins elevation-cs product-right white--text"
    height="175"
    to="/product/1"
    exact
  >
    <div class="d-flex flex-column">
      <div class="d-grid pa-4">
        <div class="font-weight-thin">Combination Deal</div>
        <span class="font-weight-medium">Keyboard + Mouse</span>
        <div class="py-4">
          <img
            style="filter: invert(1)"
            :src="require('~/assets/img/ss_logo.png')"
            height="30"
          />
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {}
</script>

<style>
.product-right {
  background-image: url('~assets/img/keyboard.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
