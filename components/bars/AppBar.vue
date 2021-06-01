<template>
  <v-app-bar
    app
    absolute
    elevation="3"
    height="120px"
    :class="$vuetify.breakpoint.lgAndUp ? 'px-200' : 'px-4'"
  >
    <v-row>
      <v-col cols="12" md="2" sm="1" xs="1">
        <v-text-field
          solo
          dense
          flat
          hide-details
          clearable
          background-color="grey lighten-3"
          color="grey darken-2"
          placeholder="Buscar"
          class="hidden-sm-and-down"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="8" sm="5" xs="5">
        <div class="text-center">
          <NuxtLink to="/" class="align-center">
            <!--v-img alt="Vuetify Logo" src="/v.png" max-width="60" contain /-->
            <span class="text-h4 font-weight-light"
              >Nueva <span>Tienda</span></span
            >
          </NuxtLink>
        </div>
      </v-col>
      <v-col cols="12" md="2" sm="6" xs="6">
        <div class="toolbar-icons d-flex align-center">

          <MiniCart />

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
              <v-icon size="20" color="red">mdi-heart-outline</v-icon>
            </v-btn>
          </v-badge>
          <v-icon v-else size="20" color="red" class="ml-2"
            >mdi-heart-outline</v-icon
          >
          <v-btn icon class="hidden-md-and-up ml-2">
            <v-icon size="20">mdi-magnify</v-icon>
          </v-btn>

          <!--v-btn
            icon
            class="ml-2"
            @click="$vuetify.theme.dark = !$vuetify.theme.dark"
          >
            <v-icon size="20">mdi-theme-light-dark</v-icon>
          </v-btn-->

          <v-btn
            v-if="!signedIn"
            outlined
            small
            class="mx-4"
            color="grey"
            to="/profile/login"
            exact
            nuxt
          >
            <v-icon left size="20">mdi-account-circle-outline</v-icon> Ingresar
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
                <v-avatar size="20">
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
                    <v-icon size="20">mdi-account-outline</v-icon>
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
                      <v-icon size="20">mdi-account</v-icon>
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
                      <v-icon size="20">mdi-view-list</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>My Orders</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item link to="/profile/data" exact nuxt>
                    <v-list-item-icon>
                      <v-icon size="20">mdi-cog</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Settings</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item @click="handleLogout">
                    <v-list-item-icon>
                      <v-icon color="red darken-2" size="20">mdi-exit-to-app</v-icon>
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
      </v-col>
    </v-row>

    <template #extension>
      <v-tabs v-model="model" show-arrows centered hide-slider>
        <div>
          <v-menu
            offset-y
            open-on-hover
            close-delay="100"
            min-width="500"
            tile
            content-class="elevation-0"
          >
            <template #activator="{ on, attrs }">
              <v-tab
                v-bind="attrs"
                class="secondary--text font-weight-light pt-4 pb-6"
                v-on="on"
                to="/women"
                nuxt
                exact
              >
                Mujeres
              </v-tab>
            </template>

            <v-list class="primary--text" color="grey lighten-2">
              <v-row>
                <v-col cols="12" md="6" sm="6" xs="6">
                  <p class="text-break ml-6" style="max-width: 10rem;">
                    <NuxtLink to="/women/all" class="secondary--text text-caption text-uppercase">Todos los productos ></NuxtLink>
                    <NuxtLink to="/women/newest" class="secondary--text text-caption text-uppercase">Los recién llegados ></NuxtLink>
                    <NuxtLink to="/women/popular" class="secondary--text text-caption text-uppercase">Los más buscados ></NuxtLink>
                  </p>
                </v-col>
                  <v-divider vertical></v-divider>
                <v-col cols="12" md="5" sm="5" xs="5">
                  <p class="text-break" style="max-width: 5rem;">
                    <span class="secondary--text text-caption text-uppercase">Categorías</span>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Abrigos</NuxtLink>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Blusas</NuxtLink>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Calzas</NuxtLink>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Camisas</NuxtLink>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Chombas</NuxtLink>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Jeans</NuxtLink>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Musculosas</NuxtLink>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Patalones</NuxtLink>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Polleras</NuxtLink>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Remeras</NuxtLink>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Vestidos</NuxtLink>
                  </p>
                </v-col>
              </v-row>

            </v-list>
          </v-menu>
        </div>

        <div>
          <v-menu
            offset-y
            open-on-hover
            close-delay="100"
            min-width="500"
            tile
            content-class="elevation-0"
          >
            <template #activator="{ on, attrs }">
              <v-tab
                v-bind="attrs"
                class="secondary--text font-weight-light pt-4 pb-6"
                v-on="on"
                to="/men"
                nuxt
                exact
              >
                Hombres
              </v-tab>
            </template>

            <v-list class="primary--text" color="grey lighten-2">
              <v-row>
                <v-col cols="12" md="6" sm="6" xs="6">
                  <p class="text-break ml-6" style="max-width: 10rem;">
                    <NuxtLink to="/men/all" class="secondary--text text-caption text-uppercase">Todos los productos ></NuxtLink>
                    <NuxtLink to="/men/newest" class="secondary--text text-caption text-uppercase">Los recién llegados ></NuxtLink>
                    <NuxtLink to="/men/popular" class="secondary--text text-caption text-uppercase">Los más buscados ></NuxtLink>
                  </p>
                </v-col>
                  <v-divider vertical></v-divider>
                <v-col cols="12" md="5" sm="5" xs="5">
                  <p class="text-break" style="max-width: 5rem;">
                    <span class="secondary--text text-caption text-uppercase">Categorías</span>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Abrigos</NuxtLink>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Calzas</NuxtLink>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Camisas</NuxtLink>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Chombas</NuxtLink>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Jeans</NuxtLink>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Musculosas</NuxtLink>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Patalones</NuxtLink>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Remeras</NuxtLink>
                    <NuxtLink to="/" class="secondary--text text-caption font-weight-light">Trajes</NuxtLink>
                  </p>
                </v-col>
              </v-row>

            </v-list>
          </v-menu>
        </div>

        <div>
          <v-menu
            offset-y
            open-on-hover
            close-delay="100"
            min-width="500"
            tile
            content-class="elevation-0"
          >
            <template #activator="{ on, attrs }">
              <v-tab
                v-bind="attrs"
                class="secondary--text font-weight-light pt-4 pb-6"
                v-on="on"
                nuxt
                exact
              >
                Tiendas
              </v-tab>
            </template>

            <v-list class="primary--text" color="grey lighten-2">
              <v-row>
                <v-col cols="12" md="6" sm="6" xs="6">
                  <p class="text-break ml-6" style="max-width: 10rem;">
                    <NuxtLink to="/stores" class="secondary--text text-caption text-uppercase">Todas las tiendas ></NuxtLink>
                  </p>
                </v-col>
                  <v-divider vertical></v-divider>
                <v-col cols="12" md="5" sm="5" xs="5">
                  <p class="text-break" style="max-width: 6rem;">
                    <span class="secondary--text text-caption text-uppercase">Tiendas destacadas</span>
                    <NuxtLink to="/stores/1" class="secondary--text text-caption font-weight-light">Primera Tienda</NuxtLink>
                    <NuxtLink to="/stores/2" class="secondary--text text-caption font-weight-light">La Mejor Moda</NuxtLink>
                  </p>
                </v-col>
              </v-row>

            </v-list>
          </v-menu>
        </div>

        <v-tab class="secondary--text font-weight-light" to="/new" nuxt exact>New!</v-tab>
        <v-tab class="secondary--text font-weight-light" to="/sale" nuxt exact>Sale</v-tab>
        <!--v-menu offset-y open-on-hover close-delay="500">
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
        </v-menu-->
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
    handleLogout() {
      this.$store.commit('account/setAccountInfo', null);
      this.$store.dispatch('auth/setAuthStatus', false);
      this.$router.push('/');
    }
  }
}
</script>

<style>
  .v-input__icon--prepend-inner .v-icon { 
    font-size: 16px;
  }

  .v-text-field__slot input::placeholder {
    font-size: 13px;
  }
</style>
