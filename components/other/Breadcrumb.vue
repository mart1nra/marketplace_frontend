<template>
  <v-row>
    <v-breadcrumbs class="text--disabled font-weight-light" :items="breadcrumbs">
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
  }
}
</script>