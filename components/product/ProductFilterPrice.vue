<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-subtitle-2 my-n2">Precio</v-expansion-panel-header>
    <v-expansion-panel-content>
      <span v-for="range in PRICE_RANGES">
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
      PRICE_RANGES: state => state.constants.PRICE_RANGES,
      PRICE_RANGE: state => state.constants.PRICE_RANGE
    })
  },
  data() {
    return {
      filterPriceApplied: false,
      currentPriceFilter: ''
    }
  },
  methods: {
    displayPrice(p) {
      var price = p.toString();
      var dec_pos = price.indexOf('.');
      if (dec_pos === -1) dec_pos = price.length;
      p = price.substring(dec_pos + 1) === '00' || price.substring(dec_pos + 1) === '0' || dec_pos === price.length ? '$ ' + price.substring(0, dec_pos) : '$ ' + price.substring(0, dec_pos) + '<sup>' + price.substring(dec_pos + 1) + '</sup>';
      return p.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    priceRangesLabel(range) {
      if (range === this.PRICE_RANGES[0]) {
        return 'Hasta ' + this.displayPrice(range);
      }
      if (range === this.PRICE_RANGES[this.PRICE_RANGES.length - 1]) {
        return 'Más de ' + this.displayPrice(range - this.PRICE_RANGE);
      }
      return this.displayPrice(range - this.PRICE_RANGE) + ' a ' + this.displayPrice(range);
    },
    async filterByPriceRange(r) {
      window.scrollTo(0, 0);

      if (!this.filterPriceApplied) {
        this.currentPriceFilter = r;
        var range = '';

        if (r === this.PRICE_RANGES[0]) {
          range = `,${r}`;
        } else if (r === this.PRICE_RANGES[this.PRICE_RANGES.length - 1]) {
          range = `${r - this.PRICE_RANGE},${Number.MAX_SAFE_INTEGER}`;
        } else {
          range = `${r - this.PRICE_RANGE},${r}`;
        }
        this.filters['[price]'] = range;
      } else if (!r) {
        delete this.filters[Object.keys(this.filters).find(k => k === '[price]')];
        this.currentPriceFilter = '';
      } else return;

      await this.$store.dispatch('product/getProductsByFilters', { 'filter': this.filters, 'sort': this.sort });

      this.$emit('priceClicked');
      this.filterPriceApplied = !this.filterPriceApplied;
    }
  }
}
</script>