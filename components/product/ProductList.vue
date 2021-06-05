<template>
	<v-row>
	  <!--v-col v-if="filterOn" cols="12" sm="12" md="4" lg="3" xl="3">
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
	      	@priceClicked="resetPage"
	      />

	      <ProductFilterColor
	      	:filters="filters"
	      	:sort="sort"
	      	@colorClicked="resetPage"
	      />

	      <ProductFilterSize
	      	:filters="filters"
	      	:sort="sort"
	      	@sizeClicked="resetPage"
	      />

	      <ProductFilterLength
	      	:filters="filters"
	      	:sort="sort"
	      	@lengthClicked="resetPage"
	      />

	      <ProductFilterTag
	      	:filters="filters"
	      	:sort="sort"
	      	:from="from"
	      	@tagClicked="handleTag"
	      	@tagRemoveClicked="handleRemoveTag"
	      />

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
	    </v-expansion-panels>
	  </v-col-->
	  <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="mt-n1">
			
			<v-divider></v-divider>

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
	    <v-row v-if="!loading && products" align="start" class="px-3">
	      <v-col
	        v-for="(product, i) in products"
	        :key="i"
	        cols="12"
	        sm="6"
	        md="4"
	        lg="3"
	        xl="3"
	        class="pa-0 mt-6"
	      >
          <v-card
            width="300"
            height="auto"
            flat
            tile
            outlined
            color="transparent"
            :class="$vuetify.breakpoint.smOnly ? 'mx-auto' : ''"
          >
            <v-carousel
              hide-delimiters
              :show-arrows="false"
              height="400"
            >
              <v-carousel-item
                :src="productImageUrl(product)"
                :href="`/product/${product.slug}?from=${from}`"
              >
              </v-carousel-item>
            </v-carousel>
          </v-card>
	        <!--v-hover v-slot="{ hover }">
	          <v-card
	            width="300"
	            height="auto"
	            flat
	            hover
	            tile
	            outlined
	            color="transparent"
	          >
	            <v-carousel
	              hide-delimiters
	              show-arrows-on-hover
	              :show-arrows="false"
	              height="400"
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
	          </v-card>
	        </v-hover-->
	        <div v-if="product.colors.length > 1" class="mx-2 mt-2">
			      <span v-for="(color, i) in product.colors" class="mx-2">
			        <v-hover v-slot="{ hover }">
			          <v-btn v-if="color === product.selectedColor"
			            class="ma-n1"
			            max-width="23"
			            max-height="23"
			            elevation="0"
			            fab
			            outlined
			          >
				          <v-btn
				            class="ma-n1"
				            max-width="17"
				            max-height="17"
				            elevation="0"
				            fab
				            :color="color.presentation === '#FFFFFF' ? 'grey' : color.presentation"
				            :outlined="color.presentation === '#FFFFFF'"
				            @click="selectColor(product, color)"
				          ></v-btn>
			          </v-btn>
			          <v-btn v-else-if="hover"
			            class="ma-n1"
			            max-width="23"
			            max-height="23"
			            elevation="0"
			            fab
			            outlined
			          >
				          <v-btn
				            class="ma-n1"
				            max-width="17"
				            max-height="17"
				            elevation="0"
				            fab
				            :color="color.presentation"
				            @click="selectColor(product, color)"
				          ></v-btn>
			          </v-btn>
			          <v-btn v-else
			            max-width="17"
			            max-height="17"
			            elevation="0"
			            fab
			            :color="color.presentation === '#FFFFFF' ? 'grey' : color.presentation"
			            :outlined="color.presentation === '#FFFFFF'"
			            @click="selectColor(product, color)"
			          >
			          </v-btn>
			        </v-hover>
			      </span>
	        </div>
          <NuxtLink :to="`/product/${product.slug}?from=${from}`">
          	<div class="mx-3">
        			<div class="product-title text-caption font-weight-light text-capitalize mt-1">{{ product.title }}</div>
              <Stars class="mt-n1"/>
              <div
                class="text-caption font-weight-bold mt-1"
                v-html="displayPrice(product.price)"
              ></div>
          	</div>
          </NuxtLink>
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
    	emptyImage: state => state.product.emptyImage,
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
      p = price.substring(dec_pos + 1) === '00' || price.substring(dec_pos + 1) === '0' || dec_pos === price.length ? '$ ' + price.substring(0, dec_pos) : '$ ' + price.substring(0, dec_pos) + ',' + price.substring(dec_pos + 1);
      return p.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    productImageUrl(product) {
    	if (product.selectedColor && product.imagesByColor[product.selectedColor.id]) {
    		return product.imagesByColor[product.selectedColor.id];
    	}
    	return this.emptyImage;
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
    selectColor(product, color) {
    	this.$store.commit('product/setSelectedColor', { id: product.id, color: color });
    },
    addToFavorite() {
      console.log('Add to favorite')
    },
    handleTag(tag) {
    	this.filters['[taxons]'] = tag;
    	this.resetPage();
    },
    handleRemoveTag(tag) {
    	if (tag === 'women' || tag === 'men') {
    		this.filters['[taxons]'] = this.taxon;
    	} else if (tag === 'stores') {
    		this.filters['[vendor_ids]'] = this.vendor;
    		delete this.filters[Object.keys(this.filters).find(k => k === '[taxons]')];
    	}
    	this.resetPage();
    },
    handleSort(sort) {
    	this.sort = sort;
    	this.resetPage();
    },
    async goToPage(pageNumber) {
      if (this.currentPage !== this.page) {
      	window.scrollTo(0, 0);

        await this.$store.dispatch('product/getProductsByPage', pageNumber);
        this.currentPage = pageNumber;
      }
    },
    resetPage() {
    	this.page = 1;
    	this.currentPage = 1;
    }
  }
}
</script>

<style scoped>
	.product-title {
		line-height: 1rem;
	}
</style>