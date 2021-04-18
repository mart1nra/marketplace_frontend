<template>
	<v-container fluid fill-height>
	  <v-layout flex align-center justify-center>
	    <v-flex xs12 sm4 elevation-cs>
	      <v-toolbar class="px-5" color="primary">
	        <v-toolbar-title class="white--text"><h4>Para ingresar escriba su usuario y contraseña</h4></v-toolbar-title>
	      </v-toolbar>
	      <v-card flat>
	        <v-card-text class="pt-4">
	          <div>
              <v-form v-model="valid" ref="form">
                <v-text-field
                  label="E-mail"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Contraseña"
                  v-model="password"
                  min="8"
                  type="password"
                  :rules="passwordRules"
                  required
                ></v-text-field>
                <v-layout justify-space-between>
                    <v-btn
                      class="mt-2"
                      color="primary"
                      :disabled="!valid"
                      @click.prevent="handleSubmit"
                    >Ingresar</v-btn>
                    <NuxtLink to="/">Olvidé mi contraseña</NuxtLink>
                </v-layout>
              </v-form>
	          </div>
	        </v-card-text>
	      </v-card>
	    </v-flex>
	  </v-layout>
	</v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      password: '',
      passwordRules: [
        (v) => !!v || 'Contraseña es obligatoria',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail es obligatorio',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail debe ser válido'
      ],
    }
  },
  methods: {
    async handleSubmit() {
      const response = await this.$store.dispatch('account/getAccountInfo', { username: this.email, password: this.password });
      if (response) {
          /*const cartItems = await this.$store.dispatch('cart/getCartInfo');
          this.$store.dispatch('product/getCartProducts', cartItems);
          this.$store.dispatch('auth/setAuthStatus', true);
          this.$router.push('/');*/
      } else {
          //this.loginError = true;
      }
    }
  }
}
</script>