<template>
  <div>
    <v-container :class="$vuetify.breakpoint.mdAndUp ? 'py-12 my-12' : ''">
      <ProductList
        :taxon="MEN_ID"
        from="men"
      />
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      MEN_ID: state => state.constants.MEN_ID
    })
  }
}
</script>