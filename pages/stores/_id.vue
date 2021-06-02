<template>
  <div>
    <v-container :class="$vuetify.breakpoint.mdAndUp ? 'py-1' : ''">
      <Breadcrumb />

      <div class="d-flex align-center justify-space-between">
        <p class="text-h5 font-weight-light">
          {{ vendor.name }}
          <br>
          <span class="text-caption font-weight-light">
            {{ vendor.aboutUs }}
          </span>
        </p>
        <p class="text-caption font-weight-light">
          {{ pluralize(totalCount, 'producto') }}
        </p>
      </div>

      <ProductList
        :vendor="vendor.id"
        from="stores"
      />
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      STORE_NAME: state => state.constants.STORE_NAME,
      vendor: state => state.vendor.vendor,
      totalCount: state => state.product.totalCount
    })
  },
  data() {
    return {
    }
  },
  mounted() {
    this.$store.commit('product/setBreadcrumbs',
      [
        { text: this.STORE_NAME, to: '/' },
        { text: 'Tiendas', to: '/stores' }
      ]);
  },
  async fetch() {
    await this.$store.dispatch('vendor/getVendorInfo', this.$route.params.id);
  },
  methods: {
    pluralize(c, n) {
      const _pluralize = (count, noun, suffix = 's') => `${count} ${noun}${count !== 1 ? suffix : ''}`;
      return _pluralize(c, n);
    }
  }
}
</script>