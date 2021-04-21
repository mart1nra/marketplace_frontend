<template>
  <v-container v-if="!signedIn">
    <v-row justify="center" class="py-12">
      <v-col cols="12" xs="10" sm="8" md="8" lg="6" xl="6">
        <h2 class="primary--text">Ingrese su Usuario y Contraseña</h2>
        <v-divider class="my-3"></v-divider>
        <v-row>
          <v-col>
            <v-card
              flat
              class="elevation-cs ml-0 d-flex align-center pa-6 justify-center justify-lg-space-between rounded-lg"
            >
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
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      signedIn: state => state.auth.signedIn
    })
  },
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
  created() {
    if (this.signedIn) this.$router.push('/');
  },
  methods: {
    async handleSubmit() {
      const response = await this.$store.dispatch('account/getAccountInfo', { username: this.email, password: this.password });
      if (response) {
          const cartItems = await this.$store.dispatch('cart/getCartInfo');
          this.$store.dispatch('product/getCartProducts', cartItems);
          this.$store.dispatch('auth/setAuthStatus', true);
          this.$router.push('/');
      } else {
          this.loginError = true;
      }
    }
  }
}
</script>