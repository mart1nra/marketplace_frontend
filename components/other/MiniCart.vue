<template>
	<div>
    <v-menu v-if="signedIn && products && products.length > 0"
      open-on-hover
      :close-on-content-click="false"
      offset-y
      left
    >
      <template #activator="{ on, attrs }">
        <v-badge
          overlap
          :content="cartTotal"
          offset-x="18"
          offset-y="18"
          color="primary"
        >
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon size="25" color="primary">mdi-cart-outline</v-icon>
          </v-btn>
        </v-badge>
      </template>
      <v-card class="pa-4" width="450">
        <v-list two-line class="pb-0">
          <v-list-item v-for="(lineItem, i) in cart" :key="i" class="mb-2">
            <v-progress-circular
              v-if="loading && lineItem.id === deletedLineItemId"
              class="w-100 text-center"
              indeterminate
              color="primary"
            >
            </v-progress-circular>

            <NuxtLink v-if="products[i] && (!loading || lineItem.id !== deletedLineItemId)"
              :to="`/product/${products[i].id}`"
            >
              <v-img
                :src="`${baseUrl}${products[i].image.url}`"
                contain
                style="max-width: 80px; max-height: 80px;"
              ></v-img>
            </NuxtLink>

            <v-list-item-content v-if="products[i] && (!loading || lineItem.id !== deletedLineItemId)">
              <v-list-item-title v-text="products[i].title"></v-list-item-title>
              <v-list-item-subtitle>
                Color <v-icon v-if="products[i].options.color.name === 'Blanco'" size="20" color="gray">mdi-circle-outline</v-icon>
                     <v-avatar v-else size="16" :color="products[i].options.color.presentation"></v-avatar>
                <span v-if="Object.keys(products[i].options.size).length">Talle<v-chip class="ma-1" x-small>{{ products[i].options.size.presentation }}</v-chip></span>
                <span v-if="Object.keys(products[i].options.length).length">Largo<v-chip class="ma-1" x-small>{{ products[i].options.length.presentation }}</v-chip></span>
              </v-list-item-subtitle>
              <v-list-item-subtitle
                >Cantidad: {{ lineItem.quantity }} x
                <span class="font-weight-bold" v-html="displayPrice(products[i].price)"></span>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action v-if="products[i] && (!loading || lineItem.id !== deletedLineItemId)">
              <v-btn icon>
                <v-icon
                  color="red lighten-1"
                  @click.prevent="handleRemoveProductFromCart(lineItem, products[i])"
                >mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider class="my-3"></v-divider>
          <div class="d-flex justify-space-between align-center">
            <h4>Subtotal</h4>
            <div class="font-weight-bold" v-html="displayPrice(cartAmount)"></div>
          </div>
          <v-btn
            class="mx-auto w-100 pa-0 ma-0 mt-4 white--text"
            tile
            color="primary"
            to="/order"
            exact
            nuxt
            >Ver Carrito</v-btn
          >
        </v-list>
      </v-card>
    </v-menu>
    <v-btn
      v-else
      icon
      to="/order"
      exact
      nuxt
    >
      <v-icon size="25" color="primary">mdi-cart-outline</v-icon>
    </v-btn>

    <Notification :snackbar="snackbar" />
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
			signedIn: state => state.auth.signedIn,
      products: state => state.product.cartProducts,
      cartTotal: state => state.cart.total,
      cartAmount: state => state.cart.amount,
      cart: state => state.cart.cartItems,
      baseUrl: state => state.repository.baseUrl
    })
  },
  data() {
    return {
      loading: false,
      deletedLineItemId: null,
      snackbar: {
        visible: false,
        color: '',
        title: '',
        text: '',
        icon: ''
      }
      /*user: {
        name: 'Martin',
        email: 'martinra@vgmail.com',
        verified: true,
        orders_placed: 12,
        image: require('~/assets/img/person_1.jpg'),
      },*/
    }
  },
  methods: {
    displayPrice(p) {
      var price = p;
      var dec_pos = price.indexOf('.');
      return price.substring(dec_pos + 1) === '00' || price.substring(dec_pos + 1) === '0' ? '$ ' + price.substring(0, dec_pos) : '$ ' + price.substring(0, dec_pos) + '<sup>' + price.substring(dec_pos + 1) + '</sup>';
    },
    notification(visible, color, icon, title, text) {
      this.snackbar.visible = visible;
      this.snackbar.color = color;
      this.snackbar.icon = icon;
      this.snackbar.title = title;
      this.snackbar.text = text;
    },
    async handleRemoveProductFromCart(lineItem, product) {
      this.loading = true;
      this.deletedLineItemId = lineItem.id;

      const cartItems = await this.$store.dispatch('cart/removeProductFromCart', lineItem);
      if (cartItems) {
        this.$store.dispatch('product/getCartProducts', cartItems);
        this.notification(true, 'success', 'mdi-check-circle', `${lineItem.quantity} ${product.title}`, 'Fue borrado del carrito de compras!');
      }
      this.loading = false;
    }
  }
}
</script>

<style></style>
