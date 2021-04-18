<template>
  <div class="my-12">
    <h2 class="text-center display-1 font-weight-light">
      Explore Popular Categories
    </h2>
    <v-row justify="center" align="center" class="my-10">
      <v-col
        v-for="(item, i) in items"
        :key="i"
        cols="12"
        sm="6"
        md="6"
        lg="2"
        xl="2"
        class="d-flex flex-column align-center justify-center"
      >
        <NuxtLink to="/categories">
          <v-img
            class="product-image"
            :src="require(`~/assets/img/categories/${item.image}.png`)"
            width="100%"
            min-height="100"
            contain
          ></v-img>

          <h4 class="font-weight-light ff-poppins my-3 text-center">
            {{ item.title }}
          </h4>
        </NuxtLink>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Computer & Laptop',
          image: '1',
        },
        {
          title: 'Smartphones',
          image: '2',
        },
        {
          title: 'Televisions',
          image: '3',
        },
        {
          title: 'Audio',
          image: '4',
        },
        {
          title: 'Smart Watches',
          image: '5',
        },
      ],
    }
  },
}
</script>

<style></style>
