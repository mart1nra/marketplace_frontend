<template>
  <div>
    <v-container :class="$vuetify.breakpoint.mdAndUp ? 'py-12 my-12' : ''">
      <Breadcrumb class="mb-n4" />
      <ProductList
        :filters="filters"
        from="stores"
      />
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        '[vendor_ids]': this.$route.params.id
      }
    }
  },
  mounted() {
    this.$store.commit('product/setBreadcrumbs', [{ text: "Tiendas", to: "/stores" }]);
  }
}
</script>