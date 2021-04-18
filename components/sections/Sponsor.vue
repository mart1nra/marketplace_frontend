<template>
  <v-sheet width="100%" class="my-12 elevation-cs-2">
    <v-card
      color="transparent"
      class="pa-4 ff-poppins product-featured"
      flat
      height="270"
    >
      <div class="d-flex flex-column fill-height align-center justify-center">
        <h2
          style="max-width: 300px"
          class="text-center primary--text mb-4 font-weight-regular"
        >
          Why Apple is the best product to buy in 2020
        </h2>
        <v-btn rounded color="primary" text class="font-weight-bold"
          >Read more <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </v-card>
  </v-sheet>
</template>

<style scoped>
.product-featured {
  background-image: url('~assets/img/apple.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
