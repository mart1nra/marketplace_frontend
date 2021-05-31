<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-subtitle-2 my-n2">Talle</v-expansion-panel-header>
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
      productsSizes: state => state.product.productsSizes
    })
  },
  data() {
    return {
      filterSizeApplied: false,
      currentSizeFilter: ''
    }
  },
  methods: {
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

      this.$emit('sizeClicked');
      this.filterSizeApplied = !this.filterSizeApplied;
    }
  }
}
</script>