<template>
  <v-container
    class="px-0 px-md-12 py-6 rounded my-12"
    :class="!$vuetify.theme.dark ? 'bg-red-cs elevation-cs-3' : 'grey darken-4'"
  >
    <h2 class="font-weight-bold text-center text-md-left">
      Highest Rated Products
    </h2>
    <v-row v-if="allProducts && !loading">
      <v-slide-group v-model="slider" center-active class="my-10" show-arrows>
        <v-slide-item v-for="(product, index) in allProducts" :key="index">
          <v-hover v-slot="{ hover }">
            <v-card
              v-if="product"
              :class="{ 'elevation-cs': hover }"
              class="pa-4"
              width="250"
              height="auto"
              draggable
              flat
              hover
              tile
              color="transparent"
              :to="`product/1`"
            >
              <v-img height="125" width="100%" contain :src="product.image">
                <template #placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
                <div
                  v-if="hover"
                  class="d-flex align-start justify-end fill-height pa-2"
                  data-aos="fade-down"
                  data-aos-duration="100"
                >
                  <v-icon color="red">mdi-heart-outline</v-icon>
                </div>
              </v-img>
              <div
                class="px-0 text-body-1 font-weight-medium custom-title-text mt-2"
                :class="{ 'primary--text': hover }"
                v-text="product.title"
              />
              <div class="d-flex align-center justify-space-between">
                <div class="rating d-flex">
                  <Stars />
                </div>
                <span class="caption font-weight-medium fs-13"
                  >{{ product.price }}$</span
                >
              </div>
            </v-card>
          </v-hover>
        </v-slide-item>
      </v-slide-group>
    </v-row>
    <v-row>
      <v-col v-for="(i, ix) in 4" :key="ix" cols="3">
        <v-sheet
          v-if="loading"
          :color="$vuetify.theme.dark ? 'grey darken-4' : 'red lighten-4'"
          class="rounded"
        >
          <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProductsRow',
  data() {
    return {
      loading: false,
      allProducts: null,
      slider: null,
    }
  },
  async fetch() {
    this.loading = true

    const res = await fetch(`http://localhost:8000/data.json`)
      .then((res) => res.json())
      .finally(() => (this.loading = false))
      .catch((error) => {
        console.log(error)
      })

    if (res) {
      this.allProducts = res
    }
  },
}
</script>
