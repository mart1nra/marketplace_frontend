<template>
  <div class="d-flex align-center justify-space-between">
    <v-switch
      v-model="filterOnValue"
      :label="`Filter`"
      class="hidden-md-and-up"
      @change="emitFilterOn()"
    ></v-switch>

    <small class="text--disabled text-body-2"
      >{{ pluralize(totalCount, 'producto') }} ({{ filters }})</small
    >
    <v-select
      v-model="currentSort"
      style="max-width: 250px"
      class="pa-0 text-body-2"
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
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    filters: {
      type: Object,
      default: null
    },
    filterOn : {
    	type: Boolean,
    	default: true
    }
  },
  computed: {
    ...mapState({
    	totalCount: state => state.product.totalCount
    })
  },
  data() {
    return {
      sortOptions: [
        'Más relevantes',
        'Menor precio',
        'Mayor precio',
        'Más nuevos'
      ],
      sort: '',
      currentSort: 'Más relevantes',
      page: 1,
      currentPage: 1,
      filterOnValue: this.filterOn
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize, {
      passive: true,
    })
  },
  methods: {
    pluralize(c, n) {
      const _pluralize = (count, noun, suffix = 's') => `${count} ${noun}${count !== 1 ? suffix : ''}`;
      return _pluralize(c, n);
    },
    emitFilterOn() {
    	this.$emit('filterOnClicked');
    },
    onResize() {
      var x = window.innerWidth < 960
      if (x) {
        this.filterOnValue = false;
      } else {
        this.filterOnValue = true;
      }
    },
    async sortProducts() {
      window.scrollTo(0, 0);

      var sort = '';

      if (this.currentSort === 'Menor precio') {
        sort = 'price';
      } else if (this.currentSort === 'Mayor precio') {
        sort = '-price';
      } else if (this.currentSort === 'Más nuevos') {
      	sort = '-created_at';
      }
      this.$emit('sortClicked', sort);

      await this.$store.dispatch('product/getProductsByFilters', { 'filter': this.filters, 'sort': sort });
    }
  }
}
</script>