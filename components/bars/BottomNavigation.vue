<template>
  <v-bottom-navigation
    v-model="value"
    fixed
    :value="value"
    color="primary"
    class="hidden-md-and-up"
    shift
  >
    <v-btn
      v-for="item in navItems"
      :key="item.source"
      :to="`/profile/${item.source}`"
      exact
      nuxt
      width="100%"
      :value="item.value"
    >
      <span>{{ item.text }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      value: '',
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

<style></style>
