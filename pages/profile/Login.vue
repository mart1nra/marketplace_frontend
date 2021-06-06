<template>
  <v-container>
    <v-row>
      <v-col
        md="5"
        offset-md="1"
      >
        <div class="text-h5 font-weight-light">Iniciar sesión</div>
        <v-divider color="grey" class="my-5"></v-divider>

        <div v-if="loginError" class="error-message text-caption color-gold mt-8">
          <v-icon class="mdi-18px mr-1 mb-1 color-gold">mdi-alert-circle</v-icon>
          No reconocemos esta información de acceso. Por favor, intentá de nuevo.
        </div>
        <div class="mt-8">
          <v-form v-model="valid" ref="form">
            <v-text-field
              label="Dirección de email"
              v-model="email"
              :rules="emailRules"
              color="grey lighten-1"
              required
              outlined
            ></v-text-field>
            <v-text-field
              label="Contraseña"
              v-model="password"
              min="8"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              :rules="passwordRules"
              color="grey lighten-1"
              required
              outlined
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <div class="text-caption font-weight-light mt-0">
              <NuxtLink to="/">¿Olvidaste tu contraseña?<v-icon size="18">mdi-chevron-right</v-icon></NuxtLink>
            </div>
            <div class="mt-4">
              <v-btn
                class="text-h6 font-weight-medium white--text ff-fira-condensed py-5 px-10"
                color="#D4AF37"
                tile
                large
                elevation="0"
                @click.stop="handleSubmit"
              >Inicio de Sesión Seguro
              </v-btn>
            </div>
          </v-form>
        </div>
      </v-col>

      <v-col md="5">
        <div class="text-h5 font-weight-light">Crear una cuenta</div>
        <v-divider color="grey" class="my-5"></v-divider>

        <div class="text-caption font-weight-light mt-7">
          Regístrate en eStylo para disfrutar de servicios personalizados,<br>entre los que se incluyen:
        </div>
        <div class="text-caption font-weight-light mt-3">
          <span class="text-h6 mr-1" style="line-height:1rem;vertical-align:sub;">&bull;</span>
          Estado del pedido en línea<br>
          <span class="text-h6 mr-1" style="line-height:1rem;vertical-align:sub;">&bull;</span>
          Emails exclusivos<br>
          <span class="text-h6 mr-1" style="line-height:1rem;vertical-align:sub;">&bull;</span>
          Guardar direcciones de envío<br>
        </div>
        <div class="mt-4">
          <v-btn
            class="text-h6 font-weight-medium white--text ff-fira-condensed py-5 px-10"
            color="grey darken-4"
            tile
            large
            outlined
            elevation="0"
            @click.stop=""
          >Crear Una Cuenta
          </v-btn>
        </div>
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
        (v) => !!v || 'Ingresá una contraseña',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'Ingresa una dirección de email',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Ingresa una dirección de email correcta'
      ],
      showPassword: false
    }
  },
  created() {
    if (this.signedIn) this.$router.push('/');
  },
  methods: {
    async handleSubmit() {
      this.$nuxt.$loading.start();
      const response = await this.$store.dispatch('account/getAccountInfo', { username: this.email, password: this.password });
      if (response) {
          const cartItems = await this.$store.dispatch('cart/getCartInfo');
          this.$store.dispatch('product/getCartProducts', cartItems);
          this.$store.dispatch('auth/setAuthStatus', true);
          this.$router.push('/');
      } else {
          this.loginError = true;
      }
      this.$nuxt.$loading.finish();
    }
  }
}
</script>

<style scoped>
  .color-gold {
    color: #D4AF37;
  }

  .error-message {
    padding-left : 0.5rem;
    padding-right: 0.5rem;
    padding-top : 0.5rem;
    padding-bottom: 0.4rem;
    border-style: solid;
    border-width: 1px;
  }

  .ff-fira-condensed {
    font-family: 'Fira Sans Extra Condensed', sans-serif !important;
    letter-spacing: 3px !important;
  }
</style>