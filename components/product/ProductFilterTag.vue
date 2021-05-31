<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-subtitle-2 my-n2">Tags</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-chip-group column>
        <v-chip
          v-for="tag in tags"
          :key="tag.name"
          small
          :close="filterTagApplied && tag === currentTagFilter"
          :disabled="filterTagApplied && tag !== currentTagFilter"
          @click="filterByTag(tag)"
          @click:close="filterByTag()"
        >
          {{ tag.name }}
        </v-chip>
      </v-chip-group>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props: {
    filters: {
      type: Object,
      default: null
    },
    sort: {
    	type: String,
    	default: ''
    },
    from: {
    	type: String,
    	default: ''
    }
  },
  data() {
    return {
      tags: [
      	{ name: 'Novedad', permalink: this.from === 'women' ? 'moda/novedades/mujer' : 'moda/novedades/hombre' },
      	{ name: 'Popular', permalink: this.from === 'women' ? 'moda/populares/mujer' : 'moda/populares/hombre' }
      ],
      filterTagApplied: false,
      currentTagFilter: ''
    }
  },
  methods: {
    async filterByTag(tag) {
      window.scrollTo(0, 0);
      
      if (!this.filterTagApplied) {
        this.currentTagFilter = tag;

        if (this.from === 'stores') {
        	if (tag.permalink === 'moda/novedades/hombre') {
        		this.$emit('tagClicked', '5,6');
        	}
        } else {
        	if (tag.permalink === 'moda/novedades/mujer') {
        		this.$emit('tagClicked', '5');
        	} else if (tag.permalink === 'moda/novedades/hombre') {
        		this.$emit('tagClicked', '6');
        	}
      	}
      } else if (!tag) {
        this.$emit('tagRemoveClicked', this.from);
        this.currentTagFilter = '';
      } else return;

      await this.$store.dispatch('product/getProductsByFilters', { 'filter': this.filters, 'sort': this.sort });

      this.filterTagApplied = !this.filterTagApplied;
    }
  }
}
</script>