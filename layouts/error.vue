<template>
  <v-app>
    <v-container class="my-12">
      <v-row justify="center" align="center">
        <v-col cols="10">
          <div v-if="error.statusCode === 404" class="mx-auto text-center">
            <v-img
              :src="require(`~/assets/svg/404.svg`)"
              contain
              height="300"
              class="mb-6"
            ></v-img>
            <p>
              La página que estás buscando no existe.
            </p>
            <v-btn outlined color="primary" to="/">Ir a la página principal</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>
