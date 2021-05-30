<template>
	<v-row>
	  <v-col v-if="filterOn" cols="12" sm="12" md="4" lg="3" xl="3">
	    <v-expansion-panels
	      v-model="panel"
	      accordion
	      multiple
	      data-aos="fade-zoom-in"
	    >
	      <v-expansion-panel>
	        <v-expansion-panel-header class="text-subtitle-2 my-n2">Categorías</v-expansion-panel-header>
	        <v-expansion-panel-content>
	          <v-treeview
	            :items="items"
	            :selected-color="'#fff'"
	            class="text-body-2"
	            activatable
	            open-on-click
	            dense
	          ></v-treeview>
	        </v-expansion-panel-content>
	      </v-expansion-panel>

	      <ProductFilterPrice
	      	:filters="filters"
	      	:sort="sort"
	      />

	      <ProductFilterColor
	      	:filters="filters"
	      	:sort="sort"
	      />

	      <ProductFilterSize
	      	:filters="filters"
	      	:sort="sort"
	      />

	      <ProductFilterLength
	      	:filters="filters"
	      	:sort="sort"
	      />

	      <ProductFilterTag
	      	:filters="filters"
	      	:sort="sort"
	      	:from="from"
	      	@tagClicked="handleTag"
	      	@tagRemoveClicked="handleRemoveTag"
	      />

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
	    </v-expansion-panels>
	  </v-col>
	  <v-col cols="12" sm="12" md="8" lg="9" xl="9">

	    <ProductSort
	    	:filters="filters"
	    	:filterOn="filterOn"
	    	@filterOnClicked="filterOn = !filterOn"
	    	@sortClicked="handleSort"
	    />	  	

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
	                :href="`/product/${product.slug}?from=${from}`"
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
	            <NuxtLink :to="`/product/${product.slug}?from=${from}`">
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
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    taxon: {
      type: String,
      default: ''
    },
    vendor: {
      type: String,
      default: ''
    },
    from: {
    	type: String,
    	default: ''
    }
  },
  computed: {
    ...mapState({
    	products: state => state.product.products,
    	totalPages: state => state.product.totalPages,
      loading: state => state.product.loading
    })
  },
  data() {
    return {
    	filterOn: true,
    	panel: [0, 1, 2, 3, 4, 5],
      sort: '',
	    filters: {},      
      page: 1,
      currentPage: 1,
      //rating: 4.5,
      items: [
        {
          name: 'Mujeres',
          children: [
            {
              name: 'Camisas',
            },
            {
              name: 'Remeras',
            },
            {
              name: 'Polleras',
            }
          ]
        },
        {
          name: 'Hombres',
          children: [
            {
              name: 'Camisas',
            },
            {
              name: 'Remeras',
            },
            {
              name: 'Pantalones',
            }
          ]
        }
      ]
    }
  },
  created() {
  	if (this.taxon) {
  		this.filters['[taxons]'] = this.taxon;
  	}
  	if (this.vendor) {
  		this.filters['[vendor_ids]'] = this.vendor;
  	}
  },
  mounted() {
    window.addEventListener('resize', this.onResize, {
      passive: true,
    })
  },
  async fetch() {
    await this.$store.dispatch('product/getProductsByFilters', { 'filter': this.filters, 'sort': this.sort });
  },
  methods: {
    displayPrice(p) {
      var price = p.toString();
      var dec_pos = price.indexOf('.');
      if (dec_pos === -1) dec_pos = price.length;
      p = price.substring(dec_pos + 1) === '00' || price.substring(dec_pos + 1) === '0' || dec_pos === price.length ? '$ ' + price.substring(0, dec_pos) : '$ ' + price.substring(0, dec_pos) + '<sup>' + price.substring(dec_pos + 1) + '</sup>';
      return p.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    onResize() {
      var x = window.innerWidth < 960
      if (x) {
        this.filterOn = false;
        this.panel = [];
      } else {
        this.filterOn = true;
        this.panel = [0, 1, 2, 3, 4, 5];
      }
    },
    addToFavorite() {
      console.log('Add to favorite')
    },
    handleTag(tag) {
    	this.filters['[taxons]'] = tag;
    },
    handleRemoveTag(tag) {
    	if (tag === 'women' || tag === 'men') {
    		this.filters['[taxons]'] = this.taxon;
    	} else if (tag === 'stores') {
    		this.filters['[vendor_ids]'] = this.vendor;
    		delete this.filters[Object.keys(this.filters).find(k => k === '[taxons]')];
    	}
    	
    },
    handleSort(sort) {
    	this.sort = sort;
    },
    async goToPage(pageNumber) {
      if (this.currentPage !== this.page) {
      	window.scrollTo(0, 0);

        await this.$store.dispatch('product/getProductsByPage', pageNumber);
        this.currentPage = pageNumber;
      }
    }
  }
}
</script>