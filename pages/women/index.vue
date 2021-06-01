<template>
  <div>
    <v-container :class="$vuetify.breakpoint.mdAndUp ? 'py-12 my-12' : ''">
      <ProductList
        :taxon="WOMEN_ID"
        from="women"
      />
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      WOMEN_ID: state => state.constants.WOMEN_ID
    })
  }
}
</script>