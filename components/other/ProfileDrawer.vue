<template>
  <v-navigation-drawer
    clipped
    class="hidden-sm-and-down"
    permanent
    absolute
    :mini-variant.sync="someProp"
    mini-variant-width="60"
    expand-on-hover
    :temporary="!someProp"
  >
    <v-tabs
      v-model="tab"
      vertical
      color="grey darken-1"
      active-class="primary--text"
      slider-color="primary"
      class="text--lighten-2 fill-height"
    >
      <v-tab
        v-for="(item, i) in navItems"
        :key="i"
        :to="`/profile/${item.source}`"
        exact
        class="justify-start"
      >
        <v-icon left size="21">{{ item.icon }}</v-icon>
        <div class="mx-4 custom-tab-items">{{ item.text }}</div>
      </v-tab>
    </v-tabs>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      someProp: true,
      navItems: [
        {
          text: 'Account',
          value: 'account',
          icon: 'mdi-home-city',
          source: '',
        },
        {
          text: 'Orders',
          value: 'orders',
          icon: 'mdi-package-variant',
          source: `orders`,
        },
        {
          text: 'Invoices',
          value: 'invoices',
          icon: 'mdi-currency-eur',
          source: `invoices`,
        },
        {
          text: 'Returns',
          value: 'returns',
          icon: 'mdi-truck-delivery-outline',
          source: `returns`,
        },
        {
          text: 'My Data',
          value: 'data',
          icon: 'mdi-account-cog-outline',
          source: `data`,
        },
      ],
    }
  },
}
</script>
