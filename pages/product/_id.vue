<template>
  <div>
    <v-container :class="$vuetify.breakpoint.mdAndUp ? 'py-1' : ''">
      <Breadcrumb />

      <v-row align="center" justify="center" class="mt-n2">
        <v-col cols="12" md="12" lg="12" xl="12">

          <v-progress-circular
            v-if="loading"
            class="w-100 text-center my-12"
            indeterminate
            color="primary"
          >
          </v-progress-circular>

          <ProductDetail
              v-if="!loading && product !== null"
              :product="product"
          />

          <v-divider></v-divider>

          <!--v-row align="center" justify="center" class="my-12">
            <v-col cols="12" class="elevation-cs-2 no-gutters">
              <v-card flat>
                <v-tabs v-model="tabs" grow show-arrows>
                  <v-tab href="#tabs-1" class="primary--text">
                    Description
                  </v-tab>

                  <v-tab href="#tabs-2" class="primary--text">
                    Specifications
                  </v-tab>

                  <v-tab href="#tabs-3" class="primary--text"> Reviews </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tabs">
                  <v-tab-item v-for="i in 3" :key="i" :value="'tabs-' + i">
                    <v-card flat>
                      <v-card-text v-if="i == 1">
                        <h3 class="py-2">Product Description</h3>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Enim nostrum corporis ut quasi et suscipit odit
                          eligendi beatae? Expedita perferendis distinctio
                          exercitationem magni itaque dolores consectetur minus
                          pariatur autem! Eius voluptas nisi ea facilis itaque
                          reprehenderit molestias alias molestiae, eligendi
                          nihil dignissimos aliquam quis, eos recusandae
                          corporis rerum pariatur voluptatum! Quidem veritatis
                          dolorem dolor nesciunt voluptatem tempore vero,
                          corrupti molestias dignissimos ea nostrum amet nemo
                          autem soluta necessitatibus ullam? Id, consequuntur
                          iste. Rem corporis incidunt, iusto quam pariatur,
                          debitis eos eligendi, nesciunt asperiores esse cumque
                          sapiente eius aliquam eaque! Quasi porro harum
                          suscipit animi explicabo provident? Vitae asperiores
                          tempore reiciendis?
                        </p>
                        <ul class="pb-2">
                          <li>Lorem ipsum dolor sit amet consectetur.</li>
                          <li>Lorem ipsum dolor sit amet consectetur.</li>
                          <li>Lorem ipsum dolor sit amet consectetur.</li>
                        </ul>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Corrupti, at?
                        </p>
                      </v-card-text>
                      <v-card-text v-if="i == 2">
                        <h3 class="py-2">Specifications</h3>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Enim nostrum corporis ut quasi et suscipit odit
                          eligendi beatae? Expedita perferendis distinctio
                          exercitationem magni itaque dolores consectetur minus
                          pariatur autem! Eius voluptas nisi ea facilis itaque
                          reprehenderit.
                        </p>
                        <ProductSpecs />
                      </v-card-text>
                      <v-card-text v-if="i == 3">
                        <ProductReviews />
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-card>
            </v-col>
          </v-row-->
          <v-row align="center" justify="center" class="my-12">
            <v-col cols="12">
              <div>
                <h2 class="font-weight-regular text-center">
                  You might also like...
                </h2>
              </div>
              <NewArrivals :title="false" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
      ...mapState({
        product: state => state.product.product
      })
  },
  data() {
    return {
      productId: this.$route.params.id,
      tabs: 'tabs-1',
      loading: false
    }
  },
  async created() {
    this.loading = true;

    const response = await this.$store.dispatch('product/getProductsById', this.productId)
      .then((response) => {
        if (response.error) {
          this.$router.push('/');
        }
      })
      .finally(() => (this.loading = false))
      .catch((error) => {
        console.log(error)
      })
  },
  watch: {
    quantity(val) {
      if (--val <= 0) this.quantity = 1
    },
  },
}
</script>
