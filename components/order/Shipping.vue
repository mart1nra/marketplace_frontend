<template>
	<v-row>
	  <v-col cols="12" sm="12" md="8" lg="8" xl="8">
	    <v-col cols="12" lass="px-0">
	      <v-card
	        flat
	        class="elevation-cs mb-3 d-flex align-center pa-6 justify-center justify-lg-space-between rounded-lg"
	      >
          <v-row>
          	<v-col>
          		<h3>Domicilio de envío</h3>
          		<v-row>
	          		<v-col cols="6" sm="12" md="6" lg="6" xl="6">
				          <v-text-field
				            v-model="shipAddress.firstname"
				            label="Nombre"
				          ></v-text-field>
				        </v-col>
				        <v-col cols="6" sm="12" md="6" lg="6" xl="6">
				          <v-text-field
				            v-model="shipAddress.lastname"
				            label="Apellido"
				          ></v-text-field>
				        </v-col>
				      </v-row>
          		<v-row>
	          		<v-col cols="9" sm="12" md="9" lg="9" xl="9">
				          <v-text-field
				            v-model="shipAddress.address1"
				            label="Calle y número"
				          ></v-text-field>
				        </v-col>
				        <v-col cols="3" sm="12" md="3" lg="3" xl="3">
				          <v-text-field
				            v-model="shipAddress.address2"
				            label="Piso/Departamento"
				          ></v-text-field>
				        </v-col>
				      </v-row>
          		<v-row>
	          		<v-col cols="6" sm="12" md="6" lg="6" xl="6">
				          <v-text-field
				            v-model="shipAddress.state_name"
				            label="Provincia"
				          ></v-text-field>
				        </v-col>
				        <v-col cols="6" sm="12" md="6" lg="6" xl="6">
				          <v-text-field
				            v-model="shipAddress.city"
				            label="Localidad/Barrio"
				          ></v-text-field>
				        </v-col>
				      </v-row>
          		<v-row>
	          		<v-col cols="6" sm="12" md="6" lg="6" xl="6">
				          <v-text-field
				            v-model="shipAddress.zipcode"
				            label="Código postal"
				          ></v-text-field>
				        </v-col>
	          		<v-col cols="6" sm="12" md="6" lg="6" xl="6">
				          <v-text-field
				            v-model="shipAddress.phone"
				            label="Teléfono de contacto"
				          ></v-text-field>
				        </v-col>
				      </v-row>
		        </v-col>
        	</v-row>
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
	        @click="continueToPayment"
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
      shipAddress: {
	      firstname: '',
	      lastname: '',
	      address1: '',
	      address2: '',
	      city: '',
	      phone: '',
	      zipcode: '',
	      state_name: '',
	      country_iso: 'AR'
    	}
    }
  },
  methods: {
    displayPrice(p) {
      var price = p;
      var dec_pos = price.indexOf('.');
      return price.substring(dec_pos + 1) === '00' || price.substring(dec_pos + 1) === '0' ? '$ ' + price.substring(0, dec_pos) : '$ ' + price.substring(0, dec_pos) + '<sup>' + price.substring(dec_pos + 1) + '</sup>';
    },
    async continueToPayment() {
    	await this.$store.dispatch('cart/processShipping', this.shipAddress);
      this.$emit('continueClicked');
    }
  }
}
</script>