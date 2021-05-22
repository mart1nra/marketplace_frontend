<template>
  <v-row>
    <v-col cols="12" sm="12" md="8" lg="8" xl="8">
      <v-col cols="12" lass="px-0">
        <v-card v-for="(lineItem, i) in cart" :key="i"
          flat
          class="elevation-cs mb-3 d-flex align-center pa-6 justify-center justify-lg-space-between rounded-lg"
        >
          <v-progress-circular
            v-if="loading && lineItem.id === deletedLineItemId"
            class="w-100 text-center my-12"
            indeterminate
            color="primary"
          >
          </v-progress-circular>
          <v-btn v-if="!loading || lineItem.id !== deletedLineItemId" icon absolute top left>
            <v-icon color="red">mdi-heart-outline</v-icon>
          </v-btn>
          <div v-if="!loading || lineItem.id !== deletedLineItemId"
            class="align-left align-lg-left d-flex flex-column flex-lg-row justify-center mx-0 mx-lg-12"
          >
            <NuxtLink :to="`/product/${products[i].id}`">
              <v-img
                contain
                width="110"
                :src="products[i].image"
                class="mb-6 mb-lg-0"
              ></v-img>
            </NuxtLink>

            <div class="mx-0 mx-lg-6">
              <div
                class="align-baseline align-center d-flex flex-column flex-column-reverse flex-lg-row"
              >
                <NuxtLink :to="`/product/${products[i].id}`">
                  <h3 class="font-weight-bold primary--text">
                    {{ products[i].title }}
                  </h3>
                </NuxtLink>
              </div>
              <p>
                Color <v-icon v-if="products[i].options.color.name === 'Blanco'" size="20" color="gray">mdi-circle-outline</v-icon>
                     <v-avatar v-else size="16" :color="products[i].options.color.presentation"></v-avatar>
                <span v-if="Object.keys(products[i].options.size).length">Talle<v-chip class="ma-1" x-small>{{ products[i].options.size.presentation }}</v-chip></span>
                <span v-if="Object.keys(products[i].options.length).length">Largo<v-chip class="ma-1" x-small>{{ products[i].options.length.presentation }}</v-chip></span>
              </p>

              <v-text-field
                v-model="lineItem.quantity"
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
                    :disabled="lineItem.quantity === 1"
                    @click.prevent="handleDescreaseQuantity(lineItem, products[i])"
                    >mdi-minus</v-icon
                  >
                </template>

                <template #append-outer>
                  <v-icon
                    color="primary"
                    class="cursor-pointer"
                    @click.prevent="handleIncreaseQuantity(lineItem, products[i])"
                    >mdi-plus</v-icon
                  >
                </template>
              </v-text-field>
            </div>
          </div>
          <v-btn v-if="!loading || lineItem.id !== deletedLineItemId"
            absolute
            right 
            top 
            icon
            @click.prevent="handleRemoveProductFromCart(lineItem, products[i])"
          >
            <v-icon color="grey">mdi-close-circle</v-icon>
          </v-btn>
          <h4 v-if="lineItem.total && (!loading || lineItem.id !== deletedLineItemId)" v-html="displayPrice(lineItem.total)" absolute right bottom class="text-right my-3"></h4>
        </v-card>
      </v-col>
    </v-col>
    <v-col cols="12" sm="12" md="4" lg="4" xl="4">
      <v-card class="pa-0 pa-md-6 elevation-cs mt-3">
        <h3 class="text-uppercase font-weight-black">Total</h3>
        <v-divider class="my-3"></v-divider>
        <div class="d-flex justify-space-between align-center">
          <h4>Subtotal</h4>
          <div v-html="displayPrice(cartAmount)"></div>
        </div>
        <v-btn
          color="success"
          block
          tile
          class="my-4"
          @click="continueToShipping"
        >
          <v-icon left>mdi-cart-arrow-right</v-icon> Continuar Compra
        </v-btn>
      </v-card>
    </v-col>

    <Notification :snackbar="snackbar" />
  </v-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    cartAmount: {
      default: 0,
    }
  },
  computed: {
      ...mapState({
        products: state => state.product.cartProducts,
        cart: state => state.cart.cartItems,
      })
  },
  data() {
    return {
      e1: 1,
      snackbar: {
        visible: false,
        color: '',
        title: '',
        text: '',
        icon: ''
      },
      loading: false,
      deletedLineItemId: null
    }
  },
  methods: {
    displayPrice(p) {
      var price = p;
      var dec_pos = price.indexOf('.');
      p = price.substring(dec_pos + 1) === '00' || price.substring(dec_pos + 1) === '0' ? '$ ' + price.substring(0, dec_pos) : '$ ' + price.substring(0, dec_pos) + '<sup>' + price.substring(dec_pos + 1) + '</sup>';
      return p.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    notification(visible, color, icon, title, text) {
      this.snackbar.visible = visible;
      this.snackbar.color = color;
      this.snackbar.icon = icon;
      this.snackbar.title = title;
      this.snackbar.text = text;
    },
    async handleDescreaseQuantity(lineItem) {
      await this.$store.dispatch('cart/setCartItemQuantity', { line_item_id: lineItem.id, quantity: lineItem.quantity - 1 });
    },
    async handleIncreaseQuantity(lineItem, product) {
      const response = await this.$store.dispatch('cart/setCartItemQuantity', { line_item_id: lineItem.id, quantity: lineItem.quantity + 1 });
      if (response === 'Error') {
        this.notification(true, 'warning', 'mdi-alert', `${lineItem.quantity + 1} ${product.title}`, 'No hay stock disponible!');
      }
    },
    async handleRemoveProductFromCart(lineItem, product) {
      this.loading = true;
      this.deletedLineItemId = lineItem.id;

      const cartItems = await this.$store.dispatch('cart/removeProductFromCart', lineItem);
      if (cartItems) {
        this.$store.dispatch('product/getCartProducts', cartItems);
        var itemOptions = product.options.color.name;
        if (Object.keys(product.options.size).length) itemOptions = itemOptions + '/' + product.options.size.presentation;
        if (Object.keys(product.options.length).length) itemOptions = itemOptions + '/' + product.options.length.presentation;
        this.notification(true, 'success', 'mdi-check-circle', `${lineItem.quantity} ${product.title} (${itemOptions})`, 'Fue borrado del carrito de compras!');
      }
      this.loading = false;
    },
    async continueToShipping() {
      this.$nuxt.$loading.start();
      await this.$store.dispatch('cart/processCart', '');
      this.$emit('continueClicked');
      this.$nuxt.$loading.finish();
    }
  }
}
</script>