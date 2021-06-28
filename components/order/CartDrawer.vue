<template>
  <v-navigation-drawer
    v-model="drawerOn"
    app
    temporary
    right
    width="360px"
  >
    <v-list-item class="title-bar secondary darken-1">
      <v-list-item-content class="white--text">
        <span class="text-center text-overline pl-6">Carrito de compras ({{ cartTotal }}) <v-icon class="drawer-close mt-1" @click.stop="closeCart()">mdi-window-close</v-icon></span>
      </v-list-item-content>
    </v-list-item>

    <v-list v-if="cartTotal > 0">
      <div class="d-flex justify-space-between align-center mx-3 mt-13">
        <span class="text--primary text-body-1">Subtotal de la compra</span>
        <span class="text-h5 font-weight-light color-gold" v-html="displayPrice(cartAmount)"></span>
      </div>

      <v-divider class="mt-2 mb-2"></v-divider>

      <v-list-item>
        <v-list-item-content class="mx-n1">
          <v-list-item-icon class="ma-0">
            <v-btn
              block
              class="text-h6 font-weight-medium white--text ff-fira-condensed px-10"
              color="#D4AF37"
              tile
              large
              elevation="0"
              to="/checkout"
              exact
              nuxt
            >Pagar</v-btn>
          </v-list-item-icon>
          <v-list-item-icon class="ma-0 mt-3">
            <v-btn
              block
              class="text-capitalize text-body-2 font-weight-bold white--text px-10"
              color="#212121"
              large
              elevation="0"
              @click.stop.prevent="mercadoPago.open()"
            >Pagar <span class="text-lowercase">con</span><span class="text-h6 font-weight-bold ml-1">mercado pago</span></v-btn>
          </v-list-item-icon>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mt-2"></v-divider>

      <div class="promotion-block mb-5">
        <div class="d-flex justify-space-between align-center promotion-div">
          <span class="text-caption font-weight-medium"><v-icon class="mdi-flip-h mr-1" small color="black">mdi-tag</v-icon> Códigos de promoción</span>
          <span><v-icon medium color="black">mdi-chevron-right</v-icon></span>
        </div>
      </div>

      <div v-if="products && products !== undefined">
        <div v-for="(lineItem, i) in cart" :key="i" class="mb-2">
          <!--v-progress-circular
            v-if="loading && lineItem.id === deletedLineItemId"
            class="w-100 text-center"
            indeterminate
            color="primary"
          >
          </v-progress-circular-->

          <div v-if="products[i] && (!loading || lineItem.id !== deletedLineItemId)">
            <div class="item-close mr-2">
              <v-icon
                size="30"
                class="text--disabled"
                @click.prevent="handleRemoveProductFromCart(lineItem.id)"
              >mdi-close</v-icon>
            </div>

            <v-list-item>
              <NuxtLink
                :to="`/product/${products[i].slug}`"
                class="mr-n4"
              >
                <v-img
                  class="ml-n4 mb-4"
                  :src="products[i].image ? products[i].image : emptyImage"
                  style="width: 170px; height: 170px;"
                ></v-img>
              </NuxtLink>

              <v-list-item-content class="item-info">
                <NuxtLink
                  :to="`/product/${products[i].slug}`"
                >
                  <v-list-item-title v-text="products[i].vendor.name"
                    class="text-overline font-weight-light"></v-list-item-title>
                  <v-list-item-title v-text="products[i].title"
                    class="text-body-2"></v-list-item-title>
                </NuxtLink>
                <v-list-item-subtitle
                  class="text-caption black--text font-weight-light mt-1 mb-3">Stock disponible</v-list-item-subtitle>
                <v-list-item-subtitle class="text-caption black--text font-weight-light">
                  <v-row class="no-gutters">
                    <v-col cols="3" class="font-weight-thin">Color</v-col>
                    <v-col cols="9">{{ products[i].options.color.name }}</v-col>
                  </v-row>
                  <v-row v-if="products[i].options.size" class="no-gutters">
                    <v-col cols="3" class="font-weight-thin">Talle</v-col>
                    <v-col cols="9">{{ products[i].options.size.presentation }}</v-col>
                  </v-row>
                  <v-row v-if="products[i].options.length" class="no-gutters">
                    <v-col cols="3" class="font-weight-thin">Largo</v-col>
                    <v-col cols="9">{{ products[i].options.length.presentation }}</v-col>
                  </v-row>
                  <v-row class="no-gutters">
                    <v-col cols="3" class="font-weight-thin">Cant.</v-col>
                    <v-col cols="9">{{ lineItem.quantity }}</v-col>
                  </v-row>
                </v-list-item-subtitle>
                <v-hover class="black--text text-caption font-weight-medium text-uppercase mt-3 mb-1">
                  <v-list-item-subtitle
                    slot-scope="{ hover }"
                    :class="`${hover ? 'edit-hover' : ''}`"
                    @click.prevent="showEdit(i)"
                    >
                    Editar<v-icon size="14">mdi-chevron-right</v-icon>
                  </v-list-item-subtitle>
                </v-hover>
                <v-list-item-subtitle>
                  <span class="text-h6 font-weight-light color-gold" v-html="displayPrice(products[i].price)"></span>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider v-if="i < products.length - 1" class="mx-3 mt-3"></v-divider>
          </div>
        </div>        

        <div v-if="products.length > 2">
          <v-divider class="mt-3 mb-2"></v-divider>

          <div class="d-flex justify-space-between align-center mx-3 mt-1">
            <span class="text--primary text-body-1">Subtotal de la compra</span>
            <span class="text-h5 font-weight-light color-gold" v-html="displayPrice(cartAmount)"></span>
          </div>
          
          <v-divider class="mt-2 mb-2"></v-divider>

          <v-list-item>
            <v-list-item-content class="mx-n1">
              <v-list-item-icon class="ma-0">
                <v-btn
                  block
                  class="text-h6 font-weight-medium white--text ff-fira-condensed px-10"
                  color="#D4AF37"
                  tile
                  large
                  elevation="0"
                  to="/checkout"
                  exact
                  nuxt
                >Pagar</v-btn>
              </v-list-item-icon>
              <v-list-item-icon class="ma-0 mt-3">
                <v-btn
                  block
                  class="text-capitalize text-body-2 font-weight-bold white--text px-10"
                  color="#212121"
                  large
                  elevation="0"
                  to="/checkout"
                  exact
                  nuxt
                >Pagar <span class="text-lowercase">con</span><span class="text-h6 font-weight-bold ml-1">mercado pago</span></v-btn>
              </v-list-item-icon>
            </v-list-item-content>
          </v-list-item>
        </div>
      </div>
    </v-list>

    <v-list-item v-else>
      <v-list-item-content class="mx-n1 mt-12">
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
            @click="drawerOn = false"
          >{{ textButton }}</v-btn>
        </v-list-item-icon>
      </v-list-item-content>
    </v-list-item>

    <v-footer v-if="products"
      padless
      inset
      :bottom="products.length < 2"
      :fixed="products.length < 2"
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-col
          class="secondary darken-1 py-4 text-center white--text"
          cols="12"
        >
          <div class="text-overline font-weight-bold">
            ¿Necesitás ayuda?
          </div>
          <div class="mx-9 my-3">
            <v-btn
              block
              class="text-h6 font-weight-medium white--text ff-fira-condensed px-10"
              color="black"
              tile
              large
              elevation="0"
            ><v-icon class="mdi-18px mr-1">mdi-chat</v-icon>Chat Online</v-btn>
          </div>
          <div class="text-caption mt-4">
            Servicio al Cliente<v-icon size="14" color="white">mdi-chevron-right</v-icon>
          </div>
        </v-col>
      </v-row>
    </v-footer>

    <!--div v-else>
      <v-row
        justify="center"
        no-gutters
      >
        <v-col
          class="secondary darken-1 py-4 text-center white--text"
          cols="12"
        >
          <div class="text-overline font-weight-bold">
            ¿Necesitás ayuda?
          </div>
          <div class="mx-9 my-3">
            <v-btn
              block
              class="text-h6 font-weight-medium white--text ff-fira-condensed px-10"
              color="black"
              tile
              large
              elevation="0"
            ><v-icon class="mdi-18px mr-1">mdi-chat</v-icon>Chatear Ahora</v-btn>
          </div>
          <div class="text-caption mt-4">
            Servicio al Cliente<v-icon size="14" color="white">mdi-chevron-right</v-icon>
          </div>
        </v-col>
      </v-row>
    </div-->

    <CartEdit
      :cartItem="itemToEdit"
      @update="handleRemoveProductFromCart(itemToEdit.lineItemId)"
    />

  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      drawer: state => state.cart.drawerOn,
      products: state => state.product.cartProducts,
      cartTotal: state => state.cart.total,
      cartAmount: state => state.cart.amount,
      cart: state => state.cart.cartItems,
      signedIn: state => state.auth.signedIn,
      emptyImage: state => state.product.emptyImage,
      preferenceId: state => state.payment.preferenceId,
    }),
    drawerOn: {
      get: function() {
        return this.drawer;
      },
      set: function(value) {
        if (value) {
          const mp = new MercadoPago('TEST-fe02f177-c10f-4ce2-b766-7eef91483a55', { locale: 'es-AR' });

          this.mercadoPago = mp.checkout({
            preference: {
              id: this.preferenceId
            }
          });          
        }

        this.$store.commit('cart/setDrawerOn', value);

        let elHtml = document.getElementsByTagName('html')[0];
        elHtml.style.overflowY = value ? 'hidden' : null;
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
      loading: false,
      deletedLineItemId: null,
      itemToEdit: null,
      mercadoPago: null
    }
  },
  methods: {
    closeCart() {
      this.$store.commit('cart/setDrawerOn', false);
    },
    async showEdit(index) {
      this.itemToEdit = this.products[index];

      await this.$store.dispatch('product/getProductsById',  { id: this.products[index].productId, type: 'cart' });
      this.$store.commit('cart/setEditOn', true);
    },
    displayPrice(p) {
      var price = p;
      var dec_pos = price.indexOf('.');
      p = price.substring(dec_pos + 1) === '00' || price.substring(dec_pos + 1) === '0' ? '$ ' + price.substring(0, dec_pos) : '$ ' + price.substring(0, dec_pos) + '<sup>' + price.substring(dec_pos + 1) + '</sup>';
      return p.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    async handleRemoveProductFromCart(id) {
      this.loading = true;
      this.deletedLineItemId = id;

      const cartItems = await this.$store.dispatch('cart/removeProductFromCart', id);
      if (cartItems) {
        this.$store.dispatch('product/getCartProducts', cartItems);

        const preferenceId = await this.$store.dispatch('payment/getMercadoPago');

        if (preferenceId) {
          this.$store.commit('payment/setMercadoPago', preferenceId);

          const mp = new MercadoPago('TEST-fe02f177-c10f-4ce2-b766-7eef91483a55', { locale: 'es-AR' });

          this.mercadoPago = mp.checkout({
            preference: {
              id: this.preferenceId
            }
          });
        }
      }
      this.loading = false;
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
    display: block;
    position: fixed;
    height: 46px;
    width: 100%;
    z-index: 200;
  }

  .drawer-close {
    color: white;
    float: right;
  }

  .promotion-block {
    background-color: #f5f5f5;
    padding-top: 10px;
    height: 65px;
  }

  .promotion-div {
    background-color: white;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 5px;
  }

  .item-close {
    text-align: right;
  }

  .item-info {
    align-self: baseline;
    padding: 0px;
  }

  .edit-hover {
    cursor: pointer;
    color: #D4AF37 !important;
  }
</style>