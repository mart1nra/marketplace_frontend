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
    },
    from: {
    	type: String,
    	default: ''
    }
  },
  computed: {
    ...mapState({
      NEWEST_WOMEN: state => state.constants.NEWEST_WOMEN,
      NEWEST_MEN: state => state.constants.NEWEST_MEN,
      NEWEST_WOMEN_ID: state => state.constants.NEWEST_WOMEN_ID,
      NEWEST_MEN_ID: state => state.constants.NEWEST_MEN_ID,
      NEWEST_WOMEN_MEN_ID: state => state.constants.NEWEST_WOMEN_MEN_ID,
      POPULAR_WOMEN: state => state.constants.POPULAR_WOMEN,
      POPULAR_MEN: state => state.constants.POPULAR_MEN
    }),
    tags() {
      return [
        { name: 'Novedad', permalink: this.from === 'women' ? this.NEWEST_WOMEN : this.NEWEST_MEN },
        { name: 'Popular', permalink: this.from === 'women' ? this.POPULAR_WOMEN : this.POPULAR_MEN }
      ]
    }
  },
  data() {
    return {
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
        	if (tag.permalink === this.NEWEST_MEN) {
        		this.$emit('tagClicked', this.NEWEST_WOMEN_MEN_ID);
        	}
        } else {
        	if (tag.permalink === this.NEWEST_WOMEN) {
        		this.$emit('tagClicked', this.NEWEST_WOMEN_ID);
        	} else if (tag.permalink === this.NEWEST_MEN) {
        		this.$emit('tagClicked', this.NEWEST_MEN_ID);
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