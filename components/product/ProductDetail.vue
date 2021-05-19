<template>
  <v-container>
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
                :src="`${baseUrl}${image.attributes.styles[1].url}`"
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
            :src="`${baseUrl}${images[selectedImage].attributes.styles[4].url}`"
            class="rounded mx-4"
            :class="$vuetify.breakpoint.smOnly ? 'mx-auto' : ''"
            contain
          />
        </div>
      </v-col>
      <v-col cols="12" md="12" lg="6" xl="6">
        <h2>{{ product.title.toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) }}</h2>
        <Stars :size="20" />
        <h2 class="font-weight-bold" v-html="displayPrice()"></h2>
        <h5 v-if="product.colors.length > 0" class="mt-3 mb-1">Color: 
          <span class="font-weight-light">{{ product.colors[selectedColor].name }}</span>
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
              :disabled="selectedSize || selectedSize === 0 || product.sizes.length === 0 ? product.sizes.length > 0 && checkLength(length) !== product.sizes[selectedSize].id : true"
            >{{ length.presentation }}</v-btn>
          </span>
        </v-btn-toggle>
        <v-divider class="mt-5 mb-3 py-1"></v-divider>
        <v-text-field
          v-model="quantity"
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
    title: {
      default: true,
    },
    product: {
      type: Object,
      default: {}
    }
  },
  computed: {
    ...mapState({
      baseUrl: state => state.repository.baseUrl,
      signedIn: state => state.auth.signedIn
    }),
    variantId() {
      return this.$store.state.product.product.currentVariant;
    },
    images() {
      const variant = this.product.variants.find(variant => variant.id === this.variantId);
      return variant ? this.product.variants.find(variant => variant.id === this.variantId).images : [];
    },
    disableAddToCart() {
      return (this.product.sizes.length > 0 && this.selectedSize === null) || 
             (this.product.lengths.length > 0 && this.selectedLength === null) || 
             (this.product.lengths.length > 0 && this.selectedLength === undefined);
    }
  },
  data() {
    return {
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
  methods: {
    displayPrice() {
      var price = this.product.price
      var dec_pos = price.indexOf('.')
      return price.substring(dec_pos + 1) === '00' ? '$ ' + price.substring(0, dec_pos) : '$ ' + price.substring(0, dec_pos) + '<sup>' + price.substring(dec_pos + 1) + '</sup>'
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
        variant.options.size.id === size.id)

      return item ? item.options.color.id : null;
    },
    checkLength(length) {
      if (this.selectedSize || this.selectedSize === 0) {
        const item = this.product.variants.find(variant =>
          variant.options.color.id === this.product.colors[this.selectedColor].id &&
          variant.options.size.id === this.product.sizes[this.selectedSize].id &&
          variant.options.length.id === length.id)

        return item ? item.options.size.id : null;
      } else {
        return null;
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
        const variantId = this.product.variants.find(variant =>
          (this.product.colors.length === 0 || variant.options.color.id === this.product.colors[this.selectedColor].id) &&
          (this.product.sizes.length === 0 || variant.options.size.id === this.product.sizes[this.selectedSize].id) &&
          (this.product.lengths.length === 0 || variant.options.length.id === this.product.lengths[this.selectedLength].id)
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
      const cartItems = await this.$store.dispatch('cart/addProductToCart', payload);
      if (!cartItems.error) {
        this.$store.dispatch('product/getCartProducts', cartItems);
        this.notification(true, 'success', 'mdi-check-circle', `${this.quantity} ${this.product.title}`, 'Fue agregado al carrito de compras!');
      } else {
        this.notification(true, 'warning', 'mdi-alert', `${this.quantity} ${this.product.title}`, 'No hay stock disponible!');
      }
    }
  }
}
</script>
