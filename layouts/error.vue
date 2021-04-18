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
              Unfortunately the page you are looking for does not exist, or an
              error occurred.
            </p>
            <v-btn outlined color="primary" to="/">Go to Homepage</v-btn>
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
