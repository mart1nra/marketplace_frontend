<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-subtitle-2 my-n2">Largo</v-expansion-panel-header>
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
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    filters: {
      type: Object,
      default: null
    },
    sort: {
    	type: String,
    	default: ''
    }
  },
  computed: {
    ...mapState({
      productsLengths: state => state.product.productsLengths
    })
  },
  data() {
    return {
      filterLengthApplied: false,
      currentLengthFilter: '',
      page: 1,
      currentPage: 1
    }
  },
  methods: {
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
    }
  }
}
</script>