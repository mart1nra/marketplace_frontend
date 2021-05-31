<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-subtitle-2 my-n2">Color</v-expansion-panel-header>
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
      productsColors: state => state.product.productsColors
    })
  },
  data() {
    return {
			filterColorApplied: false,
      currentColorFilter: ''
    }
  },
  methods: {
    async filterByColor(color) {
      window.scrollTo(0, 0);

      if (!this.filterColorApplied) {
        this.currentColorFilter = color;
        this.filters['[options][color]'] = color.name;

        await this.$store.dispatch('product/getProductsByFilters', { 'filter': this.filters, 'sort': this.sort });

        this.$emit('colorClicked');
        this.filterColorApplied = true;
      }
    },
    async removeFilterByColor() {
      window.scrollTo(0, 0);

      delete this.filters[Object.keys(this.filters).find(k => k === '[options][color]')];

      await this.$store.dispatch('product/getProductsByFilters', { 'filter': this.filters, 'sort': this.sort });

      this.$emit('colorClicked');
      this.filterColorApplied = false;
      this.currentColorFilter = '';
    }
  }
}
</script>