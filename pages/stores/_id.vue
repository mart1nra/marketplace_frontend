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
                <v-expansion-panel-header>Precio</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <span v-for="range in priceRanges">
                      <v-btn
                        class="mx-1 my-1"
                        text
                        small
                        outlined
                        :disabled="filterApplied && range !== currentPriceFilter"
                        @click="filterByPriceRange(range)"
                      >
                        {{ priceRangesLabel(range) }}
                        <v-icon v-if="filterApplied && range === currentPriceFilter" right>mdi-close</v-icon>
                      </v-btn>
                    </span>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!--v-expansion-panel>
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
              </v-expansion-panel-->
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
              v-model="currentSort"
              style="max-width: 250px"
              class="pa-0"
              :items="sortOptions"
              flat
              solo
              hide-details
              dense
              @change="sortProducts()"
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
          <v-row v-if="!loading && products" align="center">
            <v-col
              v-for="(product, i) in products"
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
                      v-text="product.title"
                    />
                    <div class="d-flex align-center justify-space-between">
                      <div class="rating d-flex">
                        <Stars />
                      </div>
                      <span
                        class="caption font-weight-medium fs-13"
                        v-html="displayPrice(product.price)"
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
              @input="goToPage(page)"
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
      products: state => state.product.products,
      totalCount: state => state.product.totalCount,
      totalPages: state => state.product.totalPages,
      loading: state => state.product.loading
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
      priceRanges: [1000, 2000, 3000, 4000, 5000],
      priceRange: 1000,
      rating: 4.5,
      sort: '',
      sortSelected: false,
      currentSort: 'Más relevantes',
      sortOptions: [
        'Más relevantes',
        'Menor precio',
        'Mayor precio'
      ],
      filter: '',
      filterApplied: false,
      currentPriceFilter: '',
      page: 1,
      currentPage: 1,
      min: '',
      max: '',
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
    await this.$store.dispatch('product/getProductsByVendor', this.vendorId);
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
    async goToPage(pageNumber) {
      if (this.currentPage !== this.page) {
        await this.$store.dispatch('product/getProductsByPage', pageNumber);
        this.currentPage = pageNumber;
        window.scrollTo(0, 0);
      }
    },
    priceRangesLabel(range) {
      if (range === this.priceRanges[0]) {
        return `Hasta $ ${range}`;
      }
      if (range === this.priceRanges[this.priceRanges.length - 1]) {
        return `Más de $ ${range - this.priceRange}`;
      }
      return `$ ${range - this.priceRange} - $ ${range}`;
    },
    setPricesRange(maxPrice, minPrice) {
      this.priceRange = maxPrice / 4;
      for (let i = minPrice; i <= maxPrice; i = i + this.priceRange) {
        this.priceRanges.push(i);
      }
      this.priceRanges.push(maxPrice);
    },
    async sortProducts() {
      var sort = '';

      if (this.currentSort === 'Menor precio') {
        sort = 'price';
        this.sortSelected = true;
      } else if (this.currentSort === 'Mayor precio') {
        sort = '-price';
        this.sortSelected = true;
      } else {
        this.sortSelected = false;
        this.sort = '';
      }
      this.sort = `&sort=${sort}`;

      var filter = this.filterApplied ? this.filter : '';

      await this.$store.dispatch('product/getProductsBySort', { 'category': `[vendor_ids]=${this.vendorId}`, 'sort': sort , 'filter': filter });
      this.page = 1;
      this.currentPage = 1;
      window.scrollTo(0, 0);
    },
    async filterByPriceRange(r) {
      this.filterApplied = !this.filterApplied;
      var range = '';

      if (this.filterApplied) {
        this.currentPriceFilter = r;
        if (r === this.priceRanges[0]) {
          range = `,${r}`;
        } else if (r === this.priceRanges[this.priceRanges.length - 1]) {
          range = `${r - this.priceRange},9999999999999`;
        } else {
          range = `${r - this.priceRange},${r}`;
        }
        this.filter = `&filter[price]=${range}`;
      } else {
        this.currentPriceFilter = '';
        this.filter = '';
      }

      var sort = this.sortSelected ? this.sort : '';

      await this.$store.dispatch('product/getProductsByPriceRange', { 'category': `[vendor_ids]=${this.vendorId}`, 'range': range, 'sort': sort });
      this.page = 1;
      this.currentPage = 1;
      window.scrollTo(0, 0);      
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
