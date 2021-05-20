<template>
  <div>
    <v-container :class="$vuetify.breakpoint.mdAndUp ? 'py-12 my-12' : ''">
      <v-row>
        <v-col v-if="filterOn" cols="12" sm="12" md="4" lg="3" xl="3">
          <v-card class="elevation-cs py-3 px-0">
            <v-expansion-panels
              v-model="panel"
              multiple
              flat
              tile
              data-aos="fade-zoom-in"
            >
              <v-expansion-panel>
                <v-expansion-panel-header>Categories</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-treeview
                    :items="items"
                    :selected-color="'#fff'"
                    activatable
                    open-on-click
                    dense
                  ></v-treeview>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Price</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-range-slider
                    v-model="range"
                    :max="max"
                    :min="min"
                    :height="25"
                    class="align-center mt-6"
                    thumb-label="always"
                    :thumb-size="27"
                  ></v-range-slider>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Rating</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-rating
                    v-model="rating"
                    hover
                    background-color="orange lighten-3"
                    half-increments
                    color="orange"
                  >
                  </v-rating>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Color</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="custom-grid">
                    <v-checkbox
                      v-for="(color, i) in colors"
                      :key="i"
                      v-model="selectedColor"
                      :label="color"
                      :color="color"
                      :value="color"
                      hide-details
                      class="text-capitalize"
                    ></v-checkbox>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Tags</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-chip-group column>
                    <v-chip
                      v-for="tag in tags"
                      :key="tag"
                      active
                      active-class="primary--text"
                      small
                    >
                      {{ tag }}
                    </v-chip>
                  </v-chip-group>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="8" lg="9" xl="9">
          <div class="d-flex align-center justify-space-between">
            <v-switch
              v-model="filterOn"
              :label="`Filter`"
              class="hidden-md-and-up"
            ></v-switch>

            <small class="hidden-sm-and-down"
              >{{ pluralize(totalCount, 'producto') }} </small
            >
            <v-select
              v-model="select"
              style="max-width: 250px"
              class="pa-0"
              :items="filter"
              flat
              solo
              hide-details
              dense
            >
              <template #prepend>
                <v-icon color="primary">mdi-sort</v-icon>
              </template>
            </v-select>
          </div>

          <v-divider></v-divider>
          <!--  -->
          <v-progress-circular
            v-if="loading"
            class="w-100 text-center my-12"
            indeterminate
            color="primary"
          >
          </v-progress-circular>
          <v-row v-if="!loading && allProducts" align="center">
            <v-col
              v-for="(product, i) in allProducts"
              :key="i"
              cols="12"
              sm="6"
              md="6"
              lg="4"
              xl="3"
            >
              <v-hover v-slot="{ hover }">
                <v-card
                  :class="{ 'elevation-cs': hover }"
                  class="pa-4 mx-auto"
                  width="300"
                  height="auto"
                  flat
                  hover
                  tile
                  color="transparent"
                >
                  <v-carousel
                    hide-delimiters
                    show-arrows-on-hover
                    height="300"
                  >
                    <v-carousel-item
                      v-for="(image, i) in product.images"
                      :key="i"
                      :src="image"
                      :href="`/product/${product.id}`"
                    >
                      <div
                        v-if="hover"
                        class="d-flex align-start justify-end fill-height pa-2"
                        data-aos="fade-down"
                        data-aos-duration="100"
                      >
                        <v-icon @click.prevent="addToFavorite()" color="red">mdi-heart-outline</v-icon>
                      </div>
                    </v-carousel-item>
                  </v-carousel>
                  <NuxtLink :to="`/product/${product.id}`">
                    <div
                      class="px-0 text-body-1 font-weight-medium custom-title-text mt-2"
                      :class="{ 'primary--text': hover }"
                      v-text="product.attributes.name"
                    />
                    <div class="d-flex align-center justify-space-between">
                      <div class="rating d-flex">
                        <Stars />
                      </div>
                      <span
                        class="caption font-weight-medium fs-13"
                        v-html="displayPrice(product.attributes.price)"
                      ></span>
                    </div>
                  </NuxtLink>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
          <v-row class="row text-center"> </v-row>
          <div class="my-12 text-center">
            <!--v-btn text color="primary">
              <v-icon left>mdi-arrow-left</v-icon> Previous Page
            </v-btn-->
            <v-pagination
              v-model="page"
              :length="totalPages"
              @previous="goPreviousPage()"
              @input="goPage(page)"
              @next="goNextPage()"
            ></v-pagination>
            <!--v-btn text color="primary"
              >Next Page<v-icon right>mdi-arrow-right</v-icon>
            </v-btn-->
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      baseUrl: state => state.repository.baseUrl
    })
  },
  data() {
    return {
      panel: [1, 2, 3, 4],
      filterOn: true,
      selectedColor: ['red', 'pink', 'blue', 'orange', 'indigo'],
      colors: ['red', 'blue', 'pink', 'indigo', 'orange', 'grey'],
      vendorId: this.$route.params.id,
      allProducts: null,
      images: null,
      loading: false,
      range: [90, 230],
      rating: 4.5,
      select: 'Más relevantes',
      filter: [
        'Más relevantes',
        'Menor precio',
        'Mayor precio'
      ],
      page: 1,
      currentPage: 1,
      totalPages: 0,
      totalCount: 0,
      prevPageUrl: '',
      selfPageUrl: '',
      nextPageUrl: '',
      min: 0,
      max: 300,
      tags: ['Laptop', 'Electronics', 'Popular'],
      items: [
        {
          name: 'Electronics',
          children: [
            {
              name: 'Computer & Laptop',
            },
            {
              name: 'Smartphones',
            },
            {
              name: 'Televisions',
            },
          ],
        },
        {
          name: 'Audio & Video',
          children: [
            {
              name: 'TV Receivers',
            },
            {
              name: 'TV Sticks',
            },
            {
              name: 'Projectors',
            },
          ],
        },
        {
          name: 'Video Games',
          children: [
            {
              name: 'Game Controllers',
            },
            {
              name: 'Joysticks',
            },
            {
              name: 'Stickers',
            },
          ],
        },
      ],
    }
  },
  async fetch() {
    await this.getProducts(`http://localhost:3000/api/v2/storefront/products?filter[vendor_ids]=${this.vendorId}&per_page=9&include=images`);
  },
  mounted() {
    window.addEventListener('resize', this.onResize, {
      passive: true,
    })
  },
  methods: {
    addToFavorite() {
      console.log('Add to favorite')
    },
    displayPrice(p) {
      var price = p;
      var dec_pos = price.indexOf('.');
      p = price.substring(dec_pos + 1) === '00' || price.substring(dec_pos + 1) === '0' ? '$ ' + price.substring(0, dec_pos) : '$ ' + price.substring(0, dec_pos) + '<sup>' + price.substring(dec_pos + 1) + '</sup>';
      return p.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    pluralize(c, n) {
      const _pluralize = (count, noun, suffix = 's') => `${count} ${noun}${count !== 1 ? suffix : ''}`;
      return _pluralize(c, n);
    },
    async goPreviousPage() {
      await this.getProducts(this.prevPageUrl);
    },
    async goPage(pageNumber) {
      if (this.currentPage !== this.page) {
        await this.getProducts(`${this.selfPageUrl}&page=${pageNumber}`);
      }
    },
    async goNextPage() {
      await this.getProducts(this.nextPageUrl);
    },
    async getProducts(url) {
      this.loading = true

      const response = await fetch(url)
        .then((response) => response.json())
        .finally(() => (this.loading = false))
        .catch((error) => {
          console.log(error)
        })

      if (response) {
        this.allProducts = response.data
        this.allProducts.forEach(product => {
          product.images = [];
          if (product.relationships.images.data.length > 0) {
            product.relationships.images.data.forEach(image => {
              product.images.push(this.baseUrl + response.included.find(i => i.id === image.id).attributes.styles[4].url);
            })
          }
        });
        this.currentPage = this.page;
        this.totalPages = response.meta.total_pages;
        this.totalCount = response.meta.total_count;
        this.prevPageUrl = response.links.prev;
        this.selfPageUrl = response.links.self;
        this.nextPageUrl = response.links.next;
      }
    },
    onResize() {
      var x = window.innerWidth < 960
      if (x) {
        this.filterOn = false
        this.panel = []
      } else {
        this.filterOn = true
        this.panel = [1, 2, 3, 4]
      }
    },
  },
}
</script>
