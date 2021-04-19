<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12" lg="12" xl="10">
        <h2 class="primary--text">Mi Carrito</h2>
        <v-divider class="my-3"></v-divider>
        <v-row v-if="cartTotal > 0">
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
        <v-row v-if="cartTotal > 0">
          <v-col cols="12" sm="12" md="8" lg="8" xl="8">
            <v-card class="pa-6 elevation-cs">
              <v-col cols="12" lass="px-0">
                <v-card v-for="(product, i) in products" :key="i"
                  flat
                  class="elevation-cs mb-3 d-flex align-center pa-6 justify-center justify-lg-space-between rounded-lg"
                >
                  <v-btn icon absolute top left>
                    <v-icon color="red">mdi-heart-outline</v-icon>
                  </v-btn>
                  <div
                    class="align-left align-lg-left d-flex flex-column flex-lg-row justify-center mx-0 mx-lg-12"
                  >
                    <NuxtLink :to="`/product/${product.id}`">
                      <v-img
                        contain
                        width="80"
                        :src="`${baseUrl}${product.image.url}`"
                        class="mb-6 mb-lg-0"
                      ></v-img>
                    </NuxtLink>

                    <div class="mx-0 mx-lg-12">
                      <div
                        class="align-baseline align-center d-flex flex-column flex-column-reverse flex-lg-row"
                      >
                        <NuxtLink :to="`/product/${product.id}`">
                          <h3 class="font-weight-bold primary--text">
                            {{ product.title }}
                          </h3>
                        </NuxtLink>
                      </div>
                      <p>
                        Color <v-icon v-if="product.options.color.name === 'Blanco'" size="20" color="gray">mdi-circle-outline</v-icon>
                             <v-avatar v-else size="16" :color="product.options.color.presentation"></v-avatar>
                        Talle<v-chip class="ma-1" x-small>{{ product.options.size.presentation }}</v-chip>
                        Largo<v-chip class="ma-1" x-small>{{ product.options.length.presentation }}</v-chip>
                      </p>

                      <v-text-field
                        v-model="quantity"
                        outlined
                        label="Cantidad"
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
                  <v-btn 
                    absolute
                    right 
                    top 
                    icon
                    @click.prevent="handleRemoveProductFromCart(product)"
                  >
                    <v-icon color="grey">mdi-close-circle</v-icon>
                  </v-btn>
                  <h4 v-html="displayPrice(product.price)" absolute right bottom class="text-right my-3"></h4>
                </v-card>
              </v-col>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="4" xl="4">
            <v-card class="pa-0 pa-md-6 elevation-cs">
              <h3 class="text-uppercase font-weight-black">Total</h3>
              <v-divider class="my-3"></v-divider>
              <div class="d-flex justify-space-between align-center">
                <h4>Subtotal</h4>
                <div v-html="displayPrice(cartAmount)"></div>
              </div>
              <v-btn color="success" block tile class="my-4">
                <v-icon left>mdi-cart-arrow-right</v-icon> Checkout
              </v-btn>
            </v-card>
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
        products: state => state.product.cartProducts,
        cart: state => state.cart.cartItems,
        cartTotal: state => state.cart.total,
        cartAmount: state => state.cart.amount,
        baseUrl: state => state.repository.baseUrl
      })
  },
  data() {
    return {
      quantity: 1
    }
  },
  methods: {
    displayPrice(p) {
      var price = p;
      var dec_pos = price.indexOf('.');
      return price.substring(dec_pos + 1) === '00' || price.substring(dec_pos + 1) === '0' ? '$ ' + price.substring(0, dec_pos) : '$ ' + price.substring(0, dec_pos) + '<sup>' + price.substring(dec_pos + 1) + '</sup>';
    },
    async handleRemoveProductFromCart(product) {
      const cartItem = this.cart.find(
        item => item.id === product.lineItemId
      );
      const cartItems = await this.$store.dispatch('cart/removeProductFromCart', cartItem);
      this.$store.dispatch('product/getCartProducts', cartItems);
      /*this.$notify({
        group: 'addCartSuccess',
        title: 'Borrar de Carrito',
        text: `${product.title} fue borrado del carrito de compras!`
      });*/
    }
  }
}
</script>
