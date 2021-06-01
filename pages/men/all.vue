<template>
  <div>
    <v-container :class="$vuetify.breakpoint.mdAndUp ? 'py-1' : ''">
      <Breadcrumb />

      <div class="d-flex align-center justify-space-between">
        <p class="text-h5 font-weight-light">
          Todo para Ellos
          <br>
          <span class="text-caption font-weight-light">
            Todas las variedades de todas las tiendas disponibles sólo para los hombres.
          </span>
        </p>
        <p class="text-caption font-weight-light">
          {{ pluralize(totalCount, 'producto') }}
        </p>
      </div>

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
      MEN_ID: state => state.constants.MEN_ID,
      STORE_NAME: state => state.constants.STORE_NAME,
      totalCount: state => state.product.totalCount
    })
  },
  mounted() {
    this.$store.commit('product/setBreadcrumbs',
      [
        { text: this.STORE_NAME, to: '/' },
        { text: 'Hombres', to: '/men' }
      ]);
  },
  methods: {
    pluralize(c, n) {
      const _pluralize = (count, noun, suffix = 's') => `${count} ${noun}${count !== 1 ? suffix : ''}`;
      return _pluralize(c, n);
    }
  }
}
</script>