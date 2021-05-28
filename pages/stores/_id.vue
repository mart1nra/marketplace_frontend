<template>
  <div>
    <v-container :class="$vuetify.breakpoint.mdAndUp ? 'py-12 my-12' : ''">
      <Breadcrumb />
      <ProductList />
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      breadcrumbs: state => state.product.breadcrumbs,
    })
  },
  mounted() {
    this.$store.commit('product/setBreadcrumbs', [{ text: "Tiendas", to: "/stores" }]);
  }
}
</script>
