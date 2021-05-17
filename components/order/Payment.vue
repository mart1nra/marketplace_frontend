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
		            <h2>Card Payment</h2>
		          </div>
		          <div class="form-payment">
		            <div class="payment-details">
		              <form id="form-checkout">
	                  <h3 class="title">Buyer Details</h3>
	                  <div class="row">
	                    <div class="form-group col">
	                      <v-text-field
	                      	id="form-checkout__cardholderEmail"
	                      	name="cardholderEmail"
	                      	type="email"
	                      	label="E-mail"
	                      ></v-text-field>
	                    </div>
	                  </div>
	                  <div class="row">
	                    <div class="form-group col-sm-5">
	                      <v-select
	                      	id="form-checkout__identificationType"
	                      	name="identificationType"
	                      	v-model="idSelect"
	                      	:items="idItems"
	                      	label="Tipo de documento"
	                      ></v-select>
	                    </div>
	                    <div class="form-group col-sm-7">
	                      <v-text-field
	                      	id="form-checkout__identificationNumber"
	                      	name="docNumber"
	                      	label="Nro. de documento"
	                      ></v-text-field>
	                    </div>
	                  </div>
	                  <br>
	                  <h3 class="title">Card Details</h3>
	                  <v-row>
	                    <v-col cols="12" sm="12" md="7" lg="7" xl="7">
	                      <v-text-field
	                      	id="form-checkout__cardholderName"
	                      	name="cardholderName"
	                      	label="Nombre y apellido"
	                      ></v-text-field>
	                    </v-col>
	                    <v-col cols="12" sm="12" md="2" lg="2" xl="2">
                        <v-text-field
                        	id="form-checkout__cardExpirationMonth"
                        	name="cardExpirationMonth"
                        	label="MM"
                        ></v-text-field>
	                    </v-col>
	                    <v-col cols="12" sm="12" md="1" lg="1" xl="1" class="mt-6">
	                    	<span>/</span>
	                    </v-col>
	                    <v-col cols="12" sm="12" md="2" lg="2" xl="2">
                        <v-text-field
                        	id="form-checkout__cardExpirationYear"
                        	name="cardExpirationYear"
                        	label="YY"
                        ></v-text-field>
	                    </v-col>
	                  </v-row>
	                  <v-row>
	                    <div class="form-group col-sm-7">
	                      <v-text-field
	                      	id="form-checkout__cardNumber"
	                      	name="cardNumber"
	                      	label="Nro. de tarjeta"
	                      ></v-text-field>
	                    </div>
	                    <div class="form-group col-sm-5">
	                      <v-text-field
	                      	id="form-checkout__securityCode"
	                      	name="securityCode"
	                      	label="Código de seguridad"
	                      ></v-text-field>
	                    </div>
	                    <div class="form-group col-sm-12">
	                      <v-select
	                      	id="form-checkout__installments"
	                      	name="installments"
	                      	label="Cantidad de cuotas"
	                      ></v-select>
	                    </div>
	                    <div id="issuerInput" class="form-group col-sm-12 hidden">
	                      <select id="form-checkout__issuer" name="issuer" class="form-control"></select>
	                    </div>
	                    <div class="form-group col-sm-12">
	                      <input type="hidden" id="amount" />
	                      <input type="hidden" id="description" />
	                    </div>
	                  </v-row>
		              </form>
		            </div>
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
	        @click="continueToConfirm"
	      >
	        <v-icon left>mdi-cart-arrow-right</v-icon> Continuar
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
    async continueToConfirm() {
    	await this.$store.dispatch('cart/processPayment', '');
      this.$emit('continueClicked');
    }
  }
}
</script>