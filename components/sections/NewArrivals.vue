<template>
  <v-container>
    <h2 v-if="title" class="text-center display-1 font-weight-light">
      New Arrivals
    </h2>
    <v-row v-if="allProducts && !loading">
      <v-slide-group v-model="slider" center-active class="my-11" show-arrows>
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
              :to="`/product/1`"
              exact
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
    <v-row v-if="loading">
      <v-col v-for="(i, ix) in 4" :key="ix" cols="3">
        <v-sheet v-if="loading" :color="`grey lighten-4`" class="rounded">
          <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NewArrivals',
  props: {
    title: {
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      slider: null,
      allProducts: null,
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

<style>
.custom-card-text {
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
}

.custom-title-text {
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fs-13 {
  font-size: 13px !important;
}
</style>
