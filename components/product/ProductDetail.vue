<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12" lg="7" xl="6">
        <div
          class="d-flex flex-column-reverse flex-lg-column-reverse flex-md-row flex-xl-row"
        >
          <div
            class="d-flex flex-lg-row flex-md-column flex-xl-column justify-center"
          >
            <div v-for="(image, i) in images" :key="i" class="mt-3">
              <v-img
                :src="`${baseUrl}${image.attributes.styles[1].url}`"
                height="70"
                width="70"
                contain
                class="rounded mx-auto cursor-pointer"
                @mouseenter="selectedImage = i"
              ></v-img>
            </div>
          </div>

          <v-img
            max-height="390px"
            max-width="580px"
            :src="`${baseUrl}${images[selectedImage].attributes.styles[4].url}`"
            class="rounded mx-4"
            :class="$vuetify.breakpoint.smOnly ? 'mx-auto' : ''"
            contain
          />
        </div>
      </v-col>
      <v-col cols="12" md="12" lg="5" xl="6">
        <h2>{{ product.title.toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) }}</h2>
        <Stars :size="20" />
        <h2 class="font-weight-bold" v-html="displayPrice()"></h2>
        <p class="font-weight-light mt-3 mb-8">
          Color
        </p>
        <p class="font-weight-light mt-3 mb-8">
          Talle
        </p>
        <p class="font-weight-light mt-3 mb-8">
          Largo
        </p>
        <v-text-field
          v-model="quantity"
          outlined
          dense
          label="Cantidad"
          :style="$vuetify.breakpoint.smAndUp ? 'max-width: 150px' : ''"
        >
          <template #prepend>
            <v-icon
              color="primary"
              class="cursor-pointer"
              @click="quantity--"
              >mdi-minus</v-icon
            >
          </template>

          <template #append-outer>
            <v-icon
              color="primary"
              class="cursor-pointer"
              @click="quantity++"
              >mdi-plus</v-icon
            >
          </template>
        </v-text-field>

        <v-row align="center">
          <v-col cols="12" sm="8" md="8" lg="8" xl="8">
            <v-btn color="primary" block
              >Agregar al Carrito <v-icon right small>mdi-cart</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="4" md="4" lg="4" xl="4">
            <v-btn
              color="grey lighten-1"
              outlined
              block
              @click="wishlist = !wishlist"
              ><span class="grey--text">Favorito</span>
              <v-icon
                right
                color="red"
                v-text="wishlist ? 'mdi-heart' : 'mdi-heart-outline'"
              ></v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <!-- add to cart - wishlist -->
        <v-divider class="mt-4 py-1"></v-divider>
        <div
          class="d-flex flex-column flex-sm-row justify-sm-space-between"
        >
          <v-chip-group show-arrows>
            <v-chip
              v-for="tag in pro.tags"
              :key="tag"
              active
              active-class="primary--text"
              small
            >
              {{ tag }}
            </v-chip>
          </v-chip-group>
          <div class="d-flex align-center justify-start">
            Share:
            <Socials />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ProductDetail',
  props: {
    title: {
      default: true,
    },
    product: {
      type: Object,
      default: {}
    }
  },
  computed: {
    ...mapState({
      baseUrl: state => state.repository.baseUrl
    }),
    variantId() {
      return this.$store.state.product.product.currentVariant;
    },
    images() {
      return this.product.variants.find(variant => variant.id === this.variantId).images;
    }
  },
  data() {
    return {
      wishlist: false,
      quantity: 1,
      selectedImage: 0,
      pro: {
        tags: ['Laptop', 'Electronics', 'Popular']
      }
    }
  },
  methods: {
    displayPrice() {
      var price = this.product.price
      var dec_pos = price.indexOf('.')
      return price.substring(dec_pos + 1) === '0' ? '$ ' + price.substring(0, dec_pos) : '$ ' + price.substring(0, dec_pos) + '<sup>' + price.substring(dec_pos + 1) + '</sup>'
    }
  }
}
</script>
