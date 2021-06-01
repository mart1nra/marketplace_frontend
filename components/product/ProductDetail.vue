<template>
  <v-container>
    <Breadcrumb />
    <v-divider class="mt-n3 mb-6"></v-divider>
    <v-row justify="center">
      <v-col cols="12" md="12" lg="6" xl="6">
        <div v-if="images.length > 0"
          class="d-flex flex-column-reverse flex-lg-column-reverse flex-md-row flex-xl-row"
        >
          <div
            class="d-flex flex-lg-row flex-md-column flex-xl-column justify-center"
          >
            <div v-for="(image, i) in images" :key="i" class="mt-3">
              <v-img
                :src="image"
                height="70"
                width="70"
                contain
                class="rounded mx-auto cursor-pointer"
                @mouseenter="selectedImage = i"
              ></v-img>
            </div>
          </div>

          <v-img
            max-height="430px"
            max-width="500px"
            :src="images[selectedImage]"
            class="rounded mx-4"
            :class="$vuetify.breakpoint.smOnly ? 'mx-auto' : ''"
            contain
          />
        </div>
      </v-col>
      <v-col cols="12" md="12" lg="6" xl="6">
        <h2 class="text-h5 text-capitalize">{{ product.title }}</h2>
        <Stars :size="20" />
        <h2 class="text-h5 font-weight-light" v-html="displayPrice(product.price)"></h2>
        <h5 v-if="product.colors.length > 0" class="text--secondary mt-3 mb-1">Color: 
          <span class="text--primary font-weight-light">{{ product.colors[selectedColor].name }}</span>
        </h5>
        <v-btn-toggle
          v-model="selectedColor"
          mandatory
        >
          <span v-for="color in product.colors">
            <v-btn v-if="color.presentation === '#FFFFFF'"
              class="mx-1"
              fab
              outlined
              x-small
              :color="color.presentation"
              @click="selectColor(color)"
            >
            </v-btn>
            <v-btn v-else
              class="mx-1"
              fab
              dark
              depressed
              x-small
              :color="color.presentation"
              @click="selectColor(color)"
            >
            </v-btn>
          </span>
        </v-btn-toggle>
        <h5 v-if="product.sizes.length > 0" class="mt-3 mb-1">Talle: 
          <span class="font-weight-light">{{ selectedSize || selectedSize === 0 ? product.sizes[selectedSize].name : '' }}</span>
        </h5>
        <v-btn-toggle
          v-model="selectedSize"
        >
          <span v-for="size in product.sizes">
            <v-btn
              class="mx-1"
              text
              small
              outlined
              :disabled="checkSize(size) !== product.colors[selectedColor].id"
              @click="selectSize()"
            >{{ size.presentation }}</v-btn>
          </span>
        </v-btn-toggle>
        <h5 v-if="product.lengths.length > 0" class="mt-3 mb-1">Largo: 
          <span class="font-weight-light">{{ selectedLength || selectedLength === 0 ? product.lengths[selectedLength].name : '' }}</span>
        </h5>
        <v-btn-toggle
          v-model="selectedLength"
        >
          <span v-for="length in product.lengths">
            <v-btn
              class="mx-1"
              text
              small
              outlined
              :disabled="checkLengthDisabled(length)"
            >{{ length.presentation }}</v-btn>
          </span>
        </v-btn-toggle>
        <v-text-field
          v-model="quantity"
          class="mt-8"
          outlined
          dense
          label="Cantidad"
          :style="$vuetify.breakpoint.smAndUp ? 'max-width: 150px' : ''"
        >
          <template #prepend>
            <v-icon
              color="primary"
              class="cursor-pointer"
              :disabled="quantity === 1"
              @click="quantity--"
              >mdi-minus</v-icon
            >
          </template>

          <template #append-outer>
            <v-icon
              color="primary"
              class="cursor-pointer"
              @click="quantity++"
              >mdi-plus</v-icon
            >
          </template>
        </v-text-field>

        <v-row align="center">
          <v-col cols="12" sm="8" md="8" lg="8" xl="8">
            <v-btn
              color="primary"
              block
              :disabled="disableAddToCart"
              :loading="loading"
              @click.prevent="handleAddToCart"
            >Agregar al Carrito <v-icon right small>mdi-cart</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="4" md="4" lg="4" xl="4">
            <v-btn
              color="grey lighten-1"
              outlined
              block
              @click="wishlist = !wishlist"
            >Favorito <v-icon
                right
                color="red"
                v-text="wishlist ? 'mdi-heart' : 'mdi-heart-outline'"
              ></v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <!-- add to cart - wishlist -->
        <v-divider class="mt-4 py-1"></v-divider>
        <div
          class="d-flex flex-column flex-sm-row justify-sm-space-between"
        >
          <v-chip-group show-arrows>
            <v-chip
              v-for="tag in pro.tags"
              :key="tag"
              active
              active-class="primary--text"
              small
            >
              {{ tag }}
            </v-chip>
          </v-chip-group>
          <div class="d-flex align-center justify-start">
            <Socials />
          </div>
        </div>
      </v-col>
    </v-row>

    <Notification :snackbar="snackbar" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapState({
      signedIn: state => state.auth.signedIn,
      productImagesByColor: state => state.product.productImagesByColor,
      emptyImage: state => state.product.emptyImage,
      STORE_NAME: state => state.constants.STORE_NAME
    }),
    variantId() {
      return this.$store.state.product.product.currentVariant;
    },
    images() {
      const variant = this.product.variants.find(variant => variant.id === this.variantId);
      if (variant && variant.images.length) {
        return variant.images;
      } else {
        return (this.product.colors.length > 0 && this.productImagesByColor[this.product.colors[this.selectedColor].id]) ? this.productImagesByColor[this.product.colors[this.selectedColor].id] : [this.emptyImage];
      }
    },
    disableAddToCart() {
      return (!this.product.colors.length) ||
             (this.product.sizes.length > 0 && this.selectedSize === null && this.product.variants[this.selectedColor].options.size !== undefined) ||
             (this.product.lengths.length > 0 && this.selectedLength === null && this.product.variants[this.selectedColor].options.length !== undefined) ||
             (this.product.lengths.length > 0 && this.selectedLength === undefined);
    }
  },
  data() {
    return {
      loading: false,
      wishlist: false,
      quantity: 1,
      selectedImage: 0,
      selectedColor: 0,
      selectedSize: null,
      selectedLength: null,
      pro: {
        tags: ['Mujer', 'Popular', 'Novedad']
      },
      snackbar: {
        visible: false,
        color: '',
        title: '',
        text: '',
        icon: ''
      }
    }
  },
  mounted() {
    if (this.$route.query.from === 'stores') {
      this.$store.commit('product/setBreadcrumbs',
        [
          { text: this.STORE_NAME, to: '/' },
          { text: "Tiendas", to: "/stores" },
          { text: this.product.vendor.name, to: `/stores/${this.product.vendor.id}` }
        ]);
    } else if (this.$route.query.from === 'women') {
      this.$store.commit('product/setBreadcrumbs',
        [
          { text: this.STORE_NAME, to: '/' },
          { text: "Mujeres", to: "/women" }
        ]);      
    } else if (this.$route.query.from === 'men') {
      this.$store.commit('product/setBreadcrumbs',
        [
          { text: this.STORE_NAME, to: '/' },
          { text: "Hombres", to: "/men" }
        ]);      
    }
  },
  methods: {
    displayPrice(p) {
      var price = p;
      var dec_pos = price.indexOf('.');
      p = price.substring(dec_pos + 1) === '00' || price.substring(dec_pos + 1) === '0' ? '$ ' + price.substring(0, dec_pos) : '$ ' + price.substring(0, dec_pos) + '<sup>' + price.substring(dec_pos + 1) + '</sup>';
      return p.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    selectColor(color) {
      const item = this.product.variants.find(variant => variant.options.color.id === color.id)
      this.$store.commit('product/setProductCurrentVariant', item.id);
      this.selectedImage = 0;
      this.selectedSize = null;
      this.selectedLength = null;
    },
    selectSize() {
      this.selectedLength = null;
    },
    checkSize(size) {
      const item = this.product.variants.find(variant =>
        variant.options.color.id === this.product.colors[this.selectedColor].id &&
        (variant.options.size ? variant.options.size.id === size.id : false))

      return item ? item.options.color.id : null;
    },
    checkLengthDisabled(length) {
      var variant = this.product.variants.find(variant =>
        variant.options.color.id === this.product.colors[this.selectedColor].id &&
        ((variant.options.size && (this.selectedSize || this.selectedSize === 0)) ? variant.options.size.id === this.product.sizes[this.selectedSize].id : true) &&
        (variant.options.length ? variant.options.length.id === length.id : false))

      if (!this.selectedSize && this.selectedSize !== 0) {

        return (!variant || (variant && variant.options.size)) ? true : false;
      } else {

        return variant ? false : true;
      }
    },
    notification(visible, color, icon, title, text) {
      this.snackbar.visible = visible;
      this.snackbar.color = color;
      this.snackbar.icon = icon;
      this.snackbar.title = title;
      this.snackbar.text = text;
    },
    handleAddToCart(isBuyNow) {
      if (this.signedIn) {
        this.loading = !this.loading;

        const variantId = this.product.variants.find(variant =>
          (!variant.options.color || variant.options.color.id === this.product.colors[this.selectedColor].id) &&
          (!variant.options.size || variant.options.size.id === this.product.sizes[this.selectedSize].id) &&
          (!variant.options.length || variant.options.length.id === this.product.lengths[this.selectedLength].id)
        ).id

        let item = {
          variant_id: variantId,
          quantity: this.quantity
        };

        this.addItemToCart(item);
        if (isBuyNow && isBuyNow === true) {
          setTimeout(
            function() {
              this.$router.push('/profile/checkout');
            }.bind(this),
            500
          );
        }
        /*const cartItemsOnCookie = this.$cookies.get('cart', {
          parseJSON: true
        });
        let existItem;
        if (cartItemsOnCookie) {
          existItem = cartItemsOnCookie.cartItems.find(
            item => item.id === this.product.id
          );
        }

        let item = {
          id: this.product.id,
          quantity: this.quantity,
          price: this.product.price
        };
        if (existItem !== undefined) {
          if (this.quantity + existItem.quantity > 10) {
            this.$notify({
              group: 'addCartSuccess',
              title: 'Agregar al Carrito',
              text: 'No se pueden agregar más de 10 del mismo producto.'
            });
          } else {
            this.addItemToCart(item);
            if (isBuyNow && isBuyNow === true) {
              setTimeout(
                function() {
                  this.$router.push('/account/checkout');
                }.bind(this),
                500
              );
            }
          }
        } else {
          this.addItemToCart(item);
          if (isBuyNow && isBuyNow === true) {
            setTimeout(
              function() {
                this.$router.push('/account/checkout');
              }.bind(this),
              500
            );
          }
        }*/
      } else {
        this.$router.push('/profile/login');
      }
    },
    async addItemToCart(payload) {
      var variant = this.product.variants.find(variant => variant.id === payload.variant_id);
      var itemOptions = variant.options.color.name;
      if (variant.options.size) itemOptions = itemOptions + '/' + variant.options.size.presentation;
      if (variant.options.length) itemOptions = itemOptions + '/' + variant.options.length.presentation;

      const cartItems = await this.$store.dispatch('cart/addProductToCart', payload);
      if (!cartItems.error) {
        this.$store.dispatch('product/getCartProducts', cartItems);
        this.notification(true, 'success', 'mdi-check-circle', `${this.quantity} ${this.product.title} (${itemOptions})`, 'Fue agregado al carrito de compras!');
      } else {
        this.notification(true, 'warning', 'mdi-alert', `${this.quantity} ${this.product.title} (${itemOptions})`, 'No hay stock disponible!');
      }
      this.loading = !this.loading;
    }
  }
}
</script>
