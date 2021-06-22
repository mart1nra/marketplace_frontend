<template>
  <v-row justify="center">

    <CartAddedDrawer
      :image="images[0]"
      :product="product"
      :options="addedProductOptions"
    />

    <v-col cols="12" md="12" lg="8" xl="8">
      <div v-if="images.length > 0">
        <v-row class="mr-0">
          <v-col v-if="images.length === 1"
            class="d-flex child-flex no-gutters"
            cols="12"
          >
            <v-img
              :src="images[0]"
              :aspect-ratio="23/32"
              class="mt-2 mb-4 ml-3 mr-n1"
            >
            </v-img>
          </v-col>          
          <v-col v-else
            v-for="(image, i) in images" :key="i"
            class="d-flex child-flex no-gutters"
            cols="6"
          >
            <v-img
              :src="image"
              :aspect-ratio="23/32"
              class="mt-2 mb-4 ml-3 mr-n1"
            >
            </v-img>
          </v-col>
        </v-row>
      </div>
    </v-col>
    <v-col cols="12" md="12" lg="4" xl="4" class="mt-1">
      <div class="sticky-top">
        <div class="text-overline font-weight-light my-n1">{{ product.vendor.name }}</div>
        <div class="text-h5 font-weight-light text-capitalize">{{ product.title }}</div>
        <Stars />
        <div class="text-body-1 mt-4" v-html="displayPrice(product.price)"></div>
        <div v-if="product.colors.length > 0" class="text--disabled text-caption mt-3 mb-1">Color 
          <span class="text--primary text-caption font-weight-light">{{ product.colors[selectedColor].name }}</span>
        </div>
        <v-btn-toggle
          v-model="selectedColor"
          mandatory
          class="ml-n1"
        >
          <span v-for="color in product.colors">
            <v-btn v-if="color.presentation === '#FFFFFF'"
              class="mx-1"
              outlined
              small
              tile
              min-width="33"
              min-height="33"
              :color="color.presentation"
              @click="selectColor(color)"
            >
            </v-btn>
            <v-btn v-else
              class="mx-1"
              dark
              depressed
              small
              tile
              min-width="33"
              min-height="33"
              :color="color.presentation"
              @click="selectColor(color)"
            >
            </v-btn>
          </span>
        </v-btn-toggle>
        <h5 v-if="product.sizes.length > 0" class="text--disabled text-caption mt-4 mb-1">
          <span v-if="!sizeChanged || selectedSize || selectedSize === 0">Talle</span><span v-else class="color-gold"><v-icon class="mdi-18px mr-1 mb-1 color-gold">mdi-alert-circle</v-icon>Por favor elegí un Talle</span>
          <span class="text--primary text-caption font-weight-light">{{ selectedSize || selectedSize === 0 ? product.sizes[selectedSize].name : '' }}</span>
        </h5>
        <v-btn-toggle
          v-model="selectedSize"
          class="ml-n1"
          @change="selectSize()"
        >
          <span v-for="size in product.sizes">
            <v-btn
              class="mx-1 text-caption"
              small
              outlined
              tile
              min-width="33"
              min-height="33"
              max-width="33"
              max-height="33"
              :disabled="checkSize(size) !== product.colors[selectedColor].id"
            >{{ size.presentation }}</v-btn>
          </span>
        </v-btn-toggle>
        <h5 v-if="product.lengths.length > 0" class="text--disabled text-caption mt-4 mb-1">
          <span v-if="!lengthChanged || selectedLength || selectedLength === 0">Largo</span><span v-else class="color-gold"><v-icon class="mdi-18px mr-1 mb-1 color-gold">mdi-alert-circle</v-icon>Por favor elegí un Largo</span>
          <span class="text--primary text-caption font-weight-light">{{ selectedLength || selectedLength === 0 ? product.lengths[selectedLength].name : '' }}</span>
        </h5>
        <v-btn-toggle
          v-model="selectedLength"
          class="ml-n1"
          @change="selectLength()"
        >
          <span v-for="length in product.lengths">
            <v-btn
              class="mx-1 text-caption text-capitalize"
              small
              outlined
              tile
              min-width="46"
              min-height="33"
              max-height="33"
              max-width="46"
              :disabled="checkLengthDisabled(length)"
            >{{ length.presentation }}</v-btn>
          </span>
        </v-btn-toggle>
        <v-text-field
          v-model="quantity"
          class="text-caption align-center text-center font-weight-light pl-0 mt-8"
          solo
          dense
          flat
          readonly
          hide-details
          color="grey darken-2"
          :style="$vuetify.breakpoint.smAndUp ? 'max-width: 120px' : ''"
        >
          <template #prepend>
            <v-btn
              class="text-h4 font-weight-thin mr-1"
              small
              :outlined="quantity !== 1"
              tile
              min-width="33"
              min-height="33"
              max-width="33"
              max-height="33"
              color="grey"
              :disabled="quantity === 1"
              @click="quantity--"
            >-</v-btn>
          </template>

          <template #append-outer>
            <v-btn
              class="text-h6 font-weight-light"
              small
              :outlined="quantity !== 7"
              tile
              min-width="33"
              min-height="33"
              max-width="33"
              max-height="33"
              color="grey"
              :disabled="quantity >= variantStock || quantity === 7"
              @click="quantity++"
            >+</v-btn>
          </template>
        </v-text-field>

        <div class="text-caption my-3">
          <span v-if="variantStock > 0" class="color-gold">Stock disponible ({{ variantStock }})</span>
          <span v-else-if="variantStock === 0" class="text--disabled">Sin stock</span>
        </div>

        <div class="mt-6">
          <v-btn
            class="text-h6 font-weight-medium white--text ff-fira-condensed py-5 px-10"
            color="#D4AF37"
            tile
            large
            elevation="0"
            :loading="loading"
            @click.prevent="handleAddToCart"
          >Agregar Al Carrito
          </v-btn>
        </div>

        <div>
          <div class="text-h6 font-weight-light mt-6">Descripción</div>
          <div class="text-caption mt-1" v-html="productDescription()"></div>
        </div>
      </div>
    </v-col>
  </v-row>
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
      cart: state => state.cart.cartItems,
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
    variantStock() {
      var variant = this.findVariant();

      if (variant) {
        var cartItem = this.cart.find(item => item.variant_id === variant.id);

        return cartItem ? this.product.stock - cartItem.quantity : this.product.stock;
      } else {
        return null;
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
      quantity: 1,
      selectedColor: 0,
      selectedSize: null,
      selectedLength: null,
      sizeChanged: false,
      lengthChanged: false,
      addToCartSubmited: false,
      addedProductOptions: {
        'quantity': 0,
        'color': '',
        'size': '',
        'length': ''
      },
      drawerOn: false
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
  async fetch() {
    if (this.product.sizes.length === 0 && this.product.lengths.length === 0) {
      await this.$store.dispatch('product/getStockItem', { item: this.product.variants[0].id, vendor: this.product.vendor.id, type: 'detail' });
    }
  },
  methods: {
    displayPrice(p) {
      var price = p;
      var dec_pos = price.indexOf('.');
      p = price.substring(dec_pos + 1) === '00' || price.substring(dec_pos + 1) === '0' ? '$ ' + price.substring(0, dec_pos) : '$ ' + price.substring(0, dec_pos) + '<sup>' + price.substring(dec_pos + 1) + '</sup>';
      return p.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    findVariant() {
      return this.product.variants.find(variant =>
               (!variant.options.color || variant.options.color.id === this.product.colors[this.selectedColor].id) &&
               (!variant.options.size || ((this.selectedSize || this.selectedSize === 0) && variant.options.size.id === this.product.sizes[this.selectedSize].id)) &&
               (!variant.options.length || ((this.selectedLength || this.selectedLength === 0) && variant.options.length.id === this.product.lengths[this.selectedLength].id))
             );
    },
    async selectColor(color) {
      this.selectedSize = null;
      this.selectedLength = null;
      this.sizeChanged = false;
      this.lengthChanged = false;
      this.addToCartSubmited = false;

      const item = this.product.variants.find(variant => variant.options.color.id === color.id);

      this.$store.commit('product/setProductCurrentVariant', item.id);

      if (this.product.sizes.length === 0 && this.product.lengths.length === 0) {
        await this.$store.dispatch('product/getStockItem', { item: item.id, vendor: this.product.vendor.id, type: 'detail' });
      }
    },
    async selectSize() {
      this.sizeChanged = !this.sizeChanged;
      this.lengthChanged = false;
      this.selectedLength = null;
      this.addToCartSubmited = false;

      var variant = this.findVariant();

      if (variant) {
        await this.$store.dispatch('product/getStockItem', { item: variant.id, vendor: this.product.vendor.id, type: 'detail' });
      }
    },
    async selectLength() {
      this.addToCartSubmited = false;

      var variant = this.findVariant();

      if (variant) {
        await this.$store.dispatch('product/getStockItem', { item: variant.id, vendor: this.product.vendor.id, type: 'detail' });
      }
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
    productDescription() {
      var description = '';

      this.product.description.split(/\r\n|\n\r|\n|\r/).forEach(line => {
        if (line.indexOf('-') === 0) {
          line = line.replace('-', '<span class="text-h6 mr-1" style="line-height:1.5rem;vertical-align:sub;">&bull;</span>')
        }
        description = description + line + '<br>';
      });

      return description;
    },
    optionsValidated() {
      this.sizeChanged = true;

      if (this.selectedSize || this.selectedSize == 0) {
        this.lengthChanged = true;
      }

      if (this.product.sizes.length > 0) {
        var variant = this.product.variants.find(variant =>
          variant.options.color.id === this.product.colors[this.selectedColor].id && variant.options.size);

        if (variant && this.selectedSize == null) {

          return false;
        } else {
          this.sizeChanged = false;
        }
      }
      if (this.product.lengths.length > 0) {
        var variant = this.product.variants.find(variant =>
          variant.options.color.id === this.product.colors[this.selectedColor].id &&
          ((variant.options.size && (this.selectedSize || this.selectedSize === 0)) ? variant.options.size.id === this.product.sizes[this.selectedSize].id : true) && variant.options.length);

        if (variant && this.selectedLength == null) {
          this.lengthChanged = true;

          return false;
        } else {
          this.lengthChanged = false;
        }
      }

      return true;
    },
    handleAddToCart() {
      if (this.signedIn) {
        this.loading = !this.loading;
        this.addToCartSubmited = true;

        if (this.optionsValidated() && this.variantStock > 0) {
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
        } else {
          this.loading = !this.loading;
        }
      } else {
        this.$router.push('/profile/login');
      }
    },
    async addItemToCart(payload) {
      const cartItems = await this.$store.dispatch('cart/addProductToCart', payload);
      if (!cartItems.error) {
        this.$store.dispatch('product/getCartProducts', cartItems);

        var variant = this.product.variants.find(variant => variant.id === payload.variant_id);

        this.addedProductOptions.quantity = payload.quantity;
        this.addedProductOptions.color = variant.options.color.name;
        if (variant.options.size) {
          this.addedProductOptions.size = variant.options.size.presentation;
        }
        if (variant.options.length) {
          this.addedProductOptions.length = variant.options.length.presentation;
        }
        this.$store.commit('cart/setDrawerAddItemOn', true);
      }
      this.loading = !this.loading;
    }
  }
}
</script>

<style scoped>
  .sticky-top {
    position: sticky;
    top: 10px;
  }

  .ff-fira-condensed {
    font-family: 'Fira Sans Extra Condensed', sans-serif !important;
    letter-spacing: 3px !important;
  }

  .color-gold {
    color: #D4AF37;
  }
</style>
