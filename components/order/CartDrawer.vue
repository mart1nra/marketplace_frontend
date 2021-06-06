<template>
  <v-navigation-drawer
    v-model="drawerOn"
    absolute
    temporary
    right
    width="360px"
  >
    <v-list-item class="title-bar">
      <v-list-item-content class="white--text">
        <span class="text-center text-overline pl-6">Carrito de compras ({{ cartTotal }}) <v-icon class="drawer-close mt-1" @click.stop="closeCart()">mdi-window-close</v-icon></span>
      </v-list-item-content>
    </v-list-item>

      <v-list v-if="cartTotal > 0" dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list-item v-else>
        <v-list-item-content>
          <v-list-item-title class="text-h4 text-center text-uppercase ff-jomolhari mt-12">
            Tu Carrito<br>Está Vacío
          </v-list-item-title>
          <v-list-item-subtitle class="text--primary text-caption font-weight-light text-center my-5">
            {{ textSubtitle }}
          </v-list-item-subtitle>
          <v-list-item-icon class="ma-0">
            <v-btn
              block
              class="text-h6 font-weight-medium white--text ff-fira-condensed px-10"
              color="#D4AF37"
              tile
              large
              elevation="0"
              :to="linkButton"
              exact
              nuxt
            >{{ textButton }}</v-btn>
          </v-list-item-icon>
        </v-list-item-content>
      </v-list-item>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      drawer: state => state.cart.drawer,
      cartTotal: state => state.cart.total,
      signedIn: state => state.auth.signedIn
    }),
    drawerOn: {
      get: function() {
        return this.drawer;
      },
      set: function(value) {
        this.$store.commit('cart/setDrawer', value);
      }
    },
    textSubtitle() {
      return this.signedIn ? 'Llenalo con tu estilo!' : '¿Buscás artículos que habías añadido anteriormente?';
    },
    linkButton() {
      return this.signedIn ? '/' : '/profile/login';
    },
    textButton() {
      return this.signedIn ? 'Comprar Ahora' : 'Iniciar Sesión';
    }
  },
  data () {
    return {
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard' },
        { title: 'About', icon: 'mdi-forum' },
      ],
    }
  },
  methods: {
    closeCart() {
      this.$store.commit('cart/setDrawer', false);
    }
  }
}
</script>

<style scoped>
  .ff-jomolhari {
    font-family: "Jomolhari", serif !important;
  }

  .ff-fira-condensed {
    font-family: 'Fira Sans Extra Condensed', sans-serif !important;
    letter-spacing: 3px !important;
  }

  .title-bar {
    padding: -10px;
    margin: 0px;
    background-color: #212121;
    height: 20px;
  }

  .drawer-close {
    color: white;
    float: right;
  }
</style>