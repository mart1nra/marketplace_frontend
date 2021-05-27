<template>
  <div>
    <v-container :class="$vuetify.breakpoint.mdAndUp ? 'py-12 my-12' : ''">
      <Breadcrumb />
      <v-row>
        <v-col v-if="filterOn" cols="12" sm="12" md="4" lg="3" xl="3">
          <v-expansion-panels
            v-model="panel"
            class="elevation-cs"
            accordion
            multiple
            data-aos="fade-zoom-in"
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="text-subtitle-2">Categories</v-expansion-panel-header>
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
              <v-expansion-panel-header class="text-subtitle-2">Precio</v-expansion-panel-header>
              <v-expansion-panel-content>
                <span v-for="range in priceRanges">
                  <v-chip
                    class="ma-1 pa-1"
                    color="#757575"
                    label
                    outlined
                    small
                    :close="filterPriceApplied && range === currentPriceFilter"
                    :disabled="filterPriceApplied && range !== currentPriceFilter"
                    @click="filterByPriceRange(range)"
                    @click:close="filterByPriceRange()"
                  >
                    {{ priceRangesLabel(range) }}
                  </v-chip>
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
              <v-expansion-panel-header class="text-subtitle-2">Color</v-expansion-panel-header>
              <v-expansion-panel-content>
                <span v-for="color in productsColors">
                  <v-hover v-slot="{ hover }">
                    <v-btn
                      class="ma-1"
                      max-width="25"
                      max-height="25"
                      elevation="0"
                      fab
                      :disabled="filterColorApplied && color !== currentColorFilter"
                      :color="color.presentation === '#FFFFFF' ? 'grey' : color.presentation"
                      :outlined="color.presentation === '#FFFFFF' && !(filterColorApplied && color !== currentColorFilter)"
                      @click="filterByColor(color)"
                    >
                      <span v-if="filterColorApplied && hover">
                        <v-icon
                          small
                          :color="color.presentation === '#FFFFFF' ? 'black' : 'white'"
                          @click="removeFilterByColor(color)"
                        >mdi-close</v-icon>
                      </span>
                    </v-btn>
                  </v-hover>
                </span>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header class="text-subtitle-2">Talle</v-expansion-panel-header>
              <v-expansion-panel-content>
                <span v-for="size in productsSizes">
                  <v-chip
                    class="ma-1 pa-2"
                    color="#757575"
                    outlined
                    small
                    :close="filterSizeApplied && size === currentSizeFilter"
                    :disabled="filterSizeApplied && size !== currentSizeFilter"
                    @click="filterBySize(size)"
                    @click:close="filterBySize()"
                  >
                    {{ size.presentation }}
                  </v-chip>
                </span>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header class="text-subtitle-2">Largo</v-expansion-panel-header>
              <v-expansion-panel-content>
                <span v-for="length in productsLengths">
                  <v-chip
                    class="ma-1 pa-2"
                    color="#757575"
                    outlined
                    small
                    :close="filterLengthApplied && length === currentLengthFilter"
                    :disabled="filterLengthApplied && length !== currentLengthFilter"
                    @click="filterByLength(length)"
                    @click:close="filterByLength()"
                  >
                    {{ length.presentation }}
                  </v-chip>
                </span>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header class="text-subtitle-2">Tags</v-expansion-panel-header>
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
                    :show-arrows="product.images.length > 1"
                    height="320"
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
                    ><span class="text-subtitle-1 text-capitalize">{{ product.title }}</span></div>
                    <div class="d-flex align-center justify-space-between">
                      <div class="rating d-flex">
                        <Stars />
                      </div>
                      <span
                        class="text-subtitle-1 font-weight-medium fs-13"
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
      productsColors: state => state.product.productsColors,
      productsSizes: state => state.product.productsSizes,
      productsLengths: state => state.product.productsLengths,
      breadcrumbs: state => state.product.breadcrumbs,
      loading: state => state.product.loading
    }),
    filterApplied() {
      return this.filterPriceApplied || this.filterColorApplied || this.filterSizeApplied;
    }
  },
  data() {
    return {
      vendorId: this.$route.params.id,
      panel: [0, 1, 2, 3, 4, 5],
      filterOn: true,
      priceRanges: [1500, 3000, 4500, 6000, 7500],
      priceRange: 1500,
      rating: 4.5,
      currentSort: 'Más relevantes',
      sortOptions: [
        'Más relevantes',
        'Menor precio',
        'Mayor precio'
      ],
      sort: '',
      filters: {
        '[vendor_ids]': this.$route.params.id
      },
      filterPriceApplied: false,
      filterColorApplied: false,
      filterSizeApplied: false,
      filterLengthApplied: false,
      currentPriceFilter: '',
      currentColorFilter: '',
      currentSizeFilter: '',
      currentLengthFilter: '',
      page: 1,
      currentPage: 1,
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
    await this.$store.dispatch('product/getProductsByFilters', { 'filter': this.filters, 'sort': this.sort });
  },
  mounted() {
    this.$store.commit('product/setBreadcrumbs', [{ text: "Tiendas", to: "/stores" }]);

    window.addEventListener('resize', this.onResize, {
      passive: true,
    })
  },
  methods: {
    addToFavorite() {
      console.log('Add to favorite')
    },
    displayPrice(p) {
      var price = p.toString();
      var dec_pos = price.indexOf('.');
      if (dec_pos === -1) dec_pos = price.length;
      p = price.substring(dec_pos + 1) === '00' || price.substring(dec_pos + 1) === '0' || dec_pos === price.length ? '$ ' + price.substring(0, dec_pos) : '$ ' + price.substring(0, dec_pos) + '<sup>' + price.substring(dec_pos + 1) + '</sup>';
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
        return 'Hasta ' + this.displayPrice(range);
      }
      if (range === this.priceRanges[this.priceRanges.length - 1]) {
        return 'Más de ' + this.displayPrice(range - this.priceRange);
      }
      return this.displayPrice(range - this.priceRange) + ' a ' + this.displayPrice(range);
    },
    async sortProducts() {
      window.scrollTo(0, 0);

      var sort = '';

      if (this.currentSort === 'Menor precio') {
        sort = 'price';
      } else if (this.currentSort === 'Mayor precio') {
        sort = '-price';
      }
      this.sort = sort;

      await this.$store.dispatch('product/getProductsByFilters', { 'filter': this.filters, 'sort': sort });
      this.page = 1;
      this.currentPage = 1;
    },
    async filterByPriceRange(r) {
      window.scrollTo(0, 0);

      if (!this.filterPriceApplied) {
        this.currentPriceFilter = r;
        var range = '';

        if (r === this.priceRanges[0]) {
          range = `,${r}`;
        } else if (r === this.priceRanges[this.priceRanges.length - 1]) {
          range = `${r - this.priceRange},9999999999999`;
        } else {
          range = `${r - this.priceRange},${r}`;
        }
        this.filters['[price]'] = range;
      } else if (!r) {
        delete this.filters[Object.keys(this.filters).find(k => k === '[price]')];
        this.currentPriceFilter = '';
      } else return;

      await this.$store.dispatch('product/getProductsByFilters', { 'filter': this.filters, 'sort': this.sort });

      this.page = 1;
      this.currentPage = 1;
      this.filterPriceApplied = !this.filterPriceApplied;
    },
    async filterByColor(color) {
      window.scrollTo(0, 0);

      if (!this.filterColorApplied) {
        this.currentColorFilter = color;
        this.filters['[options][color]'] = color.name;

        await this.$store.dispatch('product/getProductsByFilters', { 'filter': this.filters, 'sort': this.sort });

        this.page = 1;
        this.currentPage = 1;
        this.filterColorApplied = true;
      }
    },
    async removeFilterByColor() {
      window.scrollTo(0, 0);

      delete this.filters[Object.keys(this.filters).find(k => k === '[options][color]')];

      await this.$store.dispatch('product/getProductsByFilters', { 'filter': this.filters, 'sort': this.sort });

      this.page = 1;
      this.currentPage = 1;
      this.filterColorApplied = false;
      this.currentColorFilter = '';
    },
    async filterBySize(size) {
      window.scrollTo(0, 0);

      if (!this.filterSizeApplied) {
        this.currentSizeFilter = size;
        this.filters['[options][talle]'] = size.name;
      } else if (!size) {
        delete this.filters[Object.keys(this.filters).find(k => k === '[options][talle]')];
        this.currentSizeFilter = '';
      } else return;

      await this.$store.dispatch('product/getProductsByFilters', { 'filter': this.filters, 'sort': this.sort });

      this.page = 1;
      this.currentPage = 1;
      this.filterSizeApplied = !this.filterSizeApplied;
    },
    async filterByLength(length) {
      window.scrollTo(0, 0);
      
      if (!this.filterLengthApplied) {
        this.currentLengthFilter = length;
        this.filters['[options][largo]'] = length.name;
      } else if (!length) {
        delete this.filters[Object.keys(this.filters).find(k => k === '[options][largo]')];
        this.currentLengthFilter = '';
      } else return;

      await this.$store.dispatch('product/getProductsByFilters', { 'filter': this.filters, 'sort': this.sort });

      this.page = 1;
      this.currentPage = 1;
      this.filterLengthApplied = !this.filterLengthApplied;
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
