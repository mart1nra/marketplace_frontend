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
      <v-menu open-on-hover offset-y left close-delay="3000">
        <template #activator="{ on, attrs }">
          <v-badge
            overlap
            content="2"
            offset-x="18"
            offset-y="18"
            color="primary"
          >
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon size="25" color="primary">mdi-cart-outline</v-icon>
            </v-btn>
          </v-badge>
        </template>
        <v-card class="pa-4">
          <v-list two-line class="pb-0">
            <v-list-item v-for="(product, i) in products" :key="i" class="mb-2">
              <v-img
                :src="require(`assets/img/categories/${product.id}.png`)"
                contain
                style="max-width: 60px; max-height: 40px; margin: 10px"
              ></v-img>

              <v-list-item-content>
                <v-list-item-title v-text="product.title"></v-list-item-title>

                <v-list-item-subtitle
                  >Amount:
                  <span class="font-weight-bold"
                    >{{ product.amount }}x</span
                  ></v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="red lighten-1">mdi-close</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-btn
              class="mx-auto w-100 pa-0 ma-0 mt-auto white--text"
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

      <!--v-btn
        icon
        class="ml-2"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon size="25">mdi-theme-light-dark</v-icon>
      </v-btn-->

      <v-btn
        v-if="!signedIn"
        outlined
        class="mx-4"
        color="primary"
        to="/profile/login"
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
              <v-img v-if="user && user.image" :src="user.image"></v-img>
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
                <v-img v-if="user.image" :src="user.image"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
                <v-list-item-subtitle>Looking good today!</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>🔥</v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>

            <div v-if="user" class="pt-0">
              <v-list-item link to="/profile" exact>
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

              <v-list-item link to="/profile/orders" exact>
                <v-list-item-icon>
                  <v-icon>mdi-view-list</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>My Orders</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link disabled>
                <v-list-item-icon>
                  <v-icon>mdi-cog</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Settings</v-list-item-title>
                  <v-list-item-subtitle class="caption"
                    >(Disabled)</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="signedIn = false">
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
          signedIn: state => state.auth.signedIn
      })
  },
  data() {
    return {
      model: 0,
      favItems: null,
      user: {
        name: 'Martin',
        email: 'martinra@vgmail.com',
        verified: true,
        orders_placed: 12,
        image: require('~/assets/img/person_1.jpg'),
      },
      products: [
        {
          id: 1,
          title: 'Apple MacBook Air (2020)',
          amount: 1,
        },
        {
          id: 2,
          title: 'iPhone 12 Pro Max (2020)',
          amount: 3,
        },
      ],
    }
  },
}
</script>

<style></style>
