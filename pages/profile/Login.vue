<template>
	<v-container fluid>
    <v-row justify="center" class="mt-15">
      <v-col cols="10" xs="10" md="6" sm="8" lg="4">
        <h2 class="primary--text">Para ingresar escriba su usuario y contraseña</h2>
        <v-divider class="my-3"></v-divider>
      </v-col>
    </v-row>
	  <v-layout flex align-center justify-center>
	    <v-flex xs10 sm8 md6 lg4 elevation-cs>
	      <v-card class="elevation-cs ml-0 d-flex align-center pa-6 justify-center justify-md-space-between rounded-lg">
	        <v-card-text class="pt-4">
            <v-alert v-if="loginError" type="error">
              E-mail o contraseña incorrecta. Por favor verificar.
            </v-alert>
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
      loginError: false,
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
          //const cartItems = await this.$store.dispatch('cart/getCartInfo');
          //this.$store.dispatch('product/getCartProducts', cartItems);
          this.$store.dispatch('auth/setAuthStatus', true);
          this.$router.push('/');
      } else {
          this.loginError = true;
      }
    }
  }
}
</script>