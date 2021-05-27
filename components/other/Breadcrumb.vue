<template>
  <v-row>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon>mdi-menu-right</v-icon>
      </template>
    </v-breadcrumbs>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      breadcrumbs: state => state.product.breadcrumbs
    })
  },
  created() {
  	var breadcrumbs = [];

  	for (var i = this.breadcrumbs.length - 1; i >= 0; i--) {
  		var breadcrumb = {};

  		breadcrumb['nuxt'] = true;
  		breadcrumb['activeClass'] = 'text-subtitle-2';
  	}
  	breadcrumbs.unshift({ disabled: true, text: "Volver a" });

  	this.$store.commit('product/setBreadcrumbs', breadcrumbs);
  }
}
</script>