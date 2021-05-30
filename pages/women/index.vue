<template>
  <div>
    <v-container :class="$vuetify.breakpoint.mdAndUp ? 'py-12 my-12' : ''">
      <ProductList
        taxon="2"
        from="women"
      />
    </v-container>
  </div>
</template>