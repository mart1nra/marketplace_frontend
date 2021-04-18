<template>
  <v-row justify="center" align="center" class="mt-12">
    <v-col
      v-for="(item, i) in items"
      :key="i"
      cols="12"
      sm="6"
      md="6"
      lg="3"
      xl="3"
      class="d-flex"
    >
      <v-avatar size="38" tile>
        <v-img
          contain
          :src="item.image"
          :class="$vuetify.theme.dark ? 'invert-filter' : ''"
        ></v-img>
      </v-avatar>
      <div class="ml-6">
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Free Shipping',
          text: 'On all orders over $25',
          image: require('~/assets/svg/1.svg'),
        },
        {
          title: 'Free Returns',
          text: 'Returns are free within 7 days',
          image: require('~/assets/svg/2.svg'),
        },
        {
          title: 'Support 24/7',
          text: 'Contact us 24 hours a day',
          image: require('~/assets/svg/3.svg'),
        },
        {
          title: '100% Secure Payment',
          text: 'Your payment are safe with us',
          image: require('~/assets/svg/4.svg'),
        },
      ],
    }
  },
}
</script>
