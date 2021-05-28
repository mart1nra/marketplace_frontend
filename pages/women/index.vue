<template>
  <div>
    <v-container :class="$vuetify.breakpoint.mdAndUp ? 'py-12 my-12' : ''">
      <ProductList
        :filters="filters"
        from="women"
      />
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        '[taxons]': '2'
      }
    }
  }
}
</script>