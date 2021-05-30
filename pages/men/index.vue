<template>
  <div>
    <v-container :class="$vuetify.breakpoint.mdAndUp ? 'py-12 my-12' : ''">
      <ProductList
        taxon="3"
        from="men"
      />
    </v-container>
  </div>
</template>