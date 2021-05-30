<template>
  <div>
    <v-container :class="$vuetify.breakpoint.mdAndUp ? 'py-12 my-12' : ''">
      <Breadcrumb class="mb-n4" />
      <ProductList
        :vendor="vendorId"
        from="stores"
      />
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vendorId: this.$route.params.id
    }
  },
  mounted() {
    this.$store.commit('product/setBreadcrumbs', [{ text: "Tiendas", to: "/stores" }]);
  }
}
</script>