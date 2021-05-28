<template>
  <div>
    <v-container :class="$vuetify.breakpoint.mdAndUp ? 'py-12 my-12' : ''">
      <ProductList :filters="filters"/>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        '[taxons]': '3'
      }
    }
  }
}
</script>