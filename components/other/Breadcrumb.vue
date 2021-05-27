<template>
  <v-row>
    <v-breadcrumbs class="font-weight-bold text--secondary" :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon>mdi-menu-right</v-icon>
      </template>
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