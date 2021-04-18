<template>
  <v-app-bar
    app
    absolute
    elevation="3"
    height="85px"
    :class="$vuetify.breakpoint.lgAndUp ? 'px-200' : 'px-4'"
  >
    <NuxtLink to="/" class="d-flex align-center">
      <v-img alt="Vuetify Logo" src="/v.png" max-width="60" contain />
      <span class="title ml-3 mr-5 hidden-xs-only"
        >Vidriera<span class="font-weight-light">Libre</span></span
      >
    </NuxtLink>
    <v-spacer></v-spacer>
    <v-text-field
      solo
      hide-details
      label="Search"
      class="elevation-0 hidden-sm-and-down"
      prepend-inner-icon="mdi-magnify"
    ></v-text-field>
    <v-spacer></v-spacer>
    <div class="toolbar-icons d-flex align-center">
      <v-menu v-if="signedIn && cartTotal > 0" open-on-hover offset-y left>
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
              to="/order"
              exact
              nuxt
            >
              <v-icon size="25" color="primary">mdi-cart-outline</v-icon>
            </v-btn>
          </v-badge>
        </template>
        <v-card class="pa-4" max-width="450">
          <v-list two-line class="pb-0">
            <v-list-item v-for="(product, i) in products" :key="i" class="mb-2">
              <v-img
                :src="`${baseUrl}${product.image.url}`"
                contain
                style="max-width: 80px; max-height: 80px;"
              ></v-img>

              <v-list-item-content>
                <v-list-item-title v-text="product.title"></v-list-item-title>
                <v-list-item-subtitle>
                  Color <v-icon v-if="product.options.color.name === 'Blanco'" size="20" color="gray">mdi-circle-outline</v-icon>
                       <v-avatar v-else size="16" :color="product.options.color.presentation"></v-avatar>
                  Talle<v-chip class="ma-1" x-small>{{ product.options.size.presentation }}</v-chip>
                  Largo<v-chip class="ma-1" x-small>{{ product.options.length.presentation }}</v-chip>
                </v-list-item-subtitle>
                <v-list-item-subtitle
                  >Cantidad: {{ quantity(product) }} x
                  <span class="font-weight-bold" v-html="displayPrice(product.price)"></span>
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon
                    color="red lighten-1"
                    @click.prevent="handleRemoveProductFromCart(product)"
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
              >View order details</v-btn
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

      <v-badge
        v-if="favItems > 0"
        :content="favItems"
        overlap
        offset-x="18"
        offset-y="18"
        color="red"
        class="ml-2"
      >
        <v-btn icon>
          <v-icon size="25" color="red">mdi-heart-outline</v-icon>
        </v-btn>
      </v-badge>
      <v-icon v-else size="25" color="red" class="ml-2"
        >mdi-heart-outline</v-icon
      >
      <v-btn icon class="hidden-md-and-up ml-2">
        <v-icon size="25">mdi-magnify</v-icon>
      </v-btn>

      <v-btn
        icon
        class="ml-2"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon size="25">mdi-theme-light-dark</v-icon>
      </v-btn>

      <v-btn
        v-if="!signedIn"
        outlined
        class="mx-4"
        color="primary"
        to="/profile/login"
        exact
        nuxt
      >
        <v-icon left>mdi-account-circle-outline</v-icon> Ingresar
      </v-btn>

      <v-menu v-if="signedIn">
        <template #activator="{ on, attrs }">
          <v-btn
            text
            :ripple="false"
            class="px-1 ml-2 mr-n2 rounded-pill"
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar color="primary" size="35">
              <v-icon dark>mdi-account-circle</v-icon>
              <!--v-img v-if="user && user.image" :src="user.image"></v-img-->
            </v-avatar>
            <span class="text-none font-weight-regular ml-3 hidden-sm-and-down"
              >Hola, {{ user.name }}</span
            >
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list color="primary--text">
            <v-list-item>
              <v-list-item-avatar>
                <v-icon size="35">mdi-account-outline</v-icon>
                <!--v-img v-if="user.image" :src="user.image"></v-img-->
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ user.email }}</v-list-item-title>
                <v-list-item-subtitle>Looking good today!</v-list-item-subtitle>
              </v-list-item-content>
              <!--v-list-item-action>🔥</v-list-item-action-->
            </v-list-item>
            <v-divider></v-divider>

            <div v-if="user" class="pt-0">
              <v-list-item link to="/profile" exact nuxt>
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Profile</v-list-item-title>
                  <v-list-item-subtitle class="caption"
                    >Edit your profile</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>

              <v-list-item link to="/profile/orders" exact nuxt>
                <v-list-item-icon>
                  <v-icon>mdi-view-list</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>My Orders</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link to="/profile/data" exact nuxt>
                <v-list-item-icon>
                  <v-icon>mdi-cog</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Settings</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="handleLogout">
                <v-list-item-icon>
                  <v-icon color="red darken-2">mdi-exit-to-app</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="`Sign out`"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list>
        </v-card>
      </v-menu>
    </div>
    <template #extension>
      <v-tabs v-model="model" show-arrows>
        <v-tab to="/" nuxt exact>Home</v-tab>
        <v-tab to="/product/1" nuxt exact>Product Page</v-tab>
        <v-tab to="/categories" nuxt exact>Categories</v-tab>
        <v-menu offset-y open-on-hover close-delay="500">
          <template #activator="{ on, attrs }">
            <v-tab v-bind="attrs" class="primary--text" v-on="on">
              More <v-icon right>mdi-chevron-down</v-icon>
            </v-tab>
          </template>
          <v-list class="primary--text">
            <v-list-item link to="/profile" exact nuxt>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/profile/orders" exact nuxt>
              <v-list-item-title>Orders</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/profile/invoices" exact nuxt>
              <v-list-item-title>Invoices</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/profile/returns" exact nuxt>
              <v-list-item-title>Returns</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/profile/data" exact nuxt>
              <v-list-item-title>Data</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/404" exact nuxt>
              <v-list-item-title>404</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
      ...mapState({
          signedIn: state => state.auth.signedIn,
          user: state => state.account.accountInfo.data,
          products: state => state.product.cartProducts,
          cart: state => state.cart.cartItems,
          cartTotal: state => state.cart.total,
          cartAmount: state => state.cart.amount,
          baseUrl: state => state.repository.baseUrl
      })
  },
  data() {
    return {
      model: 0,
      favItems: null
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
    colorPresentation(color) {
        return color.name === 'Blanco' ? '' : '';
    },
    quantity(product) {
        if (this.cart !== null) {
            const cartItem = this.cart.find(
                item => item.id === product.lineItemId
            );
            return cartItem ? cartItem.quantity : null;
        } else {
            return null;
        }
    },
    displayPrice(p) {
        var price = p;
        var dec_pos = price.indexOf('.');
        return price.substring(dec_pos + 1) === '00' || price.substring(dec_pos + 1) === '0' ? '$' + price.substring(0, dec_pos) : '$' + price.substring(0, dec_pos) + '<sup>' + price.substring(dec_pos + 1) + '</sup>';
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
    },
    handleLogout() {
      this.$store.commit('account/setAccountInfo', null);
      this.$store.dispatch('auth/setAuthStatus', false);
      this.$router.push('/');
    }
  }
}
</script>

<style></style>
