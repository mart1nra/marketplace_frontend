<template>
	<v-dialog
	  v-model="editOn"
	  max-width="700px"
	  content-class="edit-dialog"
	>
	  <v-card tile>
	    <v-list-item>
	      <v-list-item-content class="my-1 ml-1">
	        <span class="text-h5 font-weight-light">Editar artículo <v-icon size="30" class="drawer-close text--disabled mt-1" @click.stop="closeEdit()">mdi-window-close</v-icon></span>
	      </v-list-item-content>
	    </v-list-item>

	    <v-divider></v-divider>

	    <v-row no-gutters class="mt-2">
		    <v-col v-if="images" cols="12" md="12" lg="5" xl="5" class="mb-12">
          <v-img
            max-height="390px"
            max-width="580px"
            :src="images[selectedImage]"
            class="mx-4 mt-2"
            :class="$vuetify.breakpoint.smOnly ? 'mx-auto' : ''"
            contain
          />
		    	<v-row class="ml-4 pr-6">
            <v-col v-for="(image, i) in images" :key="i"
            	class="cursor-pointer mt-2 no-gutters"
            	cols="3"
            >
            	<v-hover>
	              <v-img
	              	slot-scope="{ hover }"
	                :src="image"
	                height="82"
	                width="62"
	                contain
	                :class="i === selectedImage || hover ? 'image-selected' : ''"
	                @click="selectedImage = i"
	              ></v-img>
	            </v-hover>
            </v-col>		    		
		    	</v-row>
		    </v-col>
		    <v-col v-if="product" cols="12" md="12" lg="7" xl="7" class="mt-1 mb-12">
		      <div>
		        <div class="text-overline font-weight-light my-n1">{{ product.vendor.name }}</div>
		        <div class="text-h5 font-weight-light text-capitalize">{{ product.title }}</div>
		        <Stars />
		        <div class="text-body-1 my-4" v-html="displayPrice(product.price)"></div>
		        <div class="text-caption font-weight-light">
		        	<NuxtLink :to="`/product/${product.slug}?from=women`">
		        		Todos los detalles del producto<v-icon size="14">mdi-chevron-right</v-icon>
		        	</NuxtLink>
		        </div>
		        <div v-if="product.colors.length > 0" class="text--disabled text-caption mb-1">Color 
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

		        <div class="mt-4">
		          <v-btn
		            class="text-h6 font-weight-medium white--text ff-fira-condensed py-5 px-10"
		            color="#D4AF37"
		            tile
		            large
		            elevation="0"
		            :loading="loading"
		            @click.prevent="updateCartItem"
		          >Actualizar Artículo
		          </v-btn>
		        </div>
		      </div>
		    </v-col>
	    </v-row>
	  </v-card>
	</v-dialog>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    lineItemId: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapState({
      edit: state => state.cart.editOn,
      products: state => state.product.cartProducts,
      product: state => state.product.cartProduct,
      cart: state => state.cart.cartItems,
      emptyImage: state => state.product.emptyImage,
      productImagesByColor: state => state.product.productImagesByColor
    }),
    editOn: {
      get: function() {
        return this.edit;
      },
      set: function(value) {
      	this.selectedColor = 0;
      	this.selectedImage = 0;
      	this.loading = false;
        this.$store.commit('cart/setEditOn', value);
      }
    },
    variantId() {
      return this.$store.state.product.cartProduct.currentVariant;
    },
    images() {
    	if (this.product) {
	      const variant = this.product.variants.find(variant => variant.id === this.variantId);

	      if (variant && variant.images.length) {
	        return variant.images;
	      } else {
	        return (this.product.colors.length > 0 && this.productImagesByColor[this.product.colors[this.selectedColor].id]) ? this.productImagesByColor[this.product.colors[this.selectedColor].id] : [this.emptyImage];
	      }
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
    }
  },
  data () {
    return {
    	loading: false,
    	quantity: 1,
      selectedImage: 0,
      selectedColor: 0,
      selectedSize: null,
      selectedLength: null,
      sizeChanged: false,
      lengthChanged: false,
      addToCartSubmited: false
    }
  },
  methods: {
    displayPrice(p) {
      var price = p;
      var dec_pos = price.indexOf('.');
      p = price.substring(dec_pos + 1) === '00' || price.substring(dec_pos + 1) === '0' ? '$ ' + price.substring(0, dec_pos) : '$ ' + price.substring(0, dec_pos) + '<sup>' + price.substring(dec_pos + 1) + '</sup>';
      return p.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    closeEdit() {
    	this.selectedColor = 0;
    	this.selectedImage = 0;
      this.$store.commit('cart/setEditOn', false);
      this.loading = false;
    },
    findVariant() {
    	if (this.product) {
	      return this.product.variants.find(variant =>
	               (!variant.options.color || variant.options.color.id === this.product.colors[this.selectedColor].id) &&
	               (!variant.options.size || ((this.selectedSize || this.selectedSize === 0) && variant.options.size.id === this.product.sizes[this.selectedSize].id)) &&
	               (!variant.options.length || ((this.selectedLength || this.selectedLength === 0) && variant.options.length.id === this.product.lengths[this.selectedLength].id))
	             );
    	}
    },
    async selectColor(color) {
    	this.selectedImage = 0;
      this.selectedSize = null;
      this.selectedLength = null;
      this.sizeChanged = false;
      this.lengthChanged = false;
      this.addToCartSubmited = false;

      const item = this.product.variants.find(variant => variant.options.color.id === color.id);

      this.$store.commit('product/setCartProductCurrentVariant', item.id);

      if (this.product.sizes.length === 0 && this.product.lengths.length === 0) {
        await this.$store.dispatch('product/getStockItem', { item: item.id, vendor: this.product.vendor.id, type: 'cart' });
      }
    },
    async selectSize() {
      this.sizeChanged = !this.sizeChanged;
      this.lengthChanged = false;
      this.selectedLength = null;
      this.addToCartSubmited = false;

      var variant = this.findVariant();

      if (variant) {
        await this.$store.dispatch('product/getStockItem', { item: variant.id, vendor: this.product.vendor.id, type: 'cart' });
      }
    },
    async selectLength() {
      this.addToCartSubmited = false;

      var variant = this.findVariant();

      if (variant) {
        await this.$store.dispatch('product/getStockItem', { item: variant.id, vendor: this.product.vendor.id, type: 'cart' });
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
    async updateCartItem() {
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

	      var cartItems = await this.$store.dispatch('cart/addProductToCart', item);
	      if (!cartItems.error) {
	        this.$store.dispatch('product/getCartProducts', cartItems);

		      this.$emit('update');
	      }        

        this.closeEdit();
      } else {
        this.loading = !this.loading;
      }
    }
  }
}
</script>

<style scoped>
	.edit-dialog {
		border-radius: 0px !important;
	}

  .drawer-close {
    float: right;
  }

  .ff-fira-condensed {
    font-family: 'Fira Sans Extra Condensed', sans-serif !important;
    letter-spacing: 3px !important;
  }

  .image-selected {
  	border-style: solid;
  	border-width: 1px;
  }
</style>