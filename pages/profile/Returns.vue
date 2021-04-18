<template>
  <v-container class="ml-md-16">
    <v-row justify="center">
      <v-col cols="12" md="12" lg="12" xl="10">
        <h2 class="primary--text">Returns</h2>
        <v-divider class="my-3"></v-divider>
        <v-tabs v-model="tab" grow color="indigo">
          <v-tabs-slider></v-tabs-slider>

          <v-tab v-for="item in navItems" :key="item.title">
            {{ item.title }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in navItems" :key="item.title">
            <v-row>
              <v-col
                v-for="(product, index) in allProducts"
                :key="index"
                cols="12"
                sm="6"
                md="4"
                lg="4"
                xl="3"
              >
                <v-hover v-slot="{ hover }">
                  <v-card
                    v-if="product"
                    :class="{ 'elevation-cs': hover }"
                    class="pa-4"
                    height="auto"
                    draggable
                    flat
                    hover
                    tile
                    color="transparent"
                    :to="`product/1`"
                  >
                    <v-img width="100%" contain :src="product.image">
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
                    </v-img>
                    <div
                      class="px-0 text-body-1 font-weight-medium custom-title-text mt-2"
                      :class="{ 'primary--text': hover }"
                      v-text="product.title"
                    />
                    <div class="caption">Valid until: 31/10/2020</div>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: 'authentication',
  data() {
    return {
      loading: false,
      allProducts: null,
      slider: null,
      tab: null,
      navItems: [
        {
          title: 'Returnable',
          icon: 'mdi-home-city',
          source: `test`,
        },
        {
          title: 'Returned Products',
          icon: 'mdi-package-variant',
          source: `test2`,
        },
      ],
    }
  },
  async fetch() {
    this.loading = true

    const res = await fetch(`/data.json`)
      .then((res) => res.json())
      .finally(() => (this.loading = false))
      .catch((error) => {
        console.log(error)
      })

    if (res) {
      var temp = res
      temp.splice(0, 12)
      this.allProducts = temp
    }
  },
}
</script>
