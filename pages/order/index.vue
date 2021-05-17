<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12" lg="12" xl="10">
        <h2 class="primary--text">Mi Carrito</h2>
        <v-divider class="my-3"></v-divider>
        <v-row v-if="cartTotal > 0">
          <v-col cols="12">
            <v-stepper
              v-model="e1"
              non-linear
              class="elevation-cs"
            >
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1"> Productos </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2"> Envío </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 3" step="3"> Pago </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="4"> Revisar </v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <Cart
                    :cart-amount="cartAmount"
                    @continueClicked="e1 = 2"
                  />
                </v-stepper-content>

                <v-stepper-content step="2">
                  <Shipping
                    :cart-amount="cartAmount"
                    @continueClicked="e1 = 3"
                  />
                </v-stepper-content>

                <v-stepper-content step="3">
                  <Payment
                    :cart-amount="cartAmount"
                    @continueClicked="e1 = 4"
                  />
                </v-stepper-content>

                <v-stepper-content step="4">
                  <Confirm
                    :cart-amount="cartAmount"
                  />
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-col>
        </v-row>

        <v-row v-else>
          <v-sheet
            width="100%"
            :color="!$vuetify.theme.dark ? 'accent lighten-4' : ''"
            class="pa-5 pa-md-12 d-flex flex-column flex-md-row align-center elevation-cs-2"
          >
            <div>
              <h1
                class="title-top primary--text display-1 font-weight-black"
                :class="!$vuetify.theme.dark ? 'text--darken-4' : ''"
              >
                Su carrito está vacío.
              </h1>
              <div class="align-self-center flex-column mt-5">
                <v-btn
                  color="primary"
                  class="white--text rounded-pill"
                  style="width: max-content"
                  to="/categories"
                  ><span>Ir a comprar</span>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
            </div>
            <v-spacer></v-spacer>

            <v-icon
              :size="$vuetify.breakpoint.mobile ? 60 : 90"
              color="primary darken-4"
            >
              mdi-shopping</v-icon
            >
          </v-sheet>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  middleware: 'authentication',
  computed: {
      ...mapState({
        cartTotal: state => state.cart.total,
        cartAmount: state => state.cart.amount
      })
  },
  data() {
    return {
      e1: 1
    }
  }
}
</script>
