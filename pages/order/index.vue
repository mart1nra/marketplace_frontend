<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12" lg="12" xl="10">
        <h2 class="primary--text">Mi Carrito</h2>
        <v-divider class="my-3"></v-divider>
        <v-row>
          <v-col cols="12">
            <v-stepper non-linear class="elevation-cs">
              <v-stepper-header>
                <v-stepper-step step="1"> Products </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="2"> Payment </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3"> Shipping </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="4"> Delivery </v-stepper-step>
              </v-stepper-header>
            </v-stepper>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="8" lg="8" xl="8">
            <v-card class="pa-6 elevation-cs">
              <v-col cols="12" lass="px-0">
                <v-card
                  flat
                  class="elevation-cs ml-0 d-flex align-center pa-6 justify-center justify-lg-space-between rounded-lg"
                >
                  <v-btn icon absolute top left>
                    <v-icon color="red">mdi-heart-outline</v-icon>
                  </v-btn>
                  <div
                    class="align-center align-lg-center d-flex flex-column flex-lg-row justify-center mx-0 mx-lg-12"
                  >
                    <v-img
                      contain
                      width="200"
                      :src="require(`~/assets/img/laptop/2.jpg`)"
                      class="mb-6 mb-lg-0"
                    ></v-img>

                    <div class="mx-0 mx-lg-12">
                      <div
                        class="align-baseline align-center d-flex flex-column flex-column-reverse flex-lg-row"
                      >
                        <h3 class="font-weight-bold primary--text">
                          Apple MacBook Air (2020)
                        </h3>
                      </div>
                      <p>Lorem ipsum dolor, sit amet.</p>

                      <v-text-field
                        v-model="quantity"
                        outlined
                        label="Quantity"
                        dense
                        :style="
                          $vuetify.breakpoint.smAndUp ? 'max-width: 150px' : ''
                        "
                        hide-details
                      >
                        <template #prepend>
                          <v-icon
                            color="primary"
                            class="cursor-pointer"
                            @click.stop="quantity--"
                            >mdi-minus</v-icon
                          >
                        </template>

                        <template #append-outer>
                          <v-icon
                            color="primary"
                            class="cursor-pointer"
                            @click.stop="quantity++"
                            >mdi-plus</v-icon
                          >
                        </template>
                      </v-text-field>
                    </div>
                  </div>
                  <v-btn absolute right top icon>
                    <v-icon color="grey">mdi-close-circle</v-icon>
                  </v-btn>
                </v-card>
                <v-spacer></v-spacer>
                <h4 class="text-right my-3">Subtotal: $799.00</h4>
              </v-col>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="4" xl="4">
            <v-card class="pa-0 pa-md-6 elevation-cs">
              <h3 class="text-uppercase font-weight-black">Total</h3>
              <v-divider class="my-3"></v-divider>
              <div class="d-flex justify-space-between align-center">
                <h4>Subtotal</h4>
                <div>$799.00</div>
              </div>
              <v-btn color="success" block tile class="my-4">
                <v-icon left>mdi-cart-arrow-right</v-icon> Checkout
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: 'authentication',
  data() {
    return {
      quantity: 1,
    }
  },
}
</script>
