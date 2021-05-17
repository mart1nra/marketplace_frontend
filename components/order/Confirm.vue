<template>
	<v-row>
	  <v-col cols="12" sm="12" md="8" lg="8" xl="8">
	    <v-col cols="12" lass="px-0">
	      <v-card
	        flat
	        class="elevation-cs mb-3 d-flex align-center pa-6 justify-center justify-lg-space-between rounded-lg"
	      >
		      <section class="payment-form dark">
		        <div class="container__payment">
		          <div class="block-heading">
		            <h2>Revisar y confirmar la compra</h2>
		          </div>
		        </div>
		      </section>
	      </v-card>
	    </v-col>
	  </v-col>
	  <v-col cols="12" sm="12" md="4" lg="4" xl="4">
	    <v-card class="pa-0 pa-md-6 elevation-cs mt-3">
	      <h3 class="text-uppercase font-weight-black">Total</h3>
	      <v-divider class="my-3"></v-divider>
	      <div class="d-flex justify-space-between align-center">
	        <h4>Subtotal</h4>
	        <div v-html="displayPrice(cartAmount)"></div>
	      </div>
	      <v-btn
	        color="success"
	        block
	        tile
	        class="my-4"
	        @click="confirmCheckout"
	      >
	        <v-icon left>mdi-cart-arrow-right</v-icon> Confirmar compra
	      </v-btn>
	    </v-card>
	  </v-col>
	</v-row>
</template>

<script>
export default {
  props: {
    cartAmount: {
      default: 0,
    }
  },
  data() {
    return {
      e1: 1,
      idSelect: '',
      idItems: ['DNI', 'Cédula', 'L.C.', 'L.E.', 'Otro']
    }
  },
  methods: {
    displayPrice(p) {
      var price = p;
      var dec_pos = price.indexOf('.');
      return price.substring(dec_pos + 1) === '00' || price.substring(dec_pos + 1) === '0' ? '$ ' + price.substring(0, dec_pos) : '$ ' + price.substring(0, dec_pos) + '<sup>' + price.substring(dec_pos + 1) + '</sup>';
    },
    async confirmCheckout() {
    	await this.$store.dispatch('cart/processCheckout', '');
    	const cartItems = await this.$store.dispatch('cart/getCartInfo');
      this.$store.dispatch('product/getCartProducts', cartItems);
    }
  }
}
</script>