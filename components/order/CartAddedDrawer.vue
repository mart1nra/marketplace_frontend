<template>
  <v-navigation-drawer
    v-model="drawerOn"
    app
    temporary
    right
    width="513px"
    height="350px"
    class="mt-12 mr-10"
  >
    <v-row class="no-gutters">
      <v-col cols="10">
        <v-list-item>
          <v-img
            class="ml-1 mr-5 mt-5 mb-8"
            :src="image"
            style="max-width: 100px; max-height: 133px;"
          ></v-img>

          <v-list-item-content class="item-info mt-5">
            <v-list-item-title v-text="product.vendor.name + ' ' + product.title"
              class="text-body-2 mb-3"></v-list-item-title>
            <v-list-item-subtitle class="text-caption mb-3">
              <v-row class="no-gutters">
                <v-col cols="2" class="font-weight-light">Color:</v-col>
                <v-col cols="10">{{ options.color }}</v-col>
              </v-row>
              <v-row v-if="options.size" class="no-gutters">
                <v-col cols="2" class="font-weight-light">Talle:</v-col>
                <v-col cols="10">{{ options.size }}</v-col>
              </v-row>
              <v-row v-if="options.length" class="no-gutters">
                <v-col cols="2" class="font-weight-light">Largo:</v-col>
                <v-col cols="10">{{ options.length }}</v-col>
              </v-row>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="2">
        <div class="text-body-1 mt-4" v-html="displayPrice(product.price)"></div>
        <div class="text-caption font-weight-light text-right mr-7 mt-n1">Cant.: {{ options.quantity }}</div>
      </v-col>
    </v-row>

    <v-divider class="mt-2 mb-2"></v-divider>

    <div class="d-flex justify-space-between align-center mx-5 my-5 text-caption font-weight-light">
      <span class="text--primary">{{ cartTotal }} Artículos en el carrito</span>
      <span>Subtotal <span v-if="cartAmount" class="color-gold font-weight-medium" v-html="displayPrice(cartAmount)"></span></span>
    </div>
    
    <v-divider class="mt-2 mb-2"></v-divider>

    <v-row no-gutters>
      <v-col cols="8">
        <div class="mt-3 ml-5 mr-2">
          <v-btn
            block
            class="text-h6 font-weight-medium ff-fira-condensed px-10"
            tile
            large
            outlined
            elevation="0"
            @click.stop="closeCart()"
          >Seguir comprando</v-btn>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="mt-3 mr-5 ml-2">
          <v-btn
            block
            class="text-h6 font-weight-medium white--text ff-fira-condensed px-10"
            color="#D4AF37"
            tile
            large
            elevation="0"
            @click.stop="goToCart()"
          >Pagar</v-btn>
        </div>      
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    image: {
      type: String,
      default: ''
    },
    product: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapState({
      drawer: state => state.cart.drawerAddItemOn,
      cartTotal: state => state.cart.total,
      cartAmount: state => state.cart.amount
    }),
    drawerOn: {
      get: function() {
        return this.drawer;
      },
      set: function(value) {
        this.$store.commit('cart/setDrawerAddItemOn', value);
      }
    }
  },
  methods: {
    displayPrice(p) {
      var price = p;
      var dec_pos = price.indexOf('.');
      p = price.substring(dec_pos + 1) === '00' || price.substring(dec_pos + 1) === '0' ? '$ ' + price.substring(0, dec_pos) : '$ ' + price.substring(0, dec_pos) + '<sup>' + price.substring(dec_pos + 1) + '</sup>';
      return p.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    closeCart() {
      this.$store.commit('cart/setDrawerAddItemOn', false);
    },
    goToCart() {
      this.closeCart();
      this.$store.commit('cart/setDrawerOn', true);
    }
  }
}
</script>

<style scoped>
  .item-info {
    align-self: baseline;
    padding: 0px;
  }

  .ff-fira-condensed {
    font-family: 'Fira Sans Extra Condensed', sans-serif !important;
    letter-spacing: 3px !important;
  }
</style>